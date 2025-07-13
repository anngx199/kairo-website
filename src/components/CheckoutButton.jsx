import React from 'react'
import axios from 'axios'

export default function CheckoutButton() {
  const handleCheckout = async () => {
    try {
      const res = await axios.post('http://localhost:4242/create-checkout-session', {
        items: [
          {
            price_data: {
              currency: 'nzd',
              product_data: { name: 'Seamoss Gummies 1 Pack' },
              unit_amount: 1200,
            },
            quantity: 1,
          },
        ],
      })
      window.location.href = res.data.url
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      className="bg-gradient-to-r from-pink-600 via-yellow-500 to-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:brightness-110 transition"
    >
      Buy Now
    </button>
  )
}
