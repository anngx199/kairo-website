import React, { useState } from 'react'
import PropTypes from 'prop-types'

// ----------------------------------
// API endpoint (local vs production)
// ----------------------------------
const API_ENDPOINT = import.meta.env.PROD
  ? '/api/create-checkout-session'
  : `${(import.meta.env.VITE_API_BASE || 'http://localhost:4242').replace(
      /\/$/,
      ''
    )}/create-checkout-session`

export default function CheckoutButton({
  priceId,
  isSubscription = false,
  qty = 1,
  label = 'Pay with Stripe',
}) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!priceId) {
      alert('❌ Missing priceId')
      return
    }

    setLoading(true)

    try {
      const payload = {
        priceId,
        quantity: qty,
        mode: isSubscription ? 'subscription' : 'payment',
      }

      console.log('🟢 Creating checkout session:', payload)

      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(`Server error ${res.status}: ${text}`)
      }

      const data = await res.json()

      if (!data?.url) {
        throw new Error('No checkout URL returned')
      }

      // ✅ Stripe redirect (safe)
      window.location.href = data.url
    } catch (err) {
      console.error('❌ Checkout failed:', err)
      alert('Payment could not be started. No money has been taken. Please try again.')
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
}
