// src/components/CheckoutScreen.jsx
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function CheckoutScreen() {
  const location = useLocation()
  const navigate = useNavigate()

  // Safe fallback (KHÔNG crash)
  const state = location.state || {}

  const {
    title = 'Product',
    details = '',
    price = '',
    img = '/images/gummies-layout-c.jpg',
  } = state

  // Nếu user vào thẳng /checkout → quay về shop
  if (!location.state) {
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
        <div className="text-center text-gray-600">
          <p>You’ll be redirected to Stripe to complete your payment securely.</p>
          <p className="mt-2 text-sm">If you cancel or refresh, no money will be taken.</p>
        </div>
      </div>
    </div>
  )
}
