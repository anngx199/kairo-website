// api/retrieve-session.js
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { session_id } = req.query
  if (!session_id) {
    return res.status(400).json({ error: 'Missing session_id' })
  }

  try {
    // Lấy session kèm line_items
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items.data.price.product'],
    })

    return res.status(200).json(session)
  } catch (e) {
    console.error('retrieve-session error:', e.message)
    return res.status(500).json({ error: e.message })
  }
}
