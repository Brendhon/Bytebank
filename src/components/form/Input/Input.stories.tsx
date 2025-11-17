import { Meta, StoryObj } from '@storybook/nextjs';
import { Mail } from 'lucide-react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'date'],
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
    icon: <Mail />,
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

export const DateInput: Story = {
  args: {
    label: 'Data de Nascimento',
    placeholder: 'dd/mm/yyyy',
    type: 'date',
  },
};

// Disable the default export
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};