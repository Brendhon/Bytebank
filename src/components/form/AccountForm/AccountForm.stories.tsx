import { Meta, StoryObj } from '@storybook/nextjs';
import { AccountForm } from './AccountForm';
import { AccountFormData } from '@/schemas';

const meta: Meta<typeof AccountForm> = {
  component: AccountForm,
  tags: ['autodocs'],
  argTypes: {
    onSubmit: {
      description: 'Callback triggered when form is submitted',
      action: 'submitted',
    },
    onDelete: {
      description: 'Callback triggered when account deletion is confirmed',
      action: 'deleted',
    },
    defaultValues: {
      description: 'Default values for the form fields',
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<typeof AccountForm>;

export const Default: Story = {
  args: {
    defaultValues: {
      name: 'Joana Fonseca Gomes',
      email: 'joanadasilvaoliveira@email.com.br',
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    onSubmit: (data: AccountFormData) => {
      alert(`Dados enviados:\n${JSON.stringify(data, null, 2)}`);
    },
    onDelete: async () => {
      return Promise.resolve(alert('Conta deletada'));
    },
  },
};
