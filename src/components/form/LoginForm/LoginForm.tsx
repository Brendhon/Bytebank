'use client';

import { Modal } from '@/components/layout';
import { Illustration } from '@/components/ui';
import { useToast } from '@/hooks';
import { LoginFormData, loginSchema } from '@/schemas';
import { GeneralModalProps } from '@/types/modal';
import { Fieldset, Legend } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Input from '../Input/Input';

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

  // Router
  const router = useRouter();

  // Toast
  const { showSuccessToast, showErrorToast } = useToast();

  // Function to handle form submission
  const onSubmit = async (data: LoginFormData) => {
    const response = await signIn('credentials', {
      redirect: false, // Avoid redirecting
      email: data.email,
      password: data.password,
    });

    if (response?.ok) {
      // Log successful
      showSuccessToast({ message: 'Login realizado com sucesso!' });

      // Close the modal
      onClose();

      // Redirect to the dashboard
      setTimeout(() => router.push('/dashboard'), 2000);
    } else {
      // Log failed
      console.error('Login failed:', response?.error);
      // Show error toast
      showErrorToast({ message: 'Email ou senha inválidos' });
    }
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
