import { Meta, StoryObj } from '@storybook/react';
import RegisterForm from './RegisterForm';
import { useState } from 'react';
import { http, HttpResponse, delay } from 'msw';

const meta: Meta<typeof RegisterForm> = {
  component: RegisterForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof RegisterForm>;

// Decorator para controlar o isOpen via estado no Storybook
const Template = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Abrir Formulário</button>
      <RegisterForm
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};

export const Default: Story = {
  render: Template,
  args: {},
  parameters: {
    msw: {
      handlers: [
        http.get('https://your-restful-endpoint/', () => {
          return HttpResponse.json({});
        }),
      ],
    },
  },
};

export const WithErrors: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Abrir</button>
        <RegisterForm
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          // pré-popula com valores inválidos para disparar validações
          defaultValues={{
            name: '',
            email: 'not-an-email',
            password: '123',
            confirmPassword: '456',
            acceptPrivacy: false,
          }}
        />
      </>
    );
  },
};

export const Filled: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Abrir</button>
        <RegisterForm
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          defaultValues={{
            name: 'Joana Silva',
            email: 'joana@example.com',
            password: 'Abcd1234',
            confirmPassword: 'Abcd1234',
            acceptPrivacy: true,
          }}
        />
      </>
    );
  }
};

