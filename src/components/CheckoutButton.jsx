import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Tự động chọn endpoint dựa vào môi trường
const API_ENDPOINT = import.meta.env.PROD
  ? '/api/create-checkout-session'
  : `${(import.meta.env.VITE_API_BASE || 'http://localhost:4242').replace(/\/$/, '')}/create-checkout-session`

export default function CheckoutButton({ priceId, isSubscription = false, qty = 1 }) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!priceId) {
      alert('Missing priceId.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          quantity: qty,
          mode: isSubscription ? 'subscription' : 'payment',
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}`,
        }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      if (data?.url) {
        window.location.href = data.url
      } else {
        alert('No checkout URL received from the server.')
      }
    } catch (err) {
      console.error(err)
      alert('Failed to create checkout session. Please check server/API route and Price ID.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`bg-green-500 text-white px-4 py-2 rounded-lg transition 
        ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-green-600'}`}
    >
      {loading ? 'Redirecting…' : 'Pay with Stripe'}
    </button>
  )
}

CheckoutButton.propTypes = {
  priceId: PropTypes.string.isRequired,
  isSubscription: PropTypes.bool,
  qty: PropTypes.number,
}
