'use client';

import { Modal } from '@/components/layout';
import { Illustration } from '@/components/ui';
import { LoginFormData, loginSchema } from '@/schemas';
import { GeneralModalProps } from '@/types/modal';
import { Fieldset, Legend } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Input } from '../Input/Input';

export default ({ isOpen, onClose, onSubmit, defaultValues }: GeneralModalProps<LoginFormData>) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      ...(defaultValues || {})
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="md:w-[500px] w-full"
      onSubmit={handleSubmit(onSubmit)}
      btnTextSubmit='Acessar'
      btnVariantSubmit='green'>

      <Fieldset className="flex flex-col gap-4">
        <Illustration src='login.svg' />

        <Legend className="text-20-bold text-dark text-center">
          Login
        </Legend>

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
      </Fieldset>
    </Modal>
  );
};
