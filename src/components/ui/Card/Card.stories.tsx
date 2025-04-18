import { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

// Setup the Storybook configuration for the Card component
type Story = StoryObj<typeof Card>;

// Meta configuration for Storybook documentation of the Card component.
const meta: Meta<typeof Card> = {
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['blue', 'green', 'orange', 'dark'], // Options for the variant prop
    },
    value: { control: 'number' },
    label: { control: 'text' },
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
  args: { variant: 'blue', label: 'Depósitos', value: 24000 },
};

export const Green: Story = {
  args: { variant: 'green', label: 'Saques', value: 12000 },
};

export const Orange: Story = {
  args: { variant: 'orange', label: 'Transferências', value: 6000.45 },
};

export const Dark: Story = {
  args: { variant: 'dark', label: 'Pagamentos', value: 24000 },
};

export const Loading: Story = {
  args: { variant: 'dark' },
};
