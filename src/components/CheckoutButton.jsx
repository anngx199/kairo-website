import React, { useState } from 'react'
import PropTypes from 'prop-types'

// -----------------------------
// AUTO ENDPOINT (Dev vs Production)
// -----------------------------
const API_ENDPOINT = import.meta.env.PROD
  ? '/api/create-checkout-session' // chạy trên Vercel
  : `${(import.meta.env.VITE_API_BASE || 'http://localhost:4242').replace(
      /\/$/,
      ''
    )}/create-checkout-session`

export default function CheckoutButton({
  priceId,
  isSubscription = false,
  qty = 1,
  shippingRates = [],
  label = 'Pay with Stripe',
}) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!priceId) {
      alert('❌ Missing priceId. Cannot continue.')
      return
    }

    setLoading(true)
    try {
      const payload = {
        priceId,
        quantity: qty,
        mode: isSubscription ? 'subscription' : 'payment',
        shippingRates,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}`,
      }

      console.log('Sending checkout payload:', payload)

      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(`❌ Server error ${res.status}: ${text}`)
      }

      const data = await res.json()

      if (data?.url) {
        window.location.href = data.url
      } else {
        alert('❌ No checkout session URL returned from the server.')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      alert('⚠ Failed to start Stripe checkout. Check console for details.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`bg-lime-500 text-white px-4 py-3 rounded-lg w-full font-bold transition 
        ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-lime-600'}`}
    >
      {loading ? 'Redirecting…' : label}
    </button>
  )
}

CheckoutButton.propTypes = {
  priceId: PropTypes.string.isRequired,
  isSubscription: PropTypes.bool,
  qty: PropTypes.number,
  label: PropTypes.string,
  shippingRates: PropTypes.arrayOf(PropTypes.string),
}
