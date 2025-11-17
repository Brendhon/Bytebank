import { Meta, StoryObj } from '@storybook/nextjs';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Default checkbox
export const Default: Story = {
  args: {
    label: 'Aceito os termos de uso',
    checked: false,
  },
};

// Checkbox checked
export const Checked: Story = {
  args: {
    label: 'Receber novidades por e-mail',
    checked: true,
  },
};

// Checkbox desmarcado inicialmente
export const Unchecked: Story = {
  args: {
    label: 'Receber novidades por e-mail',
    checked: false,
  },
};

// Checkbox com erro
export const WithError: Story = {
  args: {
    label: 'Confirmo minha idade',
    error: 'Você deve confirmar sua idade para continuar.',
  },
};
