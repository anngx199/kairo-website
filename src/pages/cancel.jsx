import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cancel() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center px-4 py-10"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      {/* Headline */}
      <div className="mb-8 mt-4 text-center">
        <img
          src="/images/payment_cancel_headline.png"
          alt="Payment Canceled"
          className="max-w-xs md:max-w-sm drop-shadow"
          onError={(e) => {
            e.currentTarget.outerHTML =
              '<h1 style="font-weight:800;font-size:28px;color:white;text-shadow:0 1px 3px rgba(0,0,0,.3)">Payment Canceled</h1>'
          }}
        />
      </div>

      {/* Message card */}
      <div className="w-full max-w-xl bg-white/95 backdrop-blur p-6 rounded-2xl shadow-2xl text-center">
        <p className="text-gray-700">
          You have canceled your payment or your payment session has expired.
        </p>
        <p className="text-gray-600 mt-2">If necessary, try again or contact support.</p>
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="mt-8 bg-lime-500 text-white font-bold px-6 py-3 rounded-full shadow hover:bg-lime-600 transition"
      >
        Back to Home
      </button>
    </div>
  )
}
