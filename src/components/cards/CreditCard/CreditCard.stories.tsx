import type { Meta, StoryObj } from "@storybook/nextjs";
import { CreditCard } from "./CreditCard";

/**
 * Meta configuration for Storybook documentation of the CreditCard component.
 * 
 * Provides comprehensive documentation with argTypes for all component props,
 * enabling interactive component exploration and automatic documentation generation.
 */
const meta: Meta<typeof CreditCard> = {
  component: CreditCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: 'CreditCard component displays a stylized credit card with support for physical and digital variants, information visibility toggle, and blocked status.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['physical', 'digital'],
      description: 'Type of credit card (physical or digital)',
      table: {
        type: { summary: "'physical' | 'digital'" },
      },
    },
    showInfo: {
      control: 'boolean',
      description: 'Whether to show card information (expiration, number, CVV). When false, information is masked.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    blocked: {
      control: 'boolean',
      description: 'Whether the card is blocked. When true, displays a "Blocked" badge.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    name: {
      control: 'text',
      description: 'Cardholder full name (will be formatted to show first and last name only)',
      table: {
        type: { summary: 'string' },
      },
    },
    number: {
      control: 'text',
      description: 'Card number (displayed when showInfo is true)',
      table: {
        type: { summary: 'string' },
      },
    },
    expiration: {
      control: 'text',
      description: 'Card expiration date (MM/YY format, displayed when showInfo is true)',
      table: {
        type: { summary: 'string' },
      },
    },
    cvv: {
      control: 'text',
      description: 'Card CVV code (displayed when showInfo is true)',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    name: "Joana Fonseca Gomes",
    blocked: false,
    cvv: "123",
    number: "1234 5678 9012 3456",
    expiration: "12/34",
    variant: "physical",
    showInfo: false,
  },
};

export default meta;
type Story = StoryObj<typeof CreditCard>;

export const PhysicalCard: Story = {
  args: {
    variant: "physical",
    showInfo: false,
  },
};

export const DigitalCardHidden: Story = {
  args: {
    variant: "digital",
    showInfo: false,
  },
};

export const DigitalCardVisible: Story = {
  args: {
    name: "Marcos",
    variant: "digital",
    showInfo: true,
    number: "5532 6475 8570 4251",
    expiration: "03/25",
    cvv: "514",
  },
};

export const BlockedCard: Story = {
  args: {
    variant: "physical",
    showInfo: false,
    blocked: true,
  },
};
