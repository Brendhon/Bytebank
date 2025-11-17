import Header from './Header';
import { Meta, StoryObj } from '@storybook/nextjs';

const meta: Meta<typeof Header> = {
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['user', 'guest'],
    },
  }
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
    onNavigate: (path) => alert(`Mock navigate to: ${path}`),
    onLogout: () => alert('Logout'),
  }
};
