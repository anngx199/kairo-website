// api/retrieve-session.js  (Vercel Node Function - ESM)
import Stripe from 'stripe'

const SECRET = process.env.STRIPE_SECRET_KEY
const stripe = SECRET ? new Stripe(SECRET) : null

export default async function handler(req, res) {
  // (optional) CORS preflight if you ever call this cross-origin
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }
  if (!stripe) {
    return res.status(500).json({ error: 'Server misconfigured: STRIPE_SECRET_KEY missing' })
  }

  const { session_id: sessionId } = req.query || {}
  if (!sessionId) {
    return res.status(400).json({ error: 'Missing session_id' })
  }

  try {
    // Expand để có ảnh/metadata của sản phẩm, thông tin shipping rate, v.v.
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: [
        'line_items.data.price.product', // để lấy name/images
        'customer', // nếu có Customer object
        'payment_intent', // nếu muốn biết trạng thái thanh toán
        'shipping_cost.shipping_rate', // để lấy tên gói ship (display_name)
      ],
    })

    // Chuẩn hóa dữ liệu cho client render receipt
    const items =
      session?.line_items?.data?.map((li) => {
        const price = li.price
        const product = price?.product
        return {
          id: li.id,
          description: li.description || product?.name || 'Item',
          quantity: li.quantity,
          unit_amount: price?.unit_amount ?? null, // đơn giá (cents)
          currency: price?.currency || session.currency,
          subtotal: li.amount_subtotal ?? null, // line subtotal (cents)
          image:
            Array.isArray(product?.images) && product.images.length > 0 ? product.images[0] : null,
          product_id: typeof product === 'object' ? product?.id : product, // khi expand sẽ là object
        }
      }) || []

    const payload = {
      id: session.id,
      created: session.created,
      currency: session.currency,
      status: session.payment_status, // paid | unpaid | no_payment_required
      subtotal: session.amount_subtotal, // cents
      total: session.amount_total, // cents

      // Tổng quan chi tiết
      total_details: {
        amount_shipping: session.total_details?.amount_shipping ?? null,
        amount_tax: session.total_details?.amount_tax ?? null,
        amount_discount: session.total_details?.amount_discount ?? null,
      },

      // Chi phí vận chuyển & tên gói ship
      shipping_cost: {
        amount_total: session.shipping_cost?.amount_total ?? null, // tổng shipping (cents)
        display_name: session.shipping_cost?.shipping_rate?.display_name ?? null,
      },

      // Thông tin người mua/người nhận
      customer: {
        id: session.customer ?? session.customer?.id ?? null,
        email: session.customer_details?.email || session.customer?.email || null,
        name: session.customer_details?.name || session.customer?.name || null,
        phone: session.customer_details?.phone || session.customer?.phone || null,
      },
      shipping_details: session.shipping_details || null, // name + address

      // Line items
      items,
    }

    return res.status(200).json(payload)
  } catch (e) {
    console.error('retrieve-session error:', e)
    return res.status(500).json({ error: e?.message || 'Unknown error' })
  }
}
