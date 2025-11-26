import { Meta, StoryObj } from '@storybook/nextjs';
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
    alt: 'Registration illustration',
  },
};

// Story for the Illustration component with different sizes
export const Small: Story = {
  args: {
    src: 'settings.svg',
    alt: 'Settings illustration',
    width: 200,
  },
};

// Story for the Illustration component with Large width
export const Large: Story = {
  args: {
    src: '404.svg',
    alt: '404 error page illustration',
    width: 600,
  },
};

// Story for the Illustration component with custom class
export const WithCustomClass: Story = {
  args: {
    src: 'login.svg',
    alt: 'Login illustration',
    className: 'rounded-lg border border-gray-200 p-4 bg-gray-50',
  },
};

// Story for the Illustration component with different format
export const WithDifferentFormat: Story = {
  args: {
    src: 'devices.png',
    alt: 'Devices illustration',
    width: 50,
  },
};

// Story for the Illustration component with custom height
export const WithCustomHeight: Story = {
  args: {
    src: 'register.svg',
    alt: 'Registration illustration with custom height',
    width: 400,
    height: 300,
  },
};

// Story for the Illustration component without responsive behavior
export const NotResponsive: Story = {
  args: {
    src: 'settings.svg',
    alt: 'Settings illustration always visible',
    width: 300,
    responsive: false,
  },
};
