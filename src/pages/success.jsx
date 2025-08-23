// src/pages/Success.jsx
import { useEffect, useState } from 'react'

export default function Success() {
  const [sessionId] = useState(new URLSearchParams(location.search).get('session_id'))
  useEffect(() => {
    // TODO: gọi API /api/verify-session?session_id=... nếu cần xác minh
  }, [sessionId])
  return (
    <main style={{ padding: 24 }}>
      <h1>Payment Success</h1>
      <p>Session: {sessionId}</p>
    </main>
  )
}
