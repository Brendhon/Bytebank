'use client';

import { Button, Illustration } from '@/components/ui';
import { AccountFormData, accountSchema } from '@/schemas';
import { FormProps } from '@/types/form';
import { Fieldset } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import Input from '../Input/Input';

export default ({ onSubmit, defaultValues }: FormProps<AccountFormData>) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      ...(defaultValues || {})
    },
  });

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

        <div className='flex flex-row justify-end'>
          <Button variant="orange" onClick={handleSubmit(onSubmit)}>
            Salvar alterações
          </Button>
        </div>
      </Fieldset>

    </section>
  );
};
