'use client';

import { Modal } from '@/components/layout';
import { Button, Illustration } from '@/components/ui';
import { AccountFormData, accountSchema } from '@/schemas';
import { FormProps } from '@/types/form';
import { Fieldset } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Input/Input';

interface AccountFormProps extends FormProps<AccountFormData> {
  onDelete: () => Promise<void>;
}

export default ({ onDelete, onSubmit, defaultValues }: AccountFormProps) => {
  // State to delete modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // State loadings
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // State to form
  const { register, handleSubmit, formState: { errors } } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      ...(defaultValues || {})
    },
  });

  // Handle delete account
  const handleDelete = async () => {
    // Show loading
    setIsDeleteOpen(false);

    // Call onDelete function
    await onDelete();
  };

  // Handle submit
  const handleFormSubmit = async (data: AccountFormData) => {
    // Show loading
    setLoadingSubmit(true);

    // Call onSubmit function
    await onSubmit(data);

    // Hide loading
    setLoadingSubmit(false);
  };

  return (
    <section className="card gap-4 flex flex-col sm:flex-row">
      <div className="flex flex-col gap-4 mb-4">
        <h2 className="text-20-bold text-dark-gray">
          Minha conta
        </h2>

        <Illustration width={400} src='settings.svg' />
      </div>

      <Fieldset className="flex flex-col gap-4 w-full md:max-w-[350px]">
        <Input
          label="Nome"
          className="w-full"
          placeholder="Digite seu nome completo"
          {...register('name')}
          error={errors.name?.message}
        />

        <Input
          label="Email"
          placeholder="Digite seu email"
          type="email"
          icon={<Mail />}
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Senha"
          placeholder="Digite sua senha"
          error={errors.password?.message}
          type="password"
          {...register('password')}
        />

        <Input
          label="Nova senha"
          placeholder="Digite sua nova senha"
          error={errors.newPassword?.message}
          type="password"
          {...register('newPassword')}
        />

        <Input
          label="Confirme sua senha"
          placeholder="Repita sua nova senha"
          error={errors.confirmPassword?.message}
          type="password"
          {...register('confirmPassword')}
        />

        <div className='flex flex-col justify-between items-center mt-4 sm:flex-row gap-4'>
          <Button
            variant="orange"
            onClick={() => setIsDeleteOpen(true)}
          >
            Excluir conta
          </Button>

          <Button
            variant="blue"
            onClick={handleSubmit(handleFormSubmit)}
            loading={loadingSubmit}
          >
            Salvar alterações
          </Button>
        </div>
      </Fieldset>

      <Modal
        isOpen={isDeleteOpen}
        title="Você está prestes a excluir sua conta"
        onClose={() => setIsDeleteOpen(false)}
        onSubmit={handleDelete}
        btnVariantSubmit="outlineOrange"
      >
        <p className="text-dark max-w-[450px] text-center md:text-left">
          Esta ação removerá permanentemente sua conta e todos os dados associados a ela. Tem certeza de que deseja continuar?
        </p>
      </Modal>
    </section>
  );
};
