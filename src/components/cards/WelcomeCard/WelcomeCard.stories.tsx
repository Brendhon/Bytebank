import { Meta, StoryObj } from '@storybook/react'
import WelcomeCard from './WelcomeCard'

const meta: Meta<typeof WelcomeCard> = {
  component: WelcomeCard,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof WelcomeCard>

export const Default: Story = {
  args: {
    name: 'Joana',
    balance: 2500,
    accountType: 'Conta Corrente',
  },
}
