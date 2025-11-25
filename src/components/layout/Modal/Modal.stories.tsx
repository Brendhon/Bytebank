'use client';

import { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '@/components/ui';

const meta: Meta<typeof Modal> = {
  component: Modal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Modal>;

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