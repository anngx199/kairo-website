// api/create-checkout-session.js
import Stripe from 'stripe'

const secret = process.env.STRIPE_SECRET_KEY
if (!secret) {
  // Giúp debug trên Vercel nếu quên set ENV
  console.error('Missing STRIPE_SECRET_KEY env on Vercel')
}
const stripe = new Stripe(secret)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    if (!secret) throw new Error('Server misconfigured: STRIPE_SECRET_KEY is missing')

    const {
      priceId,
      quantity = 1,
      mode = 'payment', // 'payment' | 'subscription'
      successUrl,
      cancelUrl,
    } = req.body || {}

    if (!priceId) throw new Error('Missing required field: priceId')
    if (!['payment', 'subscription'].includes(mode)) {
      throw new Error("Invalid 'mode'. Use 'payment' or 'subscription'")
    }

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: priceId, quantity }],
      success_url: successUrl || `${req.headers.origin}/success`,
      cancel_url: cancelUrl || `${req.headers.origin}/cancel`,
    })

    return res.status(200).json({ url: session.url })
  } catch (e) {
    console.error('create-checkout-session error:', e?.message)
    return res.status(400).json({ error: e?.message || 'Unknown error' })
  }
}
