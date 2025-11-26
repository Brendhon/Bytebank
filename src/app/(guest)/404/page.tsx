import { Illustration } from '@/components/ui'
import { PAGE_ROUTES } from '@/lib/constants'
import Link from 'next/link'

/**
 * 404 Not Found page component for guest users.
 * 
 * Displays a user-friendly error message when a route is not found,
 * along with an illustration and a link to return to the home page.
 * 
 * This is a Server Component that renders on the server side,
 * providing optimal performance and SEO benefits.
 * 
 * @returns {JSX.Element} 404 error page content with accessible structure
 */
export default function NotFound404() {
  return (
    <main className={styles.container} role="main">
      <h1 className={styles.title}>
        Ops! Não encontramos a página…
      </h1>
      <div className={styles.description}>
        <p>E olha que exploramos o universo procurando por ela!</p>
        <p>Que tal voltar e tentar novamente?</p>
      </div>

      <Link 
        href={PAGE_ROUTES.HOME} 
        className={styles.button}
        aria-label="Voltar para a página inicial"
      >
        Voltar ao início
      </Link>

      <div className={styles.illustration} aria-hidden="true">
        <Illustration src="404.svg" className={styles.illustrationImage} alt="" />
      </div>
    </main>
  )
}

/**
 * Component styles isolated at the end of the file
 */
const styles = {
  container: 'w-full text-center p-8 gap-6 flex flex-col items-center justify-center',
  title: 'text-24-bold text-dark',
  description: 'text-dark text-16 mt-2',
  button: 'button button-orange w-full mt-6',
  illustration: 'mt-6',
  illustrationImage: 'flex',
} as const;
