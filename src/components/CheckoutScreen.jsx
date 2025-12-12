// src/components/CheckoutScreen.jsx
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// Auto API endpoint (local vs Vercel)
const API_ENDPOINT = import.meta.env.PROD
  ? '/api/create-checkout-session'
  : `${(import.meta.env.VITE_API_BASE || 'http://localhost:4242').replace(/\/$/, '')}/create-checkout-session`

export default function CheckoutScreen() {
  const location = useLocation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // Safe fallback
  const state = location.state

  if (!state) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-bold mb-4">No product selected</h2>
        <p className="text-gray-600 mb-6">Please go back to the shop and select a product.</p>
        <button
          onClick={() => navigate('/#shop')}
          className="bg-lime-500 text-white px-6 py-3 rounded font-bold hover:bg-lime-600"
        >
          Go to Shop
        </button>
      </div>
    )
  }

  const {
    title = 'Product',
    details = '',
    price = '',
    img = '/images/gummies-layout-c.jpg',
    priceId,
    isSubscription = false,
  } = state

  const handlePay = async () => {
    if (!priceId) {
      alert('Missing price configuration. Please contact support.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          quantity: 1,
          mode: isSubscription ? 'subscription' : 'payment',
          successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/checkout`,
        }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text)
      }

      const data = await res.json()

      if (data?.url) {
        window.location.href = data.url
      } else {
        throw new Error('No Stripe checkout URL returned.')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      alert('Unable to start payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-10"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      <div className="w-full flex justify-center mb-6">
        <img src="/images/checkout_headline.PNG" alt="Checkout" className="w-[240px]" />
      </div>

      <div className="w-full max-w-xl mx-auto bg-white/95 p-6 rounded-xl shadow-2xl">
        {/* Order Summary */}
        <div className="flex gap-4 items-center mb-6">
          <img src={img} alt={title} className="w-20 h-20 object-cover rounded-md border" />
          <div>
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <p>{title}</p>
            <p className="text-gray-500">{details}</p>
            <p className="font-bold mt-1">{price}</p>
            <p className="text-sm text-green-600 font-medium mt-1">Free Delivery</p>
          </div>
        </div>

        {/* Info */}
        <div className="text-center text-gray-600 mb-6">
          <p>You’ll be redirected to Stripe to complete your payment securely.</p>
          <p className="mt-2 text-sm">If you cancel or refresh, no money will be taken.</p>
        </div>

        {/* Pay button */}
        <button
          onClick={handlePay}
          disabled={loading}
          className={`w-full bg-lime-500 text-white px-6 py-3 rounded-lg font-bold transition
            ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-lime-600'}`}
        >
          {loading ? 'Redirecting…' : 'Pay with Stripe'}
        </button>
      </div>
    </div>
  )
}
