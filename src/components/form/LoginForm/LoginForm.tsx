'use client';

import { Modal } from '@/components/layout';
import { LoginFormData, loginSchema } from '@/schemas';
import { GeneralModalProps } from '@/types/modal';
import { Fieldset, Legend } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import { Illustration } from '@/components/ui';

interface Props extends GeneralModalProps {
  defaultValues?: LoginFormData;
}

export default ({ isOpen, onClose, defaultValues }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      ...(defaultValues || {})
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Dados enviados:', data);
  };

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
