import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

// Setup the Storybook configuration for the Button component
type Story = StoryObj<typeof Button>;

// Meta configuration for Storybook documentation of the Button component.
const meta: Meta<typeof Button> = {
  component: Button, // The component being documented
  tags: ['autodocs'], // Tags for documentation generation
  argTypes: { // Controls for the component's props in Storybook
    variant: {
      control: 'select',
      options: ['blue', 'green', 'orange', 'dark', 'outlineGreen', 'outlineOrange'], // Options for the variant prop
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    variant: 'blue', // Default variant for the button
    children: 'Button Label', // Default label for the button
    disabled: false, // Default disabled state
    onClick: () => alert('Button clicked!'), // Default click handler
  },
};

// Export the meta configuration for the Button component
export default meta;

// Define the default story for the Button component
export const Default: Story = {};

// Define additional stories for different button variants
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
