// api/_lib/mailer.js (ESM)
import nodemailer from 'nodemailer'

function required(name) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

const transporter = nodemailer.createTransport({
  host: required('SMTP_HOST'),
  port: Number(required('SMTP_PORT')),
  secure: process.env.SMTP_SECURE === 'true', // true nếu port 465
  auth: {
    user: required('SMTP_USER'),
    pass: required('SMTP_PASS'),
  },
})

function formatAddress(shippingDetails) {
  const a = shippingDetails?.address
  if (!a) return 'N/A'

  return [
    shippingDetails?.name,
    a.line1,
    a.line2,
    `${a.city || ''} ${a.state || ''} ${a.postal_code || ''}`.trim(),
    a.country,
  ]
    .filter(Boolean)
    .join('\n')
}

function formatItems(fullSession) {
  const items = fullSession?.line_items?.data || []
  if (!items.length) return 'N/A'

  return items
    .map((li) => {
      const product = li.price?.product
      const name = product?.name || li.description || 'Item'
      const qty = li.quantity || 1
      const amount = (li.amount_total ?? 0) / 100
      const cur = (fullSession.currency || 'gbp').toUpperCase()
      return `- ${name} x${qty} = ${amount.toFixed(2)} ${cur}`
    })
    .join('\n')
}

export async function sendOrderEmails(fullSession) {
  const from = required('EMAIL_FROM') // vd: "Kairo Orders <orders@yourdomain.com>"
  const adminTo = required('EMAIL_TO_ADMIN') // email nhận đơn nội bộ (Peter)
  const customerEmail = fullSession.customer_details?.email

  const cur = (fullSession.currency || 'gbp').toUpperCase()
  const total = ((fullSession.amount_total || 0) / 100).toFixed(2)
  const subtotal = ((fullSession.amount_subtotal || 0) / 100).toFixed(2)
  const shipping = ((fullSession.total_details?.amount_shipping || 0) / 100).toFixed(2)

  const addressText = formatAddress(fullSession.shipping_details)
  const itemsText = formatItems(fullSession)

  // Nội dung chung
  const subject = `Order confirmed - ${fullSession.id}`
  const text = `
Thanks for your order!

Order ID: ${fullSession.id}
Payment Status: ${fullSession.payment_status}

Items:
${itemsText}

Subtotal: ${subtotal} ${cur}
Shipping: ${shipping} ${cur}
Total: ${total} ${cur}

Shipping Address:
${addressText}
`.trim()

  // ✅ 1) Gửi cho admin
  await transporter.sendMail({
    from,
    to: adminTo,
    subject: `[ADMIN] ${subject}`,
    text,
  })

  // ✅ 2) Gửi cho khách (nếu có email)
  if (customerEmail) {
    await transporter.sendMail({
      from,
      to: customerEmail,
      subject,
      text,
    })
  } else {
    console.log('ℹ️ No customer email found on session; only admin email sent.')
  }
}
