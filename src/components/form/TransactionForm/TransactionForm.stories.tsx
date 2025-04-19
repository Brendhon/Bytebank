import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TransactionForm from './TransactionForm';

const meta: Meta<typeof TransactionForm> = {
  component: TransactionForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  }
};

// Export the meta object to be used in Storybook
export default meta;

// Define the type for the story
type Story = StoryObj<typeof TransactionForm>;

// Template to control the isOpen state in Storybook
const Template = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button className='cursor-pointer' onClick={() => setIsOpen(true)}>Click aqui para abrir</button>
      <TransactionForm
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={() => alert('Cadastro realizado com sucesso!')}
      />
    </>
  );
};

// Define the default export for the story
export const Default: Story = {
  render: Template,
  args: {},
};

// Story for the TransactionForm with validation errors
export const WithErrors: Story = {
  render: Template,
  args: {
    defaultValues: {
      type: 'transfer',
      alias: '',
      value: -100,
      date: '',
    }
  },
};

// Story for the TransactionForm with pre-filled values
export const Edit: Story = {
  render: Template,
  args: {
    defaultValues: {
      type: 'payment',
      alias: 'Salário',
      value: 5000,
      date: '2023-10-01',
    }
  }
};

