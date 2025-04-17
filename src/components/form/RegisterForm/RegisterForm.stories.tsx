import { ToastProvider } from '@/context';
import { Meta, StoryObj } from '@storybook/react';
import { delay, http, HttpResponse } from 'msw';
import { useState } from 'react';
import RegisterForm from './RegisterForm';

const meta: Meta<typeof RegisterForm> = {
  component: RegisterForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

// Export the meta object to be used in Storybook
export default meta;

// Define the type for the story
type Story = StoryObj<typeof RegisterForm>;

// Template to control the isOpen state in Storybook
const Template = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button className='cursor-pointer' onClick={() => setIsOpen(true)}>Click aqui para abrir</button>
      <RegisterForm
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

// Define the parameters for the story
// This is where you can set up mock service worker handlers
const parameters = {
  msw: {
    handlers: [
      http.post('/api/users', async () => {
        // Simulate a delay for the request - 2 seconds
        await delay(2000);

        // Simulate a successful response
        return HttpResponse.json({ message: 'Usuário criado com sucesso' })
      }),
    ],
  },
};

// Define the default export for the story
export const Default: Story = {
  parameters,
  render: Template,
  args: {},
};

// Story for the RegisterForm with validation errors
export const WithErrors: Story = {
  parameters,
  render: Template,
  args: {
    defaultValues: {
      name: '',
      email: 'not-an-email',
      password: '123',
      confirmPassword: '456',
      acceptPrivacy: false,
    }
  },
};

// Story for the RegisterForm with pre-filled values
export const Filled: Story = {
  parameters,
  render: Template,
  args: {
    defaultValues: {
      name: 'Joana Silva',
      email: 'joana@example.com',
      password: 'Abcd1234',
      confirmPassword: 'Abcd1234',
      acceptPrivacy: true,
    }
  }
};

