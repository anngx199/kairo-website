// api/create-checkout-session.js  (CommonJS for Vercel Node runtime)
const Stripe = require('stripe')

const secret = process.env.STRIPE_SECRET_KEY

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }
  try {
    if (!secret) throw new Error('Server misconfigured: STRIPE_SECRET_KEY is missing')

    const { priceId, quantity = 1, mode = 'payment', successUrl, cancelUrl } = req.body || {}
    if (!priceId) throw new Error('Missing required field: priceId')
    if (!['payment', 'subscription'].includes(mode)) {
      throw new Error("Invalid 'mode'. Use 'payment' or 'subscription'")
    }

    const stripe = new Stripe(secret)
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
