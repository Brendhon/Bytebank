import AvatarPopover from './AvatarPopover';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AvatarPopover> = {
  component: AvatarPopover,
};

export default meta;

export const Default: StoryObj<typeof AvatarPopover> = {
  args: {
    onNavigate: (path: string) => alert(`Navigate to: ${path}`),
    onLogout: () => alert('Logout'),
  },
};
