'use server'

const RATE_LIMIT_MS = 60_000
const recentSubmissions = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const last = recentSubmissions.get(ip)
  if (last && now - last < RATE_LIMIT_MS) return true
  recentSubmissions.set(ip, now)
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
    // Log the inquiry – replace with an email service (e.g. Resend, Nodemailer)
    // when SMTP / API credentials are configured.
    console.log('[contact] New inquiry', {
      name,
      email,
      message: message.slice(0, 80),
    })

    return {
      success: true,
      message: 'Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei dir.',
    }
  } catch {
    return {
      success: false,
      message:
        'Etwas ist schiefgelaufen. Bitte versuche es später erneut oder schreibe uns direkt per E-Mail.',
    }
  }
}
