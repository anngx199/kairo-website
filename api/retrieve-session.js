// api/retrieve-session.js
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { session_id: sessionId } = req.query
  if (!sessionId) {
    return res.status(400).json({ error: 'Missing session_id' })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product'],
    })

    const items =
      session.line_items?.data.map((li) => ({
        id: li.id,
        name: li.description || li.price.product?.name,
        quantity: li.quantity,
        amount_total: li.amount_total,
        currency: session.currency,
        image: li.price.product?.images?.[0] || null,
      })) || []

    res.status(200).json({
      id: session.id,
      status: session.payment_status, // paid | unpaid
      email: session.customer_details?.email || null,
      currency: session.currency,
      subtotal: session.amount_subtotal,
      total: session.amount_total,
      items,
    })
  } catch (err) {
    console.error('retrieve-session error:', err)
    res.status(500).json({ error: err.message })
  }
}
