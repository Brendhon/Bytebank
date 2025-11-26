import { Meta, StoryObj } from '@storybook/nextjs';
import Button from './Button';

// Setup the Storybook configuration for the Button component
type Story = StoryObj<typeof Button>;

// Meta configuration for Storybook documentation of the Button component.
const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['blue', 'green', 'orange', 'dark', 'outlineGreen', 'outlineOrange'], // Options for the variant prop
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    variant: 'blue',
    children: 'Button Label',
    disabled: false,
    loading: false,
    onClick: () => alert('Button clicked!'),
  },
};

export default meta;

// Default story
export const Default: Story = {};

// Button Variants
export const Blue: Story = {
  args: { variant: 'blue', children: 'Blue', onClick: () => alert('Blue button clicked!') },
};

export const Green: Story = {
  args: { variant: 'green', children: 'Green', onClick: () => alert('Green button clicked!') },
};

export const Orange: Story = {
  args: { variant: 'orange', children: 'Orange', onClick: () => alert('Orange button clicked!') },
};

export const OutlineGreen: Story = {
  args: { variant: 'outlineGreen', children: 'Outline Green', onClick: () => alert('Outline Green button clicked!') },
};

export const OutlineOrange: Story = {
  args: { variant: 'outlineOrange', children: 'Outline Orange', onClick: () => alert('Outline Orange button clicked!') },
};

export const Dark: Story = {
  args: { variant: 'dark', children: 'Dark', onClick: () => alert('Dark button clicked!') },
};

export const Disabled: Story = {
  args: { variant: 'dark', disabled: true, children: 'Disabled' },
};

export const Loading: Story = {
  args: {
    variant: 'blue',
    loading: true,
    children: 'Carregando...',
  },
};
