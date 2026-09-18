/**
 * lib/api/groq.js
 * Draft generation for the journal editor.
 *
 * The Groq credential is read from server env and never leaves the server —
 * the browser talks to /api/ai/draft, which talks to Groq.
 */

import 'server-only'
import { env } from '@/lib/env'

const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions'

const SYSTEM_PROMPT = `You are a senior technical editor. Given a topic, produce a publication-ready article as strict JSON.

Return ONLY a JSON object with these keys:
  title            — a specific, non-clickbait headline, max 70 characters
  slug             — lowercase, hyphenated, ASCII only
  category         — one of: Engineering, AI, Architecture, Performance, Notes
  short_description— one sentence, max 160 characters
  meta_title       — max 60 characters
  meta_description — max 155 characters
  meta_keyword     — array of 5 to 8 search keywords
  tags             — array of 4 to 6 short topic tags, no hash prefix
  body_text        — the article as clean semantic HTML

Rules for body_text:
  - Use only <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <blockquote>, <pre><code>.
  - No <h1>, no inline styles, no class attributes, no script or iframe tags.
  - 700 to 1100 words, opening with substance rather than a preamble.
  - Concrete and specific. No filler, no "in today's fast-paced world" openings.`

/**
 * @param {string} topic
 * @param {string} [guidance] Optional extra direction from the author.
 * @returns {Promise<object>} Parsed draft fields.
 */
export async function generateDraft(topic, guidance = '') {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.groqKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: env.groqModel,
      temperature: 0.6,
      max_tokens: 6000,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: guidance
            ? `Topic: ${topic}\n\nAdditional direction: ${guidance}`
            : `Topic: ${topic}`,
        },
      ],
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new Error(`Groq responded ${response.status}: ${detail.slice(0, 200)}`)
  }

  const payload = await response.json()
  const content = payload.choices?.[0]?.message?.content
  if (!content) throw new Error('Groq returned an empty completion.')

  try {
    return JSON.parse(content)
  } catch {
    throw new Error('Groq returned malformed JSON.')
  }
}
