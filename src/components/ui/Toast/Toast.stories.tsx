import { Meta, StoryObj } from '@storybook/nextjs';
import Toast from './Toast';

const meta: Meta<typeof Toast> = {
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Notification message to display',
    },
    variant: {
      control: 'select',
      options: ['success', 'error', 'info'],
      description: 'Visual style: success (green), error (red), info (blue)',
    },
    show: {
      control: 'boolean',
      description: 'Controls visibility of the toast',
    },
    duration: {
      control: 'number',
      description: 'Auto-dismiss duration in milliseconds (0 = no auto-dismiss)',
    },
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'Position of the toast on screen',
    },
    ariaLabel: {
      control: 'text',
      description: 'Custom accessible label for screen readers',
    },
  },
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

export const TopLeft: Story = {
  args: {
    message: 'Toast no canto superior esquerdo',
    variant: 'info',
    position: 'top-left',
  },
};

export const BottomRight: Story = {
  args: {
    message: 'Toast no canto inferior direito',
    variant: 'success',
    position: 'bottom-right',
  },
};

export const BottomLeft: Story = {
  args: {
    message: 'Toast no canto inferior esquerdo',
    variant: 'error',
    position: 'bottom-left',
  },
};

export const WithCustomAriaLabel: Story = {
  args: {
    message: 'Notificação com label acessível customizado',
    variant: 'info',
    ariaLabel: 'Notificação importante: Operação concluída',
  },
};
