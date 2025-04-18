'use client'

import { Button, Illustration } from '@/components/ui'
import { useRouter } from 'next/navigation'

export default () => {
  const router = useRouter()

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

      <Button
        variant="orange"
        onClick={() => router.push('/home')}
      >
        Voltar ao início
      </Button>

      <div className="mt-6">
        <Illustration src="404.svg" className='flex' />
      </div>
    </div>
  )
}
