'use client';

import { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import Modal from './Modal';
import { Button } from '@/components/ui';

// Setup the Storybook configuration for the Modal component
const meta: Meta<typeof Modal> = {
  component: Modal,
};

// Export the meta configuration for the Modal component
export default meta;

// This is the type definition for the Storybook story of the Modal component.
type Story = StoryObj<typeof Modal>;

// This story demonstrates the Modal component with a title and a confirmation message.
export const Default: Story = {
  render: () => {
    const DefaultComponent = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>

          <Modal
            isOpen={isOpen}
            title="Confirmação"
            onClose={() => setIsOpen(false)}
            onSubmit={() => {
              alert('Ação confirmada');
              setIsOpen(false);
            }}
            btnVariantSubmit="outlineOrange"
          >
            <p className="text-dark">Você tem certeza que deseja continuar com esta ação?</p>
          </Modal>
        </>
      );
    };

    return <DefaultComponent />;
  },
};

export const WithoutTitle: Story = {
  render: () => {
    const WithoutTitleComponent = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Abrir Modal</Button>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSubmit={() => {
              alert('Ação confirmada');
              setIsOpen(false);
            }}
            btnTextSubmit="Sim"
            btnTextCancel="Não"
          >
            <p>Deseja salvar as alterações?</p>
          </Modal>
        </>
      );
    };

    return <WithoutTitleComponent />;
  },
};