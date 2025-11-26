'use client';

import { Modal } from '@/components/layout';
import { Illustration } from '@/components/ui';
import { LoginFormData, loginSchema } from '@/schemas';
import { GeneralModalProps } from '@/types/modal';
import { Fieldset, Legend } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../Input/Input';

/**
 * LoginForm component props
 * @interface LoginFormProps
 * @extends {GeneralModalProps<LoginFormData>} Extends general modal props with LoginFormData
 */
export interface LoginFormProps extends GeneralModalProps<LoginFormData> {}

/**
 * Login form component that renders a login form inside a modal
 * Uses React Hook Form for form state management and Zod for validation
 * Includes fields for email and password
 * 
 * @param {LoginFormProps} props - LoginForm component props
 * @param {boolean} props.isOpen - Controls the visibility of the modal
 * @param {() => void} props.onClose - Callback function called when the modal is closed
 * @param {(data: LoginFormData) => void | Promise<void>} props.onSubmit - Callback function called when the form is submitted with valid data
 * @param {Partial<LoginFormData>} [props.defaultValues] - Optional default values for form fields
 * @returns {ReactElement} A login form component wrapped in a modal
 * 
 * @example
 * ```tsx
 * <LoginForm
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onSubmit={async (data) => {
 *     await signIn(data);
 *   }}
 * />
 * ```
 */
export const LoginForm = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}: LoginFormProps): ReactElement => {
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
      className={styles.modal}
      onSubmit={handleSubmit(onSubmit)}
      btnTextSubmit="Acessar"
      btnVariantSubmit="green"
    >
      <Fieldset className={styles.fieldset}>
        <Illustration src="login.svg" alt="Login illustration showing user authentication" />

        <Legend className={styles.legend}>
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

const styles = {
  modal: 'md:w-[500px] w-full',
  fieldset: 'flex flex-col gap-4',
  legend: 'text-20-bold text-dark text-center',
} as const;
