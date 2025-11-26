import { Meta, StoryObj } from '@storybook/nextjs'
import { WelcomeCard } from './WelcomeCard'

const meta: Meta<typeof WelcomeCard> = {
  component: WelcomeCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Displays a personalized greeting with account balance information. Users can toggle balance visibility for privacy.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: "User's name for personalized greeting",
      table: {
        type: { summary: 'string' },
      },
    },
    balance: {
      control: 'number',
      description: 'Account balance amount (will be formatted as currency)',
      table: {
        type: { summary: 'number' },
      },
    },
    accountType: {
      control: 'text',
      description: 'Type of account (e.g., Checking Account, Savings Account)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Checking Account' },
      },
    },
    date: {
      control: 'date',
      description: 'Date to display (will be formatted to long format)',
      table: {
        type: { summary: 'Date' },
        defaultValue: { summary: 'new Date()' },
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof WelcomeCard>

export const Default: Story = {
  args: {
    name: 'Joana',
    balance: 2500,
    accountType: 'Checking Account',
  },
}

export const HighBalance: Story = {
  args: {
    name: 'John',
    balance: 125000.5,
    accountType: 'Premium Checking',
  },
}

export const SavingsAccount: Story = {
  args: {
    name: 'Maria',
    balance: 5000,
    accountType: 'Savings Account',
  },
}

export const LongName: Story = {
  args: {
    name: 'João Pedro da Silva Santos',
    balance: 3500,
    accountType: 'Checking Account',
  },
}
