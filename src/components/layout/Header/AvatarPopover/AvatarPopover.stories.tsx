import { AvatarPopover } from './AvatarPopover';
import { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof AvatarPopover> = {
  component: AvatarPopover,
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof AvatarPopover> = {
  args: {
    onNavigate: (path: string) => alert(`Navigate to: ${path}`),
    onLogout: () => alert('Logout'),
  },
};
