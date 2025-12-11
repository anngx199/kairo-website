// server/server.js
import express from 'express'
import Stripe from 'stripe'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (_, res) => res.send('Stripe server is running ✅'))

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// POST /create-checkout-session (LOCAL DEV)
app.post('/create-checkout-session', async (req, res) => {
  try {
    const {
      priceId,
      quantity = 1,
      mode = 'payment',
      shippingRates = [],
      successUrl,
      cancelUrl,
    } = req.body

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
      success_url: successUrl || 'http://localhost:5173/success',
      cancel_url: cancelUrl || 'http://localhost:5173/cancel',
    })

    res.json({ url: session.url })
  } catch (e) {
    console.error('Stripe error (local):', e)
    res.status(400).json({ error: e.message })
  }
})

app.listen(4242, () => console.log('Server running on http://localhost:4242'))
