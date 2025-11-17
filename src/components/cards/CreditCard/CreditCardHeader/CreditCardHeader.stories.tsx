import type { Meta, StoryObj } from "@storybook/nextjs";
import { CreditCardHeader } from "./CreditCardHeader";

/**
 * Meta configuration for Storybook documentation of the CreditCardHeader component.
 * 
 * Provides comprehensive documentation with argTypes for all component props,
 * enabling interactive component exploration and automatic documentation generation.
 */
const meta: Meta<typeof CreditCardHeader> = {
  component: CreditCardHeader,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: 'CreditCardHeader component displays the card brand and blocked status badge.',
      },
    },
  },
  argTypes: {
    blocked: {
      control: 'boolean',
      description: 'Whether the card is blocked. When true, displays a "Blocked" badge.',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    blocked: false,
  },
};

export default meta;
type Story = StoryObj<typeof CreditCardHeader>;

export const Default: Story = {
  args: {
    blocked: false,
  },
};

export const Blocked: Story = {
  args: {
    blocked: true,
  },
};

