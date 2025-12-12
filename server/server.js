// server/server.js
import express from 'express'
import Stripe from 'stripe'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// Health check
app.get('/', (_, res) => res.send('Stripe server is running ✅'))

// Stripe init (LIVE or TEST depends on env)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Public base URL (Vercel or local)
const PUBLIC_BASE_URL = process.env.VITE_PUBLIC_BASE_URL || 'http://localhost:5173'

// Create checkout session
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId, quantity = 1, mode = 'payment', successUrl, cancelUrl } = req.body

    // ✅ Guard: missing priceId
    if (!priceId) {
      return res.status(400).json({ error: 'Missing priceId' })
    }

    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [
        {
          price: priceId,
          quantity,
        },
      ],

      // ✅ No shipping = free delivery
      // (do NOT add shipping_options)

      success_url: successUrl || `${PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: cancelUrl || `${PUBLIC_BASE_URL}/cancel`,
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('❌ Stripe Checkout Error:', err)
    res.status(400).json({
      error: err.message || 'Unable to create checkout session',
    })
  }
})

app.listen(4242, () => console.log('🚀 Server running on http://localhost:4242'))
