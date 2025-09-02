// api/create-checkout-session.js — Vercel Node Function (ESM)
import Stripe from 'stripe'

const SECRET = process.env.STRIPE_SECRET_KEY
const stripe = SECRET ? new Stripe(SECRET) : null

// Vercel Node functions không tự parse JSON
function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (c) => (data += c))
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    if (!stripe) throw new Error('Server misconfigured: STRIPE_SECRET_KEY is missing')

    const raw = await readBody(req)
    let payload = {}
    try {
      payload = raw ? JSON.parse(raw) : {}
    } catch {
      throw new Error('Invalid JSON body')
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
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error("Invalid 'quantity'. Must be a positive integer")
    }

    // Ưu tiên ENV, sau đó Origin; fallback cuối cùng là domain của bạn (đúng chính tả)
    const ORIGIN = process.env.BASE_URL || req.headers.origin || 'https://kairosvegansweets.com'

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: priceId, quantity }],
      shipping_address_collection: {
        allowed_countries: ['US', 'GB', 'NZ'], // các nước bạn ship
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 500, currency: 'gbp' }, // £5.00
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 1200, currency: 'gbp' }, // £12.00
            display_name: 'Express Shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 2 },
            },
          },
        },
      ],
      success_url: successUrl || `${ORIGIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${ORIGIN}/cancel`,
    })

    return res.status(200).json({ url: session.url })
  } catch (e) {
    console.error('create-checkout-session error:', e)
    return res.status(500).json({ error: e?.message || 'Unknown error' })
  }
}
