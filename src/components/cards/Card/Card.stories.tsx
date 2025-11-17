import { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

type Story = StoryObj<typeof Card>;

/**
 * Meta configuration for Storybook documentation of the Card component.
 * 
 * Provides comprehensive documentation with argTypes for all component props,
 * enabling interactive component exploration and automatic documentation generation.
 */
const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Cards/Card',
  argTypes: {
    variant: {
      control: 'select',
      options: ['blue', 'green', 'orange', 'dark'],
      description: 'Color variant of the card',
      table: {
        defaultValue: { summary: 'dark' },
        type: { summary: "'blue' | 'green' | 'orange' | 'dark'" },
      },
    },
    value: { 
      control: 'number',
      description: 'Numeric value to display (formatted as currency). If undefined, shows loading spinner.',
      table: {
        type: { summary: 'number | undefined' },
      },
    },
    label: { 
      control: 'text',
      description: 'Label text displayed below the value',
      table: {
        defaultValue: { summary: 'Payments' },
        type: { summary: 'string' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    variant: 'blue',
    label: 'Card Label',
  },
};

export default meta;

// Default story
export const Default: Story = {};

// Card Variants
export const Blue: Story = {
  args: { variant: 'blue', label: 'Deposits', value: 24000 },
};

export const Green: Story = {
  args: { variant: 'green', label: 'Withdrawals', value: 12000 },
};

export const Orange: Story = {
  args: { variant: 'orange', label: 'Transfers', value: 6000.45 },
};

export const Dark: Story = {
  args: { variant: 'dark', label: 'Payments', value: 24000 },
};

export const Loading: Story = {
  args: { variant: 'dark', label: 'Payments' },
};
