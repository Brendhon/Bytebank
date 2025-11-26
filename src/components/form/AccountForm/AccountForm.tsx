'use client';

import { Modal } from '@/components/layout';
import { Button, Illustration } from '@/components/ui';
import { AccountFormData, accountSchema } from '@/schemas';
import { FormProps } from '@/types/form';
import { Fieldset } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '../Input/Input';

/**
 * AccountForm component props
 * @interface AccountFormProps
 * @extends {FormProps<AccountFormData>} Extends form props with AccountFormData
 */
export interface AccountFormProps extends FormProps<AccountFormData> {
  /** Callback function triggered when user confirms account deletion. Receives the user's password for verification. */
  onDelete: (password: string) => Promise<void>;
}

/**
 * AccountForm component for managing user account settings
 * 
 * Allows users to:
 * - Update their name and password
 * - Delete their account (with password confirmation)
 * 
 * Uses React Hook Form with Zod validation for form management
 * Includes error handling with toast notifications
 * 
 * @param {AccountFormProps} props - AccountForm component props
 * @param {(data: AccountFormData) => void | Promise<void>} props.onSubmit - Callback function called when the form is submitted with valid data
 * @param {(password: string) => Promise<void>} props.onDelete - Callback function called when account deletion is confirmed
 * @param {Partial<AccountFormData>} [props.defaultValues] - Optional default values for form fields
 * @returns {ReactElement} A form component for account management
 * 
 * @example
 * ```tsx
 * <AccountForm
 *   defaultValues={{ name: 'John Doe', email: 'john@example.com' }}
 *   onSubmit={handleAccountUpdate}
 *   onDelete={handleAccountDelete}
 * />
 * ```
 */
export const AccountForm = ({
  onDelete,
  onSubmit,
  defaultValues,
}: AccountFormProps): ReactElement => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [password, setPassword] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      ...(defaultValues || {})
    },
  });

  const handleDelete = async () => {
    try {
      setLoadingDelete(true);
      setIsDeleteOpen(false);
      await onDelete(password);
      setPassword('');
    } catch (error) {
      console.error('Error deleting account:', error);
      setIsDeleteOpen(true);
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleFormSubmit = async (data: AccountFormData) => {
    try {
      setLoadingSubmit(true);
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Minha conta
        </h2>

        <Illustration width={400} src="settings.svg" alt="Account settings illustration" priority />
      </div>

      <Fieldset className={styles.fieldset}>
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
          disabled={true}
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

        <div className={styles.buttonContainer}>
          <Button
            type="button"
            variant="orange"
            onClick={() => setIsDeleteOpen(true)}
            aria-label="Excluir permanentemente minha conta do Bytebank"
          >
            Excluir conta
          </Button>

          <Button
            type="submit"
            variant="blue"
            loading={loadingSubmit}
            aria-label="Salvar alterações da minha conta"
          >
            Salvar alterações
          </Button>
        </div>
      </Fieldset>

      <Modal
        isOpen={isDeleteOpen}
        title="Você está prestes a excluir sua conta"
        onClose={() => {
          setIsDeleteOpen(false);
          setPassword('');
        }}
        onSubmit={handleDelete}
        btnVariantSubmit="outlineOrange"
        isSubmitDisabled={password.length < 6}
      >
        <p className={styles.modalDescription}>
          Esta ação removerá permanentemente sua conta e todos os dados associados a ela. Tem certeza de que deseja continuar?
        </p>

        <Input
          label="Confirme com sua senha"
          placeholder="Digite sua senha"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          error={!!password && password.length < 6 ? 'Senha inválida' : undefined}
        />
      </Modal>
    </form>
  );
};

const styles = {
  container: 'card gap-4 flex flex-col sm:flex-row',
  header: 'flex flex-col gap-4 mb-4',
  title: 'text-20-bold text-dark-gray',
  fieldset: 'flex flex-col gap-4 w-full md:max-w-[350px]',
  buttonContainer: 'flex flex-col justify-between items-center mt-4 sm:flex-row gap-4',
  modalDescription: 'text-dark max-w-[450px] text-center md:text-left',
} as const;
