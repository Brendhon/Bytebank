import type { Meta, StoryObj } from "@storybook/nextjs";
import { CreditCardDetails } from "./CreditCardDetails";

/**
 * Meta configuration for Storybook documentation of the CreditCardDetails component.
 * 
 * Provides comprehensive documentation with argTypes for all component props,
 * enabling interactive component exploration and automatic documentation generation.
 */
const meta: Meta<typeof CreditCardDetails> = {
  component: CreditCardDetails,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: 'CreditCardDetails component displays cardholder name, expiration date, card number, and CVV. Information can be hidden or shown based on the showInfo prop.',
      },
    },
  },
  argTypes: {
    cardName: {
      control: 'text',
      description: 'Formatted cardholder name (first and last name only)',
      table: {
        type: { summary: 'string' },
      },
    },
    showInfo: {
      control: 'boolean',
      description: 'Whether to show card information (expiration, number, CVV). When false, information is masked.',
      table: {
        type: { summary: 'boolean' },
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
    cardName: "Joana Fonseca",
    showInfo: false,
    cvv: "123",
    number: "1234 5678 9012 3456",
    expiration: "12/34",
  },
};

export default meta;
type Story = StoryObj<typeof CreditCardDetails>;

export const Hidden: Story = {
  args: {
    cardName: "Joana Fonseca",
    showInfo: false,
  },
};

export const Visible: Story = {
  args: {
    cardName: "Marcos Silva",
    showInfo: true,
    number: "5532 6475 8570 4251",
    expiration: "03/25",
    cvv: "514",
  },
};

