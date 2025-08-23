import React from 'react'

export default function Cancel() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Payment canceled</h1>
      <p>No charge was made. You can try again anytime.</p>
      <a href="/checkout" style={{ display: 'inline-block', marginTop: 12 }}>
        Return to Checkout
      </a>
    </main>
  )
}
