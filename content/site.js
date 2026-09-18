/**
 * content/site.js
 * Single source of truth for identity, contact channels and global SEO defaults.
 * Imported by metadata builders, JSON-LD emitters, sitemap and layout chrome.
 */

export const site = {
  name: 'Karan Bhardwaj',
  shortName: 'Karan Bhardwaj',
  role: 'Full Stack Engineer',
  secondaryRole: 'AI Systems Architect',
  url: 'https://karanbhardwaj.in',
  locale: 'en_IN',
  language: 'en',
  timezone: 'Asia/Kolkata',
  location: {
    city: 'Mohali',
    region: 'Punjab',
    country: 'India',
    countryCode: 'IN',
  },
  email: 'karanbhardwaj1107@gmail.com',
  phone: '+91 6202640773',
  resume: '/KaranBhardwaj_Resume.pdf',
  avatar: '/profile.jpg',
  portrait: '/professional-img.png',
  ogImage: '/og-image.png',
  tagline: 'I build autonomous systems where generative AI meets production web infrastructure.',
  description:
    'Karan Bhardwaj is a Full Stack Engineer and AI systems architect in Mohali, India. He builds autonomous content pipelines, FastAPI backends and search-dominant Next.js frontends.',
  availability: 'Open to senior full-stack and AI engineering roles',
  analytics: {
    gtmId: 'GTM-TGDVPZNW',
    gaId: 'G-7DELT3LZNN',
  },
}

export const socials = [
  { label: 'GitHub', handle: '@karanongit', href: 'https://github.com/karanongit' },
  {
    label: 'LinkedIn',
    handle: 'karan-bhardwaj',
    href: 'https://www.linkedin.com/in/karan-bhardwaj-849296227/',
  },
  { label: 'Email', handle: site.email, href: `mailto:${site.email}` },
]

export const navigation = {
  sections: [
    { label: 'Work', href: '/#work' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Stack', href: '/#stack' },
    { label: 'About', href: '/#about' },
  ],
  pages: [
    { label: 'Journal', href: '/blog' },
    { label: 'Roadmap', href: '/roadmap' },
    { label: 'Interests', href: '/interests' },
    { label: 'Guestbook', href: '/guestbook' },
  ],
}

export const metrics = [
  { value: '15+', label: 'Systems shipped to production' },
  { value: '120+', label: 'Destinations served by one OTA build' },
  { value: '<200ms', label: 'Median FastAPI response time' },
  { value: '98+', label: 'Lighthouse performance, typical build' },
]
