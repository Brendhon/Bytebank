import { Illustration } from '@/components/ui';
import { Benefit } from '@/types/layout';

/**
 * BenefitsSection component props
 * @interface BenefitsSectionProps
 */
export interface BenefitsSectionProps {
  /** Additional CSS classes */
  className?: string;
  /** Custom title for the section */
  title?: string;
  /** Custom benefits data (optional, uses default if not provided) */
  benefits?: Benefit[];
}

const defaultBenefits: Benefit[] = [
  {
    id: 'free-account',
    iconSrc: 'box.png',
    title: 'Conta e cartão gratuitos',
    description: 'Nossa conta é digital, sem custo fixo e sem tarifa de manutenção.',
  },
  {
    id: 'free-withdrawals',
    iconSrc: 'withdrawal.png',
    title: 'Saques sem custo',
    description: 'Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.',
  },
  {
    id: 'points-program',
    iconSrc: 'star.png',
    title: 'Programa de pontos',
    description: 'Acumule pontos com compras no crédito sem pagar mensalidade!',
  },
  {
    id: 'device-insurance',
    iconSrc: 'devices.png',
    title: 'Seguro Dispositivos',
    description: 'Proteja seus dispositivos móveis por uma mensalidade simbólica.',
  },
];

/**
 * Benefits section component that displays bank benefits and advantages
 * Renders a section with a heading, illustration, and a grid of benefit items
 * @param props - BenefitsSection component props
 * @returns A benefits section component
 */
export const BenefitsSection = ({
  className,
  title,
  benefits: customBenefits,
}: BenefitsSectionProps = {}) => {
  const displayBenefits = customBenefits || defaultBenefits;
  const sectionTitle = title || 'Vantagens do nosso banco:';
  const mainHeading = 'Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!';

  return (
    <section className={className ? `${styles.section} ${className}` : styles.section}>
      <div className={styles.container}>
        {/* Text section */}
        <div className={styles.textContainer}>
          <h2 className={styles.heading}>{mainHeading}</h2>
        </div>

        {/* Illustration */}
        <Illustration
          src="home.svg"
          width={600}
          alt="Home illustration showing financial freedom and control"
        />
      </div>

      {/* Benefits grid */}
      <div className={styles.benefitsContainer}>
        <h3 className={styles.benefitsTitle}>{sectionTitle}</h3>
        <div className={styles.benefitsGrid}>
          {displayBenefits.map((item) => (
            <div key={item.id} className={styles.benefitItem}>
              <Illustration
                src={item.iconSrc}
                width={60}
                alt={`${item.title} - ${item.description}`}
                className={styles.benefitIcon}
              />
              <h4 className={styles.benefitTitle}>{item.title}</h4>
              <p className={styles.benefitDescription}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * BenefitsSection component styles
 */
const styles = {
  section: '',
  container: 'max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 items-center',
  textContainer: 'flex flex-col gap-6',
  heading: 'text-20-bold text-dark',
  benefitsContainer: 'mt-16 max-w-6xl mx-auto text-center',
  benefitsTitle: 'text-24-bold text-dark mb-10',
  benefitsGrid: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center',
  benefitItem: 'flex flex-col items-center gap-3',
  benefitIcon: 'flex',
  benefitTitle: 'text-green text-14-semi',
  benefitDescription: 'text-14 text-gray',
} as const;
