'use client';

import { Modal } from '@/components/layout';
import { Illustration } from '@/components/ui';
import { useToast } from '@/hooks';
import { RegisterFormData, registerSchema } from '@/schemas';
import { registerUser } from '@/services/user';
import { GeneralModalProps } from '@/types/modal';
import { IUser } from '@/types/user';
import { Fieldset, Legend } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import Checkbox from '../Checkbox/Checkbox';
import Input from '../Input/Input';

interface Props extends GeneralModalProps {
  defaultValues?: RegisterFormData;
}

export default ({ isOpen, onClose, defaultValues }: Props) => {
  const { showSuccessToast, showErrorToast } = useToast();
  const { control, register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptPrivacy: false,
      ...(defaultValues || {})
    },
  });

  const onSubmit = (formData: RegisterFormData) => {
    // Form user data
    const data: IUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      acceptPrivacy: formData.acceptPrivacy
    }

    // Register user
    registerUser(data)
      .then(() => handleSuccess())
      .catch(({ message }) => handleError(message));
  };

  // Handle success
  const handleSuccess = () => {
    showSuccessToast({ message: 'Conta criada com sucesso!' });
    onClose();
  }

  // Handle error
  const handleError = (message: string) => {
    showErrorToast({ message });
    console.error(message);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[700px] w-full"
      onSubmit={handleSubmit(onSubmit)}
      btnVariantSubmit='orange'>

      <Fieldset className="flex flex-col gap-4">
        <Illustration src='register.svg' />
        <Legend className="text-20-bold text-dark text-center">
          Preencha os campos abaixo para criar sua conta corrente!
        </Legend>

        <Input
          label="Nome"
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
          label="Confirme sua senha"
          placeholder="Repita sua senha"
          error={errors.confirmPassword?.message}
          type="password"
          {...register('confirmPassword')}
        />

        <Controller
          name="acceptPrivacy"
          control={control}
          render={({ field, fieldState }) => (
            <Checkbox
              label="Li e estou ciente quanto às condições de tratamento dos meus dados conforme descrito na Política de Privacidade do banco."
              checked={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
            />
          )}
        />
      </Fieldset>
    </Modal>
  );
};
