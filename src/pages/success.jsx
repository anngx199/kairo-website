// src/pages/Success.jsx
import { useLocation } from 'react-router-dom'

export default function Success() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const sessionId = params.get('session_id')

  return (
    <main style={{ padding: '24px' }}>
      <h1>Payment Success 🎉</h1>
      {sessionId ? <p>Session ID: {sessionId}</p> : <p>No session_id found in URL</p>}
    </main>
  )
}
