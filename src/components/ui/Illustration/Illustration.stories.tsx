import { Meta, StoryObj } from '@storybook/react';
import Illustration from './Illustration';

const meta: Meta<typeof Illustration> = {
  component: Illustration,
  tags: ['autodocs'],
};

// Export the meta object to be used in Storybook
export default meta;

// Define the type for the story
type Story = StoryObj<typeof Illustration>;

// Default export for the story
export const Default: Story = {
  args: {
    src: 'register.svg',
  },
};

// Story for the Illustration component with different sizes
export const Small: Story = {
  args: {
    src: 'settings.svg',
    width: 200,
  },
};

// Story for the Illustration component with Large width
export const Large: Story = {
  args: {
    src: '404.svg',
    width: 600,
  },
};

// Story for the Illustration component with custom class
export const WithCustomClass: Story = {
  args: {
    src: 'login.svg',
    className: 'rounded-lg border border-gray-200 p-4 bg-gray-50',
  },
};

// Story for the Illustration component with different format
export const WithDifferentFormat: Story = {
  args: {
    src: 'devices.png',
    width: 50,
  },
};
