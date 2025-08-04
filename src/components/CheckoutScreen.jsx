import React from 'react'
import { useLocation } from 'react-router-dom'

const CheckoutScreen = () => {
  const location = useLocation()
  const { title, details, price, img } = location.state || {}

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-10 font-classic font-body flex items-center justify-center"
      style={{ backgroundImage: `url('/images/background.png')` }}
    >
      <div className="max-w-xl w-full bg-white/90 backdrop-blur-md p-6 pt-4 rounded-lg shadow-2xl">
        {/* Checkout Headline Image */}
        <div className="flex justify-center mb-6">
          <img src="/images/checkout_headline.PNG" alt="Checkout" className="w-48 h-auto" />
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow rounded p-4 mb-6 flex gap-4 items-center">
          {img && (
            <img src={img} alt="Product" className="w-20 h-20 object-cover rounded-md border" />
          )}
          <div>
            <h2 className="text-xl font-semibold mb-1">Order Summary</h2>
            <p>{title || 'Seamoss Mango Gummies'}</p>
            <p className="text-gray-500">{details || 'Subscription - Monthly'}</p>
            <p className="font-bold mt-1">{price || '£40.00/mo'}</p>
          </div>
        </div>

        {/* Buyer Info */}
        <div className="bg-white shadow rounded p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">Your Info</h2>
          <input type="text" placeholder="Full Name" className="w-full border p-2 mb-3 rounded" />
          <input type="email" placeholder="Email" className="w-full border p-2 mb-3 rounded" />
          <input
            type="text"
            placeholder="Shipping Address"
            className="w-full border p-2 mb-3 rounded"
          />
          <input type="text" placeholder="City" className="w-full border p-2 mb-3 rounded" />
          <input type="text" placeholder="Postcode" className="w-full border p-2 mb-3 rounded" />
          <input type="text" placeholder="Country" className="w-full border p-2 mb-3 rounded" />
        </div>

        {/* Payment */}
        <div className="bg-white shadow rounded p-4 mb-6 text-center">
          <p className="mb-3 text-gray-600">You’ll be redirected to Stripe to complete payment.</p>
          <button className="bg-lime-500 text-white px-6 py-3 rounded font-bold hover:bg-lime-600 transition">
            Pay with Stripe
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutScreen
