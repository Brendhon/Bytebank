import type { Meta, StoryObj } from '@storybook/nextjs'
import { MovementsSection } from './MovementsSection'
import { CardProps } from '@/types/ui'

const meta: Meta<typeof MovementsSection> = {
  component: MovementsSection,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MovementsSection>

const sampleData: CardProps[] = [
  { key: 'payment', label: 'Pagamentos', value: 24000.45, variant: 'dark' },
  { key: 'deposit', label: 'Depósitos', value: 24000.45, variant: 'blue' },
  { key: 'transfer', label: 'Transferências', value: 24000.45, variant: 'orange' },
  { key: 'withdrawal', label: 'Saque', variant: 'green' },
]

export const Default: Story = {
  args: {
    data: sampleData,
  },
}
