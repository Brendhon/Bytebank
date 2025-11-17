import GuestActions from './GuestActions';
import { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof GuestActions> = {
  component: GuestActions
};

export default meta;

export const Default: StoryObj<typeof GuestActions> = {
  args: {
    onOpenAccount: () => alert('Abrir conta'),
    onLogin: () => alert('Já tenho conta'),
  },
};
