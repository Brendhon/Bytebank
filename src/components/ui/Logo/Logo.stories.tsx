import type { Meta, StoryObj } from '@storybook/react';
import Logo from './Logo';

const meta: Meta<typeof Logo> = {
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['full', 'icon'],
      description: 'Display variant: full for complete logo with text, icon for icon only',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size preset: sm (64px), md (128px), lg (168px)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for customization',
    },
    title: {
      control: 'text',
      description: 'Accessible label for screen readers (defaults to "Bytebank Logo")',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

// Default
export const Default: Story = {
  args: {
    variant: 'full',
    size: 'md',
  },
};

// Full variant stories
export const FullSmall: Story = {
  args: {
    variant: 'full',
    size: 'sm',
  },
};

export const FullMedium: Story = {
  args: {
    variant: 'full',
    size: 'md',
  },
};

export const FullLarge: Story = {
  args: {
    variant: 'full',
    size: 'lg',
  },
};

// Icon variant stories
export const IconSmall: Story = {
  args: {
    variant: 'icon',
    size: 'sm',
  },
};

export const IconMedium: Story = {
  args: {
    variant: 'icon',
    size: 'md',
  },
};

export const IconLarge: Story = {
  args: {
    variant: 'icon',
    size: 'lg',
  },
};

// Accessibility stories
export const WithCustomTitle: Story = {
  args: {
    variant: 'full',
    size: 'md',
    title: 'Bytebank - Your Financial Partner',
  },
};

export const IconWithCustomTitle: Story = {
  args: {
    variant: 'icon',
    size: 'md',
    title: 'Bytebank Icon',
  },
};

// Custom className story
export const WithCustomClassName: Story = {
  args: {
    variant: 'full',
    size: 'md',
    className: 'opacity-75 hover:opacity-100 transition-opacity',
  },
};
