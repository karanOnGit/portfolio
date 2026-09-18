import { redirect } from 'next/navigation'
import { isAuthor } from '@/lib/auth'
import { buildMetadata } from '@/lib/seo'
import SignInForm from './SignInForm'
import styles from './studio.module.css'

/**
 * Author sign-in.
 *
 * Rendered per request because it depends on the session cookie, and excluded
 * from search indexes — there is nothing here for a crawler.
 */
export const dynamic = 'force-dynamic'

export const metadata = buildMetadata({
  title: 'Studio',
  description: 'Author access.',
  path: '/studio',
  noIndex: true,
})

export default async function StudioPage() {
  if (await isAuthor()) redirect('/blog')

  return (
    <div className={`shell ${styles.wrap}`}>
      <SignInForm />
    </div>
  )
}
