// api/create-checkout-session.js  -- Vercel Node Serverless (CommonJS)
const Stripe = require('stripe')

const SECRET = process.env.STRIPE_SECRET_KEY

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => (data += chunk))
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' })
  try {
    if (!SECRET) throw new Error('Server misconfigured: STRIPE_SECRET_KEY is missing')

    // Parse JSON body (Vercel Node functions don't auto-parse)
    let payload = {}
    const raw = await readBody(req)
    if (raw) {
      try {
        payload = JSON.parse(raw)
      } catch {
        throw new Error('Invalid JSON body')
      }
    }

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

    const stripe = new Stripe(SECRET)
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
