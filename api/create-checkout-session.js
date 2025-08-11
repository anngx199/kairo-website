// api/create-checkout-session.js  (ESM, Vercel Node function)
import Stripe from 'stripe'

const SECRET = process.env.STRIPE_SECRET_KEY
const stripe = SECRET ? new Stripe(SECRET) : null

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (c) => (data += c))
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }
  try {
    if (!SECRET) throw new Error('Server misconfigured: STRIPE_SECRET_KEY is missing')

    // Vercel Node functions không tự parse JSON
    const raw = await readBody(req)
    let payload = {}
    if (raw) payload = JSON.parse(raw)

    const {
      priceId,
      quantity = 1,
      mode = 'payment', // 'payment' | 'subscription'
      successUrl,
      cancelUrl,
    } = payload

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
