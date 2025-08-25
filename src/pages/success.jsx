import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Success() {
  const navigate = useNavigate()
  const params = new URLSearchParams(useLocation().search)
  const sessionId = params.get('session_id')

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center px-4 py-10"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      {/* Headline */}
      <div className="mb-8 mt-4">
        <img
          src="/images/payment_headline.png"
          alt="Payment Complete"
          className="max-w-xs md:max-w-sm drop-shadow"
          onError={(e) => {
            e.currentTarget.outerHTML =
              '<h1 style="font-weight:800;font-size:28px;color:white;text-shadow:0 1px 3px rgba(0,0,0,.3)">Payment Success 🎉</h1>'
          }}
        />
      </div>

      {/* Receipt card */}
      <div className="w-full max-w-xl bg-white/95 backdrop-blur p-6 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-4">Receipt</h2>
        {sessionId ? (
          <>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Checkout Session ID:</span>{' '}
              <span className="font-mono break-all">{sessionId}</span>
            </p>
            <p className="text-gray-600 mt-3">
              Save the Session ID to look up in Stripe Dashboard if needed.
            </p>
          </>
        ) : (
          <p className="text-gray-600 text-center">
            No <code>session_id</code> found in URL.
          </p>
        )}
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
