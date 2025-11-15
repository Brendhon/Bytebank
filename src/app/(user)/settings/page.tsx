'use client';

import { AccountForm } from "@/components/form";
import { useToast } from "@/hooks";
import { AccountFormData } from "@/schemas";
import { deleteUser, updateUser } from "@/services/user/user.service";
import { Loader2 } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default () => {
  // Get session data
  const session = useSession();

  // Use toast
  const { showSuccessToast, showErrorToast } = useToast();

  // State to name and email
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // State to loading
  const [loading, setLoading] = useState(true);

  // Check if session is loading
  useEffect(() => {
    setLoading(session.status === 'loading');
    setName(session.data?.user?.name || '');
    setEmail(session.data?.user?.email || '');
  }, [session.status, session.data]);

  // Handle edit
  const handleEdit = async (data: AccountFormData) => {
    try {
      // Send data to API
      await updateUser(email, data);

      // Sign in with new credentials
      await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.newPassword || data.password,
      });

      // Update session data
      await session.update()

      // Show user feedback
      showSuccessToast({ message: 'Dados atualizados com sucesso' });
    } catch (error) {
      handleError(error);
    }
  }


  // Handle delete
  const handleDelete = async (password: string) => {
    try {
      // Send data to API
      await deleteUser(email, password)

      // Sign out user
      await signOut({ redirect: true });
      
      // Show user feedback
      showSuccessToast({ message: 'Conta deletada com sucesso' });
    } catch (error) {
      handleError(error);
    }
  }

  /**
   * Maps HTTP status codes to user-friendly error messages in Portuguese.
   * @param {number} status - HTTP status code
   * @returns {string} - User-friendly error message
   */
  const getErrorMessageByStatus = (status: number): string => {
    const statusMessages: Record<number, string> = {
      400: 'Dados inválidos. Verifique as informações e tente novamente.',
      401: 'Senha inválida. Verifique sua senha e tente novamente.',
      403: 'Acesso negado. Você não tem permissão para realizar esta ação.',
      404: 'Usuário não encontrado. Por favor, faça login novamente.',
      409: 'Conflito. Este email já está cadastrado.',
      422: 'Dados inválidos. Verifique o formato das informações.',
      500: 'Erro interno do servidor. Tente novamente mais tarde.',
      503: 'Serviço temporariamente indisponível. Tente novamente mais tarde.',
    };

    return statusMessages[status] || 'Erro ao realizar ação. Tente novamente mais tarde.';
  };

  /**
   * Handles errors and displays appropriate user-friendly messages based on HTTP status.
   * @param {unknown} error - The error object to handle
   */
  const handleError = (error: unknown) => {
    console.error('Error:', error);

    // Check if error has status property (from apiClient)
    if (error instanceof Error && 'status' in error) {
      const status = (error as Error & { status: number }).status;
      const message = getErrorMessageByStatus(status);
      showErrorToast({ message });
      return;
    }

    // Fallback: use error message if available
    if (error instanceof Error) {
      showErrorToast({ message: error.message || 'Erro ao realizar ação' });
      return;
    }

    // Final fallback for unknown error types
    showErrorToast({ message: 'Erro ao realizar ação. Tente novamente mais tarde.' });
  }

  // Render component
  return (
    <>
      {
        loading
          ? <Loader2 size={60} className="animate-spin text-gray" />
          : <AccountForm
            defaultValues={{
              name,
              email,
              password: '',
              newPassword: '',
              confirmPassword: '',
            }}
            onSubmit={handleEdit}
            onDelete={handleDelete}
          />
      }
    </>
  );
};
