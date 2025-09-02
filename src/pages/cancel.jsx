import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cancel() {
  const navigate = useNavigate()

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-10"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      {/* Headline */}
      <div className="mb-8 text-center">
        <img
          src="/images/payment_cancel_headline.png"
          alt="Payment Canceled"
          className="w-[300px] md:w-[360px] drop-shadow"
          onError={(e) => {
            // fallback nếu thiếu ảnh headline
            e.currentTarget.outerHTML =
              '<h1 style="font-weight:900;font-size:36px;color:white;text-shadow:0 3px 8px rgba(0,0,0,.35)">Payment Canceled</h1>'
          }}
        />
      </div>

      {/* Message Card */}
      <div className="w-full max-w-xl bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 text-center">
        <h2 className="text-xl font-extrabold mb-2 text-red-600">Payment Canceled</h2>
        <p className="text-gray-700">
          You canceled your payment or the checkout session has expired.
        </p>
        <p className="text-gray-600 mt-2">If needed, you can return to the shop and try again.</p>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-white/90 text-gray-800 border border-gray-300 px-5 py-3 rounded-full shadow hover:bg-white transition"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-lime-500 text-white font-bold px-6 py-3 rounded-full shadow hover:bg-lime-600 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
