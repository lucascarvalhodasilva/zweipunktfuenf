'use server'

import nodemailer from 'nodemailer'

const RATE_LIMIT_MS = 60_000
const recentSubmissions = new Map()

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

function isRateLimited(key) {
  const now = Date.now()
  const last = recentSubmissions.get(key)
  if (last && now - last < RATE_LIMIT_MS) return true
  recentSubmissions.set(key, now)
  // keep map from growing unbounded
  if (recentSubmissions.size > 1000) {
    const oldest = recentSubmissions.keys().next().value
    recentSubmissions.delete(oldest)
  }
  return false
}

export async function submitContactForm(_prevState, formData) {
  // honeypot – bots fill this hidden field
  const honeypot = formData.get('website')
  if (honeypot) {
    // pretend success so bots don't retry
    return { success: true, message: 'Nachricht gesendet.' }
  }

  const name = (formData.get('name') || '').trim()
  const email = (formData.get('email') || '').trim()
  const phone = (formData.get('phone') || '').trim()
  const websiteUrl = (formData.get('website_url') || '').trim()
  const message = (formData.get('message') || '').trim()

  // validation
  const errors = {}
  if (!name || name.length < 2) {
    errors.name = 'Bitte gib deinen Namen ein.'
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Bitte gib eine gültige E-Mail-Adresse ein.'
  }
  if (!message || message.length < 10) {
    errors.message = 'Bitte schreibe mindestens 10 Zeichen.'
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors }
  }

  // simple in-memory rate-limit (per-deployment)
  if (isRateLimited(email)) {
    return {
      success: false,
      message: 'Bitte warte eine Minute bevor du erneut sendest.',
    }
  }

  try {
    const transporter = createTransporter()

    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? `"Website Anfrage" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO ?? 'anfragen@zweipunktfuenf.de',
      replyTo: `"${name}" <${email}>`,
      subject: `Neue Anfrage von ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}${phone ? `\nTelefon: ${phone}` : ''}${websiteUrl ? `\nWebseite: ${websiteUrl}` : ''}\n\nNachricht:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}${websiteUrl ? `<p><strong>Webseite:</strong> <a href="${websiteUrl}">${websiteUrl}</a></p>` : ''}<hr><p>${message.replace(/\n/g, '<br>')}</p>`,
    })

    return {
      success: true,
      message: 'Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei dir.',
    }
  } catch (err) {
    console.error('[contact] sendMail failed', err)
    return {
      success: false,
      message:
        'Etwas ist schiefgelaufen. Bitte versuche es später erneut oder schreibe uns direkt per E-Mail.',
    }
  }
}
