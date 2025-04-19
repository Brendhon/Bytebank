import type { Meta, StoryObj } from '@storybook/react'
import MovementsSection from './MovementsSection'
import { CardProps } from '@/types/ui'

const meta: Meta<typeof MovementsSection> = {
  component: MovementsSection,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MovementsSection>

const sampleData: CardProps[] = [
  { label: 'Pagamentos', value: 24000.45, variant: 'dark' },
  { label: 'Depósitos', value: 24000.45, variant: 'blue' },
  { label: 'Transferências', value: 24000.45, variant: 'orange' },
  { label: 'Saque', variant: 'green' },
]

export const Default: Story = {
  args: {
    data: sampleData,
  },
}
