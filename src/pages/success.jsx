// src/pages/success.jsx
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Success() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const sessionId = params.get('session_id')

  const [loading, setLoading] = useState(true)
  const [receipt, setReceipt] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!sessionId) {
      setError('Missing session ID.')
      setLoading(false)
      return
    }

    fetch(`/api/retrieve-session?session_id=${sessionId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setReceipt(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('Unable to load receipt.')
        setLoading(false)
      })
  }, [sessionId])

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
        {loading && <p className="text-gray-600">Loading your receipt…</p>}

        {!loading && error && <p className="text-red-600 font-semibold">{error}</p>}

        {!loading && receipt && (
          <>
            <h2 className="text-2xl font-extrabold text-green-600 mb-2">
              Thank you for your purchase!
            </h2>

            <p className="text-gray-700 mb-4">Your payment has been completed successfully.</p>

            {/* Order summary */}
            <div className="text-left text-sm text-gray-700 bg-gray-50 rounded-lg p-4 mb-4">
              <p className="font-semibold mb-1">Order ID</p>
              <p className="break-all mb-3">{receipt.id}</p>

              <p className="font-semibold mb-1">Items</p>
              <ul className="mb-3 space-y-1">
                {receipt.items?.map((item) => (
                  <li key={item.id}>
                    {item.description} × {item.quantity}{' '}
                    <span className="font-medium">
                      {(item.subtotal / 100).toFixed(2)} {item.currency?.toUpperCase()}
                    </span>
                  </li>
                ))}
              </ul>

              <p>
                Subtotal:{' '}
                <strong>
                  {(receipt.subtotal / 100).toFixed(2)} {receipt.currency?.toUpperCase()}
                </strong>
              </p>

              {receipt.total_details?.amount_shipping > 0 && (
                <p>
                  Shipping:{' '}
                  <strong>
                    {(receipt.total_details.amount_shipping / 100).toFixed(2)}{' '}
                    {receipt.currency?.toUpperCase()}
                  </strong>
                </p>
              )}

              {receipt.total_details?.amount_tax > 0 && (
                <p>
                  Tax:{' '}
                  <strong>
                    {(receipt.total_details.amount_tax / 100).toFixed(2)}{' '}
                    {receipt.currency?.toUpperCase()}
                  </strong>
                </p>
              )}

              <p className="mt-1">
                Total:{' '}
                <strong className="text-green-700">
                  {(receipt.total / 100).toFixed(2)} {receipt.currency?.toUpperCase()}
                </strong>
              </p>
            </div>

            {/* Shipping address */}
            {receipt.shipping_details?.address && (
              <div className="text-left text-sm text-gray-700 bg-gray-50 rounded-lg p-4 mb-4">
                <p className="font-semibold mb-1">Shipping Address</p>
                <p>{receipt.shipping_details.name}</p>
                <p>{receipt.shipping_details.address.line1}</p>
                {receipt.shipping_details.address.line2 && (
                  <p>{receipt.shipping_details.address.line2}</p>
                )}
                <p>
                  {receipt.shipping_details.address.city}{' '}
                  {receipt.shipping_details.address.postal_code}
                </p>
                <p>{receipt.shipping_details.address.country}</p>
              </div>
            )}

            <p className="text-sm text-gray-600 mb-6">
              A confirmation email has been sent to{' '}
              <strong>{receipt.customer?.email || 'your email address'}</strong>.
            </p>

            <Link
              to="/"
              className="inline-block bg-lime-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-lime-600 transition"
            >
              Back to Home
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
