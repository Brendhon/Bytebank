import { NavItemLabel } from '@/types/nav';
import { Meta, StoryObj } from '@storybook/nextjs';
import { delay } from 'msw';
import NavMenu from './NavMenu';

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
    onNavigate: (href: string) => alert(`Navigate to: ${href}`),
  },
};

export const WithLoading: Story = {
  render: Template,
  args: {
    current: '/transactions' as NavItemLabel,
    onNavigate: async (href: string) => {
      // Simulate a loading state
      await delay(1000)

      // Simulate a navigation
      alert(`Navigate to: ${href}`);
    },
  },
};
