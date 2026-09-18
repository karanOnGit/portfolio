import { site } from '@/content/site'

export default function manifest() {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fbfaf7',
    theme_color: '#fbfaf7',
    lang: site.language,
    icons: [
      { src: '/logo.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/og-image.png', sizes: '800x800', type: 'image/png' },
    ],
  }
}
