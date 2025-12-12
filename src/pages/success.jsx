// src/pages/success.jsx
import React from 'react'
import { Link } from 'react-router-dom'

export default function Success() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center px-4 py-10"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      {/* Headline */}
      <img
        src="/images/payment_headline.png"
        alt="Payment Successful"
        className="mb-6 w-[320px]"
        onError={(e) => {
          e.currentTarget.outerHTML =
            '<h1 style="font-size:36px;font-weight:900;color:white;text-shadow:0 3px 8px rgba(0,0,0,.35)">Payment Successful</h1>'
        }}
      />

      <div className="bg-white/95 rounded-xl p-6 shadow-xl max-w-lg w-full text-center">
        <h2 className="text-2xl font-extrabold text-green-600 mb-3">
          Thank you for your purchase!
        </h2>

        <p className="text-gray-700 mb-4">Your payment has been completed successfully.</p>

        <p className="text-sm text-gray-600">
          A confirmation email with your receipt will be sent to you by Stripe.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-block bg-lime-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-lime-600 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
