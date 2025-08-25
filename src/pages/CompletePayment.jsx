import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CompletePayment() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-start px-4 py-10"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      {/* Headline */}
      <div className="mb-8">
        <img
          src="/images/payment_headline.png"
          alt="Payment Complete"
          className="max-w-xs mx-auto"
        />
      </div>

      {/* Receipt box */}
      <div className="bg-white/95 p-6 rounded-xl shadow-xl w-full max-w-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Receipt</h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Order ID:</span> #123456
          </p>
          <p>
            <span className="font-semibold">Product:</span> Pack of Gummies
          </p>
          <p>
            <span className="font-semibold">Price:</span> £12.00
          </p>
          <p>
            <span className="font-semibold">Status:</span> Paid ✅
          </p>
        </div>
      </div>

      {/* Back to Home button */}
      <button
        onClick={() => navigate('/')}
        className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition"
      >
        Back to Home
      </button>
    </div>
  )
}
