// api/webhook.js (Vercel Node Function - ESM)
import Stripe from 'stripe'
import { sendOrderEmails } from './_lib/mailer.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Vercel cần raw body để verify signature
async function readRawBody(req) {
  const chunks = []
  for await (const chunk of req) chunks.push(Buffer.from(chunk))
  return Buffer.concat(chunks)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed')

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) return res.status(500).send('Missing STRIPE_WEBHOOK_SECRET')

  let event
  try {
    const sig = req.headers['stripe-signature']
    const rawBody = await readRawBody(req)

    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err?.message)
    return res.status(400).send(`Webhook Error: ${err?.message}`)
  }

  try {
    // ✅ Sự kiện quan trọng nhất cho Checkout
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object

      // Lấy đầy đủ chi tiết để email có line items + address
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items.data.price.product', 'payment_intent'],
      })

      // ✅ Chỉ gửi email khi thật sự paid (tránh gửi nhầm nếu async/failed)
      if (fullSession.payment_status === 'paid') {
        await sendOrderEmails(fullSession)
      } else {
        console.log(
          'ℹ️ checkout.session.completed but payment_status != paid:',
          fullSession.payment_status
        )
      }
    }

    // (Optional) Nếu bạn muốn bắt cả payment_intent.succeeded:
    // if (event.type === 'payment_intent.succeeded') { ... }

    return res.status(200).json({ received: true })
  } catch (err) {
    console.error('❌ Webhook handler error:', err)
    return res.status(500).send('Webhook handler failed')
  }
}
