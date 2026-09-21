import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { clientKey, rateLimit, sweep } from '@/lib/rate-limit'
import { sanitizeText } from '@/lib/sanitize'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const RECIPIENT_EMAIL = 'karanbhardwaj1107@gmail.com'

export async function POST(request) {
  sweep()

  // Rate limit: 6 messages an hour per client
  const limit = rateLimit(`contact:${clientKey(request)}`, 6, 60 * 60_000)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'You have sent several messages recently. Please wait a bit before sending another.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Malformed JSON request.' }, { status: 400 })
  }

  // Honeypot for bot suppression
  if (body.website) {
    return NextResponse.json({ ok: true, message: 'Message sent.' })
  }

  const name = sanitizeText(body.name || '').slice(0, 80)
  const email = sanitizeText(body.email || '').slice(0, 100)
  const subject = sanitizeText(body.subject || '').slice(0, 120) || `Inquiry from ${name || 'Portfolio Visitor'}`
  const topic = sanitizeText(body.topic || '').slice(0, 50) || 'General'
  const message = sanitizeText(body.message || '').slice(0, 2000)

  if (name.length < 2) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
  }
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }
  if (message.length < 5) {
    return NextResponse.json({ error: 'Please write a short message.' }, { status: 400 })
  }

  // Build formatted text and HTML
  const emailSubject = `[Portfolio Contact] ${subject} (${name})`
  const emailText = `New Message from Portfolio Contact Form:

From: ${name}
Email: ${email}
Topic: ${topic}
Date: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST

Message:
${message}
`

  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif; line-height: 1.6; color: #16130f; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e3ded2; border-radius: 6px; background-color: #fbfaf7;">
      <h2 style="font-size: 20px; color: #b4451f; margin-top: 0; border-bottom: 1px solid #e3ded2; padding-bottom: 10px;">
        New Message from Portfolio
      </h2>
      <p style="font-size: 14px; color: #46413a; margin: 6px 0;"><strong>Sender Name:</strong> ${name}</p>
      <p style="font-size: 14px; color: #46413a; margin: 6px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #b4451f;">${email}</a></p>
      <p style="font-size: 14px; color: #46413a; margin: 6px 0;"><strong>Topic:</strong> ${topic}</p>
      <p style="font-size: 14px; color: #7c756a; margin: 6px 0;"><strong>Timestamp:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST</p>
      
      <div style="margin-top: 20px; padding: 15px; background: #ffffff; border: 1px solid #e3ded2; border-radius: 4px;">
        <h3 style="margin-top: 0; font-size: 15px; color: #16130f;">Message:</h3>
        <p style="white-space: pre-wrap; margin-bottom: 0; font-size: 14px; color: #16130f;">${message}</p>
      </div>

      <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #e3ded2; font-size: 12px; color: #a8a196;">
        Reply directly to this email to respond to ${name} (${email}).
      </div>
    </div>
  `

  let delivered = false
  let providerUsed = null
  let activationPending = false

  // 1. Service 1: Gmail SMTP / Custom SMTP (Nodemailer)
  // Highly recommended: 100% direct delivery to karanbhardwaj1107@gmail.com
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || RECIPIENT_EMAIL
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD
  if (smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE || 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })

      await transporter.sendMail({
        from: `"${name} via Portfolio" <${smtpUser}>`,
        replyTo: email,
        to: RECIPIENT_EMAIL,
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
      })

      delivered = true
      providerUsed = 'smtp'
      console.log(`[contact-api] Email sent via SMTP to ${RECIPIENT_EMAIL}`)
    } catch (err) {
      console.error('[contact-api] nodemailer send failed:', err.message)
    }
  }

  // 2. Service 2: Resend API
  if (!delivered && process.env.RESEND_API_KEY) {
    try {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Portfolio Contact <onboarding@resend.dev>',
          to: [RECIPIENT_EMAIL],
          reply_to: email,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
        }),
      })

      if (resendRes.ok) {
        delivered = true
        providerUsed = 'resend'
        console.log(`[contact-api] Email sent via Resend to ${RECIPIENT_EMAIL}`)
      }
    } catch (err) {
      console.error('[contact-api] resend error:', err.message)
    }
  }

  // 3. Service 3: Web3Forms API
  if (!delivered && process.env.WEB3FORMS_ACCESS_KEY) {
    try {
      const web3Res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          name,
          email,
          subject: emailSubject,
          message: `From: ${name} (${email})\nTopic: ${topic}\n\nMessage:\n${message}`,
          from_name: `${name} (Portfolio)`,
          replyto: email,
        }),
      })

      const web3Data = await web3Res.json().catch(() => ({}))
      if (web3Res.ok && web3Data.success) {
        delivered = true
        providerUsed = 'web3forms'
        console.log(`[contact-api] Email sent via Web3Forms to ${RECIPIENT_EMAIL}`)
      }
    } catch (err) {
      console.error('[contact-api] web3forms error:', err.message)
    }
  }

  // 4. Service 4: FormSubmit Direct Forwarder
  if (!delivered) {
    try {
      const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://karanbhardwaj.in',
          'Referer': 'https://karanbhardwaj.in/contact',
        },
        body: JSON.stringify({
          name,
          email,
          _subject: emailSubject,
          topic,
          message,
          _replyto: email,
        }),
      })

      const fsData = await formSubmitRes.json().catch(() => ({}))
      if (formSubmitRes.ok && (fsData.success === 'true' || fsData.success === true)) {
        delivered = true
        providerUsed = 'formsubmit'
        console.log(`[contact-api] Email sent via FormSubmit to ${RECIPIENT_EMAIL}`)
      } else if (
        fsData.message &&
        (fsData.message.toLowerCase().includes('activation') || fsData.message.toLowerCase().includes('activate'))
      ) {
        activationPending = true
        console.log(`[contact-api] FormSubmit activation pending for ${RECIPIENT_EMAIL}`)
      }
    } catch (err) {
      console.error('[contact-api] formsubmit dispatch failed:', err.message)
    }
  }

  if (delivered) {
    return NextResponse.json({
      ok: true,
      delivered: true,
      provider: providerUsed,
      message: `Your message has been sent directly to Karan (${RECIPIENT_EMAIL}). You will receive a response shortly.`,
    })
  }

  if (activationPending) {
    return NextResponse.json({
      ok: true,
      delivered: false,
      activationPending: true,
      message: `FormSubmit sent a 1-time activation link to ${RECIPIENT_EMAIL}. Click 'Activate Form' in your inbox to enable direct submissions!`,
    })
  }

  // If server-side automatic forwarder is in offline/fallback mode,
  // return ok with mailto details so client seamlessly provides the instant email action
  return NextResponse.json({
    ok: true,
    delivered: false,
    mailClientFallback: true,
    message: `Ready to deliver to ${RECIPIENT_EMAIL}. Please confirm via your preferred email client or copy the draft below.`,
  })
}

