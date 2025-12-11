import Stripe from 'stripe'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  try {
    const { priceId, quantity = 1, mode = 'payment' } = req.body

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price: priceId, quantity }],
      shipping_address_collection: {
        allowed_countries: ['NZ', 'GB'],
      },
      shipping_options: [
        { shipping_rate: 'shr_live_standardID' },
        { shipping_rate: 'shr_live_expressID' },
      ],
      success_url: `${process.env.VITE_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.VITE_PUBLIC_BASE_URL}/cancel`,
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
