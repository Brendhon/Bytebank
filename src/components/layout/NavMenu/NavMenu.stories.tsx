import { Meta, StoryObj } from '@storybook/react';
import NavMenu, { NavItemLabel } from './NavMenu';

const meta: Meta<typeof NavMenu> = {
  component: NavMenu,
  tags: ['autodocs'],
  argTypes: {
    current: {
      control: 'select',
      options: ['/dashboard', '/transactions', '/cards', '/settings'],
    },
  }
};

export default meta;

type Story = StoryObj<typeof NavMenu>;

const Template = (args: any) => <NavMenu {...args} />;

export const Default: Story = {
  render: Template,
  args: {
    current: '/dashboard' as NavItemLabel,
    onNavigation: (href: string) => alert(`Navigate to: ${href}`),
  },
};
