import { Illustration } from '@/components/ui';

const benefits = [
  {
    icon: <Illustration src="box.png" width={60} className='flex' />,
    title: 'Conta e cartão gratuitos',
    description: 'Nossa conta é digital, sem custo fixo e sem tarifa de manutenção.',
  },
  {
    icon: <Illustration src="withdrawal.png" width={60} className='flex' />,
    title: 'Saques sem custo',
    description: 'Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.',
  },
  {
    icon: <Illustration src="star.png" width={60} className='flex' />,
    title: 'Programa de pontos',
    description: 'Acumule pontos com compras no crédito sem pagar mensalidade!',
  },
  {
    icon: <Illustration src="devices.png" width={60} className='flex' />,
    title: 'Seguro Dispositivos',
    description: 'Proteja seus dispositivos móveis por uma mensalidade simbólica.',
  },
];

export default () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 items-center">
        {/* Text */}
        <div className="flex flex-col gap-6">
          <h2 className="text-20-bold text-dark">
            Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!
          </h2>
        </div>

        {/* Img */}
        <Illustration src="home.svg" width={600} />

      </div>

      {/* Benefits */}
      <div className="mt-16 max-w-6xl mx-auto text-center">
        <h3 className="text-24-bold text-dark mb-10">Vantagens do nosso banco:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {benefits.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3">
              {item.icon}
              <h4 className="text-green text-14-semi">{item.title}</h4>
              <p className="text-14 text-gray">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
