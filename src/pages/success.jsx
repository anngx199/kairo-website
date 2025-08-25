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
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      <img src="/images/payment_headline.png" alt="Payment Complete" className="mb-6 w-[320px]" />

      <div className="bg-white/95 rounded-xl p-6 shadow-xl max-w-lg w-full text-center">
        <h2 className="text-xl font-bold mb-3">Receipt</h2>
        {!sessionId && <p>No session_id found in URL.</p>}
        {receipt ? (
          <div>
            <p>
              <strong>Status:</strong> {receipt.payment_status}
            </p>
            <p>
              <strong>Email:</strong> {receipt.customer_details?.email}
            </p>
            <ul className="mt-3">
              {receipt.line_items?.data?.map((item) => (
                <li key={item.id} className="mb-2">
                  <img
                    src={item.price.product.images?.[0]}
                    alt={item.description}
                    className="h-16 mx-auto mb-1"
                  />
                  <p>
                    {item.description} × {item.quantity}
                  </p>
                  <p>
                    <strong>
                      {(item.amount_total / 100).toFixed(2)} {receipt.currency.toUpperCase()}
                    </strong>
                  </p>
                </li>
              ))}
            </ul>
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
