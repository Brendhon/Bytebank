import { Illustration } from '@/components/ui'
import { PAGE_ROUTES } from '@/lib/constants'
import Link from 'next/link'

export default () => {
  return (
    <div className="w-full text-center p-8 gap-6 flex flex-col items-center justify-center">
      <h1 className="text-24-bold text-dark">
        Ops! Não encontramos a página…
      </h1>
      <p className="text-dark text-16 mt-2">
        E olha que exploramos o universo procurando por ela!
        <br />
        Que tal voltar e tentar novamente?
      </p>

      <Link href={PAGE_ROUTES.HOME} className="button button-orange">
        Voltar ao início
      </Link>

      <div className="mt-6">
        <Illustration src="404.svg" className='flex' />
      </div>
    </div>
  )
}
