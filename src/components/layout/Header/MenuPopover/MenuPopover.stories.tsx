import { NavItemLabel } from '@/types/nav';
import { Meta, StoryObj } from '@storybook/nextjs';
import { MenuPopover } from './MenuPopover';

const meta: Meta<typeof MenuPopover> = {
  component: MenuPopover,
  tags: ['autodocs'],
  parameters: {
    viewport: { defaultViewport: 'iphone6' },
  },
};

export default meta;

export const Default: StoryObj<typeof MenuPopover> = {
  args: {
    pathname: '/dashboard' as NavItemLabel,
    onNavigate: (path: string) => alert(`Navigate to: ${path}`),
  },
};
