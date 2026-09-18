import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

/**
 * The social card, generated rather than maintained as a file.
 *
 * It reuses the site's own paper-and-ink language, so a shared link looks like
 * the page it points at, and it reads its copy from content/site.js — which
 * means it can never drift out of date with the page itself.
 */

export const alt = `${site.name} — ${site.role} & ${site.secondaryRole}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Satori needs real font data; it cannot resolve a CSS font stack. This pulls
 * the display face from Google's static host at build time and falls back to
 * next/og's bundled sans if the network is unavailable, so a build never fails
 * over a social image.
 */
async function loadDisplayFont() {
  try {
    // The legacy css endpoint, asked for by an old user agent, answers with a
    // WOFF URL. The modern css2 endpoint only serves WOFF2, which Satori
    // cannot parse.
    const css = await fetch('https://fonts.googleapis.com/css?family=Instrument+Serif', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.112 Safari/534.30',
      },
    }).then((response) => response.text())

    const url = css.match(/src:\s*url\(([^)]+)\)/)?.[1]
    if (!url) return null

    const data = await fetch(url).then((response) => response.arrayBuffer())
    return [{ name: 'Instrument Serif', data, style: 'normal', weight: 400 }]
  } catch {
    return null
  }
}

export default async function Image() {
  const fonts = await loadDisplayFont()
  const display = fonts ? 'Instrument Serif' : 'serif'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#fbfaf7',
          padding: '64px 72px',
          // A hairline grid, echoing the drawing behind the live page.
          backgroundImage:
            'linear-gradient(to right, rgba(22,19,15,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(22,19,15,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 21,
            letterSpacing: 2,
            color: '#7c756a',
          }}
        >
          <div style={{ display: 'flex' }}>{site.url.replace('https://', '').toUpperCase()}</div>
          <div style={{ display: 'flex' }}>
            {site.location.city.toUpperCase()}, {site.location.country.toUpperCase()}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontFamily: display,
              fontSize: 138,
              lineHeight: 1,
              letterSpacing: -5,
              color: '#16130f',
            }}
          >
            Karan
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: display,
              fontSize: 138,
              lineHeight: 1,
              letterSpacing: -5,
              // The live page outlines this line with -webkit-text-stroke.
              // Satori renders neither that nor textShadow, so the same
              // hierarchy is carried by tone instead of by outline.
              color: '#b9b2a6',
            }}
          >
            Bhardwaj
          </div>

          <div
            style={{
              display: 'flex',
              gap: 10,
              marginTop: 30,
              fontFamily: display,
              fontSize: 40,
              color: '#46413a',
            }}
          >
            <div style={{ display: 'flex' }}>{site.role} &</div>
            <div style={{ display: 'flex', color: '#b4451f' }}>{site.secondaryRole}</div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            borderTop: '1px solid #e3ded2',
            paddingTop: 26,
            fontSize: 24,
            lineHeight: 1.4,
            color: '#46413a',
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size, ...(fonts ? { fonts } : {}) },
  )
}
