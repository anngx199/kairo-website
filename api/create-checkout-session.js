// api/create-checkout-session.js (hoặc .ts)
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const PUBLIC_BASE_URL = process.env.VITE_PUBLIC_BASE_URL || 'http://localhost:5173'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      priceId,
      quantity = 1,
      mode = 'payment',
      shippingRates = [],
      successUrl,
      cancelUrl,
    } = req.body

    const sessionConfig = {
      mode,
      line_items: [{ price: priceId, quantity }],
      success_url: successUrl || `${PUBLIC_BASE_URL}/success`,
      cancel_url: cancelUrl || `${PUBLIC_BASE_URL}/cancel`,
    }

    if (shippingRates.length > 0) {
      sessionConfig.shipping_address_collection = {
        allowed_countries: ['NZ', 'GB'],
      }
      sessionConfig.shipping_options = shippingRates.map((id) => ({
        shipping_rate: id,
      }))
    }

    const session = await stripe.checkout.sessions.create(sessionConfig)
    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    res.status(400).json({ error: err.message })
  }
}
