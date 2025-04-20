import { Meta, StoryObj } from '@storybook/react';
import AccountForm from './AccountForm';
import { AccountFormData } from '@/schemas';

const meta: Meta<typeof AccountForm> = {
  component: AccountForm,
  tags: ['autodocs'],
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
