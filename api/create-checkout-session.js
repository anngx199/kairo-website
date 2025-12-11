// api/create-checkout-session.js
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { priceId, quantity = 1, mode = 'payment', shippingRates = [] } = req.body

    if (!priceId) {
      return res.status(400).json({ error: 'Missing priceId' })
    }

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: priceId, quantity }],
      shipping_address_collection: {
        allowed_countries: ['NZ', 'GB'],
      },
      shipping_options: shippingRates.map((id) => ({ shipping_rate: id })),
      success_url: `${process.env.VITE_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.VITE_PUBLIC_BASE_URL}/cancel`,
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe error (vercel):', err)
    res.status(400).json({ error: err.message })
  }
}
