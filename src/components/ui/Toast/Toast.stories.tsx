import { Meta, StoryObj } from '@storybook/react';
import Toast from './Toast';

const meta: Meta<typeof Toast> = {
  component: Toast,
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    message: 'Cadastro realizado com sucesso',
    variant: 'success',
  },
};

export const Error: Story = {
  args: {
    message: 'Ocorreu um erro ao processar',
    variant: 'error',
  },
};

export const Info: Story = {
  args: {
    message: 'Essa é uma notificação informativa',
    variant: 'info',
  },
};

export const AutoClose: Story = {
  args: {
    message: 'Esta notificação fecha em 3 segundos',
    variant: 'info',
    duration: 3000,
  },
};
