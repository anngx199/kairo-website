import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Success() {
  const { search } = useLocation()
  const sessionId = new URLSearchParams(search).get('session_id')

  return (
    <main style={{ padding: 24 }}>
      <h1>Payment Success 🎉</h1>
      {sessionId ? <p>Session ID: {sessionId}</p> : <p>No session_id found in URL</p>}
      <a href="/" style={{ display: 'inline-block', marginTop: 12 }}>
        Back to Home
      </a>
    </main>
  )
}
