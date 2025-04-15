import Header from './Header';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Header> = {
  component: Header
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Guest: Story = {
  args: {
    variant: 'guest',
    onOpenAccount: () => alert('Abrir conta'),
    onLogin: () => alert('Já tenho conta')
  }
};

export const User: Story = {
  args: {
    variant: 'user',
    userName: 'Joana da Silva Oliveira',
    onProfileClick: () => alert('Perfil')
  }
};
