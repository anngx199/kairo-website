// api/retrieve-session.js
import Stripe from 'stripe'

const SECRET = process.env.STRIPE_SECRET_KEY
const stripe = SECRET ? new Stripe(SECRET) : null

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  if (!stripe) {
    return res.status(500).json({ error: 'Server misconfigured: STRIPE_SECRET_KEY missing' })
  }

  const { session_id: sessionId } = req.query || {}
  if (!sessionId) {
    return res.status(400).json({ error: 'Missing session_id' })
  }

  try {
    // Lấy session + expand để có line_items & product (lấy được ảnh, tên…)
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product', 'customer'],
    })

    // (tuỳ chọn) có thể chỉ trả về các field cần thiết
    // nhưng ở đây trả full session để bạn render tuỳ ý trên Success.jsx
    return res.status(200).json(session)
  } catch (e) {
    console.error('retrieve-session error:', e)
    return res.status(500).json({ error: e?.message || 'Unknown error' })
  }
}
