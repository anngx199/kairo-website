// api/create-checkout-session.js (Vercel Node Function - ESM)
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  try {
    const {
      priceId,
      quantity = 1,
      mode = 'payment',
      successUrl,
      cancelUrl,

      // optional: bạn có thể truyền từ FE nếu muốn
      allowedCountries = ['GB', 'NZ'],
      // freeShipping: true (hiện tại bạn muốn free delivery)
    } = req.body || {}

    if (!priceId) return res.status(400).json({ error: 'Missing priceId' })

    const session = await stripe.checkout.sessions.create({
      mode,

      line_items: [{ price: priceId, quantity }],

      // ✅ Thu địa chỉ giao hàng (đây là "lấy địa chỉ để ship")
      shipping_address_collection: {
        allowed_countries: allowedCountries,
      },

      // ✅ (Tuỳ chọn) bắt buộc billing address nếu cần hoá đơn
      // billing_address_collection: 'required',

      // ✅ Free delivery => KHÔNG set shipping_options
      // Nếu sau này muốn bật lại shipping rate:
      // shipping_options: [{ shipping_rate: 'shr_...' }],

      // ✅ URL: nhớ truyền đúng placeholder session_id để trang Success lấy được
      success_url:
        successUrl ||
        `${process.env.VITE_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.VITE_PUBLIC_BASE_URL}/cancel`,

      // ✅ (khuyến nghị) giúp email rõ ràng hơn trong Stripe + webhook
      // customer_email: customerEmail, // nếu FE có email sẵn
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('create-checkout-session error:', err)
    return res.status(400).json({ error: err?.message || 'Unknown error' })
  }
}
