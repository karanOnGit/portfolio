'use client'

import { useState } from 'react'
import { site } from '@/content/site'
import styles from './contact.module.css'

const MAX_MESSAGE = 1200

const QUICK_TOPICS = [
  'Full-Stack Role',
  'AI / LLM Systems',
  'Automation Pipeline',
  'Contract Project',
  'Say Hello',
]

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [topic, setTopic] = useState('Full-Stack Role')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [copiedDraft, setCopiedDraft] = useState(false)
  const [status, setStatus] = useState(null)
  const [busy, setBusy] = useState(false)

  const handleTopicSelect = (item) => {
    setTopic(item)
    if (!subject || QUICK_TOPICS.includes(subject)) {
      setSubject(`[${item}] Project Inquiry`)
    }
  }

  const buildEmailDraft = () => {
    const finalSubject = subject.trim() || `[${topic}] Inquiry from ${name.trim() || 'Portfolio Visitor'}`
    const finalBody = [
      `Hi Karan,`,
      ``,
      message.trim(),
      ``,
      `---`,
      `From: ${name.trim()} (${email.trim() || 'No email provided'})`,
      `Topic: ${topic}`,
      `Sent via: portfolio contact page`,
    ].join('\n')

    return { subject: finalSubject, body: finalBody }
  }

  const getGmailWebUrl = () => {
    const { subject: finalSubject, body: finalBody } = buildEmailDraft()
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}&su=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(finalBody)}`
  }

  const getOutlookWebUrl = () => {
    const { subject: finalSubject, body: finalBody } = buildEmailDraft()
    return `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(site.email)}&subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(finalBody)}`
  }

  const getMailtoUrl = () => {
    const { subject: finalSubject, body: finalBody } = buildEmailDraft()
    return `mailto:${site.email}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(finalBody)}`
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (website) return // bot trap

    if (!name.trim()) {
      setStatus({ tone: 'error', text: 'Please enter your name.' })
      return
    }
    if (!email.trim() || !email.includes('@')) {
      setStatus({ tone: 'error', text: 'Please enter a valid email address so I can reply.' })
      return
    }
    if (!message.trim() || message.trim().length < 5) {
      setStatus({ tone: 'error', text: 'Please write a message (at least 5 characters).' })
      return
    }

    setBusy(true)
    setStatus(null)

    const { subject: finalSubject, body: finalBody } = buildEmailDraft()

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, subject: finalSubject, topic, message }),
      })

      const payload = await response.json().catch(() => ({}))

      if (payload.delivered) {
        setStatus({
          tone: 'success',
          text: `✓ Message sent directly to Karan (${site.email})! Your note has been delivered to my personal inbox.`,
        })
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      } else if (payload.activationPending) {
        setStatus({
          tone: 'info',
          text: `✓ Message dispatched! FormSubmit sent a 1-time activation link to ${site.email}. Once verified, subsequent emails deliver automatically.`,
        })
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      } else if (payload.mailClientFallback) {
        // Fallback: launch mail client with pre-filled content
        window.location.href = getMailtoUrl()
        setStatus({
          tone: 'info',
          text: `Opened your email client with your message pre-filled to ${site.email}. You can also use the Gmail Web or Copy Draft buttons below.`,
        })
      } else if (!response.ok) {
        throw new Error(payload.error || 'Could not send message.')
      } else {
        setStatus({
          tone: 'success',
          text: `✓ Message sent directly to ${site.email}.`,
        })
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      }
    } catch (error) {
      // If network fails, offer instant mail client launch
      window.location.href = getMailtoUrl()
      setStatus({
        tone: 'error',
        text: `${error.message || 'Connection error.'} Opened your email client to send directly to ${site.email}.`,
      })
    } finally {
      setBusy(false)
    }
  }

  const handleCopyDraft = async () => {
    const { subject: finalSubject, body: finalBody } = buildEmailDraft()
    const textToCopy = `To: ${site.email}\nSubject: ${finalSubject}\n\n${finalBody}`

    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopiedDraft(true)
      setTimeout(() => setCopiedDraft(false), 2600)
    } catch {
      window.location.href = getMailtoUrl()
    }
  }

  return (
    <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
      <div className={styles.formHeader}>
        <div className={styles.recipientBadge}>
          <span className={styles.recipientDot} aria-hidden="true" />
          <span>Direct delivery to {site.email}</span>
        </div>
        <h2 className={styles.formTitle}>
          Send a <em>direct</em> message
        </h2>
        <p className={styles.formDesc}>
          Have an opportunity or project? Fill out the details below to send an email directly to my personal inbox.
        </p>
      </div>

      {/* Quick Topic Chips */}
      <div className={styles.field}>
        <span className={styles.label}>Topic</span>
        <div className={styles.quickTopics}>
          {QUICK_TOPICS.map((item) => (
            <button
              key={item}
              type="button"
              className={styles.topicPill}
              data-active={topic === item}
              onClick={() => handleTopicSelect(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-name">
          <span>Your Name</span>
          <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe / Company"
          maxLength={80}
          required
          autoComplete="name"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-email">
          <span>Your Email</span>
          <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@example.com"
          maxLength={100}
          required
          autoComplete="email"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-subject">
          <span>Subject Line</span>
        </label>
        <input
          id="contact-subject"
          className={styles.input}
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder={`[${topic}] Project Inquiry`}
          maxLength={120}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="contact-message">
          <span>Message</span>
          <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          className={styles.textarea}
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE))}
          placeholder="Tell me what you are working on, the timeline, or what problem you need solved..."
          rows={6}
          required
        />
        <span className={styles.counter}>
          {message.length} / {MAX_MESSAGE}
        </span>
      </div>

      {/* Honeypot field for bot suppression */}
      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
      </div>

      {status ? (
        <p className={styles.status} data-tone={status.tone} role="status">
          {status.text}
        </p>
      ) : null}

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={busy}
        >
          <span>✉</span>
          <span>{busy ? 'Sending to Karan...' : 'Send Message to Karan'}</span>
        </button>

        <button
          type="button"
          onClick={handleCopyDraft}
          className={styles.copyDraftBtn}
          title="Copy formatted email draft to clipboard"
        >
          <span>{copiedDraft ? '✓' : '⧉'}</span>
          <span>{copiedDraft ? 'Draft Copied!' : 'Copy Draft'}</span>
        </button>
      </div>

      {/* Secondary quick webmail launchers */}
      <div className={styles.altSection}>
        <span className={styles.altSectionTitle}>Prefer your own email service?</span>
        <div className={styles.altLinks}>
          <a
            href={getGmailWebUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.altBtn}
            title="Compose draft directly in Gmail in your browser"
          >
            <span>🌐</span>
            <span>Gmail Web ↗</span>
          </a>
          <a
            href={getOutlookWebUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.altBtn}
            title="Compose draft directly in Outlook Web"
          >
            <span>✉</span>
            <span>Outlook Web ↗</span>
          </a>
          <a
            href={getMailtoUrl()}
            className={styles.altBtn}
            title="Open default mail client"
          >
            <span>↗</span>
            <span>Default App</span>
          </a>
        </div>
      </div>
    </form>
  )
}
