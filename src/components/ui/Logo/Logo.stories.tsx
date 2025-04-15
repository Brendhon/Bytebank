import type { Meta, StoryObj } from '@storybook/react';
import Logo from './Logo';

const meta: Meta<typeof Logo> = {
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['full', 'icon'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
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
