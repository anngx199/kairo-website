import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function Success() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const sessionId = params.get('session_id')
  const [receipt, setReceipt] = useState(null)

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/retrieve-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => setReceipt(data))
        .catch((err) => console.error(err))
    }
  }, [sessionId])

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center px-4 py-10"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      {/* Headline */}
      <img src="/images/payment_headline.png" alt="Payment Complete" className="mb-6 w-[320px]" />

      <div className="bg-white/95 rounded-xl p-6 shadow-xl max-w-lg w-full text-center">
        <h2 className="text-xl font-bold mb-3">Receipt</h2>

        {!sessionId && <p>No session_id found in URL.</p>}

        {receipt ? (
          <div>
            <p>
              <strong>Status:</strong> {receipt.status}
            </p>
            <p>
              <strong>Email:</strong> {receipt.customer_details?.email}
            </p>
            <p>
              <strong>Shipping:</strong>{' '}
              {receipt.shipping_cost?.shipping_rate
                ? receipt.shipping_cost.shipping_rate.display_name
                : 'N/A'}{' '}
              {receipt.shipping_cost?.amount_total
                ? `(${(receipt.shipping_cost.amount_total / 100).toFixed(2)} ${receipt.currency?.toUpperCase()})`
                : ''}
            </p>

            {/* 🏷️ Hiển thị địa chỉ giao hàng */}
            {receipt.customer_details?.address && (
              <div className="mt-3 text-left text-sm text-gray-700 bg-gray-50 p-3 rounded">
                <p className="font-semibold mb-1">Shipping Address</p>
                <p>{receipt.customer_details.address.line1}</p>
                {receipt.customer_details.address.line2 && (
                  <p>{receipt.customer_details.address.line2}</p>
                )}
                <p>
                  {receipt.customer_details.address.city}{' '}
                  {receipt.customer_details.address.postal_code}
                </p>
                <p>{receipt.customer_details.address.country}</p>
              </div>
            )}

            {/* Line Items */}
            <ul className="mt-4">
              {receipt.line_items?.data?.map((item) => (
                <li key={item.id} className="mb-4">
                  {item.price.product.images?.[0] && (
                    <img
                      src={item.price.product.images[0]}
                      alt={item.description}
                      className="h-16 mx-auto mb-1"
                    />
                  )}
                  <p>
                    {item.description} × {item.quantity}
                  </p>
                  <p>
                    <strong>
                      {(item.amount_total / 100).toFixed(2)} {receipt.currency?.toUpperCase()}
                    </strong>
                  </p>
                </li>
              ))}
            </ul>

            {/* Totals */}
            <div className="mt-4 font-semibold">
              <p>
                Subtotal: {(receipt.amount_subtotal / 100).toFixed(2)}{' '}
                {receipt.currency?.toUpperCase()}
              </p>
              {receipt.total_details?.amount_tax > 0 && (
                <p>
                  Tax: {(receipt.total_details.amount_tax / 100).toFixed(2)}{' '}
                  {receipt.currency?.toUpperCase()}
                </p>
              )}
              <p>
                Total: {(receipt.amount_total / 100).toFixed(2)} {receipt.currency?.toUpperCase()}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading receipt...</p>
        )}
      </div>

      <Link
        to="/"
        className="mt-6 bg-lime-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-lime-600"
      >
        Back to Home
      </Link>
    </div>
  )
}
