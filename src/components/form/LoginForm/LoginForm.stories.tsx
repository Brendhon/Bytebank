import { Meta, StoryObj } from '@storybook/react';
import { http, HttpResponse } from 'msw';
import { useState } from 'react';
import LoginForm from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

// Export the meta object to be used in Storybook
export default meta;

// Define the type for the story
type Story = StoryObj<typeof LoginForm>;

// Define the parameters for the story
// This is where you can set up mock service worker handlers
const parameters = {
  msw: {
    handlers: [
      http.get('https://your-restful-endpoint/', () => {
        return HttpResponse.json({});
      }),
    ],
  },
};

// Template to control the isOpen state in Storybook
const Template = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button className='cursor-pointer' onClick={() => setIsOpen(true)}>Click aqui para abrir</button>
      <LoginForm
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

// Default export for the story
export const Default: Story = {
  parameters,
  render: Template,
  args: {},
};

// Story for the LoginForm with validation errors
export const WithErrors: Story = {
  parameters,
  render: Template,
  args: {
    defaultValues: {
      email: '',
      password: '123',
    },
  },
};

// Story for the LoginForm with pre-filled values
export const Filled: Story = {
  parameters,
  render: Template,
  args: {
    defaultValues: {
      email: 'joana@example.com',
      password: 'Abcd1234',
    }
  }
};

