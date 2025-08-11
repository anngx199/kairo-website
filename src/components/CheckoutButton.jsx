import React from 'react'
import PropTypes from 'prop-types'

export default function CheckoutButton({ priceId, isSubscription = false, qty = 1 }) {
  const handleCheckout = async () => {
    try {
      const res = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          qty,
          mode: isSubscription ? 'subscription' : 'payment',
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
      alert('Failed to create checkout session. Please check your server or Price ID.')
    }
  }

  return (
    <button
      onClick={handleCheckout}
      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
    >
      Pay with Stripe
    </button>
  )
}

CheckoutButton.propTypes = {
  priceId: PropTypes.string.isRequired,
  isSubscription: PropTypes.bool,
  qty: PropTypes.number,
}
