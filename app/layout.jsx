import Script from 'next/script'
import '@/styles/globals.css'

import { fontClassNames } from '@/app/fonts'
import { site } from '@/content/site'
import { absoluteUrl } from '@/lib/seo'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SketchField from '@/components/motion/SketchField'
import RevealAgent from '@/components/motion/RevealAgent'
import SmoothScroll from '@/components/motion/SmoothScroll'
import ScrollProgress from '@/components/motion/ScrollProgress'

/**
 * Root layout.
 *
 * Defaults live here — metadataBase, the title template, the icon set and the
 * global chrome. Individual routes override only what they need.
 */
export const metadata = {
  metadataBase: new URL(absoluteUrl('/')),
  title: {
    default: `${site.name} — ${site.role} & ${site.secondaryRole}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: 'technology',
  alternates: { canonical: '/' },
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
    apple: '/profile.jpg',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#fbfaf7',
  colorScheme: 'light',
}

export default function RootLayout({ children }) {
  const { gtmId, gaId } = site.analytics

  return (
    <html lang={site.language} className={fontClassNames}>
      <head>
        {/* Analytics hosts are contacted after hydration; warming the
            connection early removes a round trip from that first request. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://api.carsnbike.com" />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <SketchField />
        <ScrollProgress />

        <Header />
        <main id="main">{children}</main>
        <Footer />

        <RevealAgent />
        <SmoothScroll />

        {/* afterInteractive keeps tag loading off the critical path — it runs
            once the page is usable rather than competing with it. */}
        {gtmId ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        ) : null}

        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
            </Script>
          </>
        ) : null}

        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
      </body>
    </html>
  )
}
