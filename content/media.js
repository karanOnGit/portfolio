/**
 * content/media.js
 * Cloudflare R2 hosted media and video assets.
 * Streaming from custom domain: media.karanbhardwaj.in
 */

export const MEDIA_BASE_URL = 'https://media.karanbhardwaj.in'
export const MEDIA_R2_DEV_URL = 'https://pub-9aa0232a707649f888454096dcba0610.r2.dev'

export const videos = [
  {
    id: 'seduction-xyz',
    title: 'Seduction XYZ',
    filename: 'seduction-xyz.mp4',
    url: `${MEDIA_BASE_URL}/seduction-xyz.mp4`,
    fallbackUrl: `${MEDIA_R2_DEV_URL}/seduction-xyz.mp4`,
    type: 'video/mp4',
  },
  {
    id: 'bkt-lst-01',
    title: 'Bucket List — Part 01',
    filename: 'bkt-lst-01.mp4',
    url: `${MEDIA_BASE_URL}/bkt-lst-01.mp4`,
    fallbackUrl: `${MEDIA_R2_DEV_URL}/bkt-lst-01.mp4`,
    type: 'video/mp4',
  },
  {
    id: 'bkt-lst-02',
    title: 'Bucket List — Part 02',
    filename: 'bkt-lst-02.mp4',
    url: `${MEDIA_BASE_URL}/bkt-lst-02.mp4`,
    fallbackUrl: `${MEDIA_R2_DEV_URL}/bkt-lst-02.mp4`,
    type: 'video/mp4',
  },
]
