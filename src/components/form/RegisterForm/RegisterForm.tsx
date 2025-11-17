'use client';

import { Modal } from '@/components/layout';
import { Illustration } from '@/components/ui';
import { RegisterFormData, registerSchema } from '@/schemas';
import { GeneralModalProps } from '@/types/modal';
import { Fieldset, Legend } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox } from '../Checkbox/Checkbox';
import { Input } from '../Input/Input';
import { ReactElement } from 'react';

/**
 * RegisterForm component props
 * @interface RegisterFormProps
 * @extends {GeneralModalProps<RegisterFormData>} Extends general modal props with RegisterFormData
 */
export interface RegisterFormProps extends GeneralModalProps<RegisterFormData> {}

/**
 * Registration form component that renders a registration form inside a modal
 * Uses React Hook Form for form state management and Zod for validation
 * Includes fields for name, email, password, password confirmation, and privacy policy acceptance
 * 
 * @param {RegisterFormProps} props - RegisterForm component props
 * @param {boolean} props.isOpen - Controls the visibility of the modal
 * @param {() => void} props.onClose - Callback function called when the modal is closed
 * @param {(data: RegisterFormData) => void | Promise<void>} props.onSubmit - Callback function called when the form is submitted with valid data
 * @param {Partial<RegisterFormData>} [props.defaultValues] - Optional default values for form fields
 * @returns {ReactElement} A registration form component wrapped in a modal
 * 
 * @example
 * ```tsx
 * <RegisterForm
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onSubmit={async (data) => {
 *     await createUser(data);
 *   }}
 * />
 * ```
 */
export const RegisterForm = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}: RegisterFormProps): ReactElement => {
  const { control, register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptPrivacy: false,
      ...(defaultValues || {})
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={styles.modal}
      onSubmit={handleSubmit(onSubmit)}
      btnVariantSubmit="orange"
    >
      <Fieldset className={styles.fieldset}>
        <Illustration src="register.svg" alt="Registration illustration showing user account creation" />
        <Legend className={styles.legend}>
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

const styles = {
  modal: 'max-w-[700px] w-full',
  fieldset: 'flex flex-col gap-4',
  legend: 'text-20-bold text-dark text-center',
} as const;
