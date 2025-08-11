import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Stripe from 'stripe'

// Load biến môi trường
dotenv.config()

const app = express()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.use(cors())
app.use(express.json())

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.items,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    })

    res.status(200).json({ url: session.url })
  } catch (error) {
    console.error('❌ Stripe Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.listen(4242, () => console.log('🚀 Server is running on port 4242'))
