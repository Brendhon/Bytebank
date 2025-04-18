import { NavItemLabel } from '../../NavMenu/NavMenu';
import MenuPopover from './MenuPopover';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MenuPopover> = {
  component: MenuPopover,
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
