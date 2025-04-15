import { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import { Mail, Lock } from 'lucide-react';

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
  },
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    type: 'text',
    error: '',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    icon: <Mail className="w-4 h-4" />,
  },
};

export const WithError: Story = {
  args: {
    error: 'Este campo é obrigatório',
  },
};

export const Password: Story = {
  args: {
    label: 'Senha',
    placeholder: '••••••••',
    type: 'password',
  },
};

export const PasswordWithError: Story = {
  args: {
    label: 'Senha',
    placeholder: '••••••••',
    type: 'password',
    error: 'Senha inválida',
  },
};
