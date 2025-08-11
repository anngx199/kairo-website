// src/components/CheckoutScreen.jsx
import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_BASE?.replace(/\/$/, '') || 'http://localhost:4242'

export default function CheckoutScreen() {
  const { state } = useLocation()
  if (!state) return <div className="p-8">No item selected. Go back to the shop.</div>

  const { title, details, price, img, priceId, isSubscription } = state

  const { imgSrc, mode } = useMemo(() => {
    const t = (title || '').toLowerCase()
    const sub = t.includes('subscription') || t.includes('monthly') || !!isSubscription
    let fallback = '/images/gummies-layout-c.jpg'
    if (t.includes('4-pack') || t.includes('bundle')) fallback = '/images/hero.jpg'
    if (sub) fallback = '/images/gummies-layout-a.jpg'
    return { imgSrc: img || fallback, mode: sub ? 'subscription' : 'payment' }
  }, [title, img, isSubscription])

  const handlePay = async () => {
    if (!priceId) return alert('Missing priceId (Test Mode).')
    try {
      const res = await fetch(`${API_BASE}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          quantity: 1,
          mode,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/checkout`,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      if (data?.url) window.location.href = data.url
      else throw new Error('No checkout URL returned.')
    } catch (e) {
      console.error(e)
      alert('Unable to start checkout. Check server, test keys, and priceId.')
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
        <div className="flex gap-4 items-center mb-6">
          <img src={imgSrc} alt={title} className="w-20 h-20 object-cover rounded-md border" />
          <div>
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <p>{title}</p>
            <p className="text-gray-500">{details}</p>
            <p className="font-bold mt-1">{price}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="mb-3 text-gray-600">You’ll be redirected to Stripe to complete payment.</p>
          <button
            onClick={handlePay}
            className="bg-lime-500 text-white px-6 py-3 rounded font-bold hover:bg-lime-600"
          >
            Pay with Stripe
          </button>
        </div>
      </div>
    </div>
  )
}
