'use client';

import { AccountForm } from "@/components/form";
import { useToast } from "@/hooks";
import { AccountFormData } from "@/schemas";
import { deleteUser, updateUser } from "@/services/user/user.service";
import { HttpError } from "@/types/http";
import { Loader2 } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { ReactElement, useCallback, useEffect, useState } from "react";

/**
 * Settings page component for authenticated users.
 * 
 * Allows users to:
 * - Edit their account information (name, email, password)
 * - Delete their account
 * 
 * This is a Client Component that manages form state and user actions.
 * It uses hooks for session management, toast notifications, and form handling.
 * 
 * @component
 * @returns {ReactElement} Settings page content with account form
 */
export default function SettingsPage(): ReactElement {
  // Get session data
  const session = useSession();

  // Use toast for user feedback
  const { showSuccessToast, showErrorToast } = useToast();

  // Derive values directly from session (no need for useState)
  const name = session.data?.user?.name || '';
  const email = session.data?.user?.email || '';

  // State to track loading status
  const [loading, setLoading] = useState(true);

  // Update loading state when session status changes
  useEffect(() => {
    setLoading(session.status === 'loading');
  }, [session.status]);

  /**
   * Maps HTTP status codes to user-friendly error messages in Portuguese.
   * 
   * @param {number} status - HTTP status code
   * @returns {string} - User-friendly error message
   */
  const getErrorMessageByStatus = useCallback((status: number): string => {
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
  }, []);

  /**
   * Handles errors and displays appropriate user-friendly messages based on HTTP status.
   * 
   * @param {unknown} error - The error object to handle
   */
  const handleError = useCallback((error: unknown) => {
    console.error('Error:', error);

    // Check if error is HttpError (from apiClient)
    if (error instanceof HttpError) {
      const message = getErrorMessageByStatus(error.status);
      showErrorToast({ message });
      return;
    }

    // Check if error has status property (legacy support)
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
  }, [getErrorMessageByStatus, showErrorToast]);

  /**
   * Handles account information update.
   * 
   * Updates user data, re-authenticates with new credentials, and updates session.
   * 
   * @param {AccountFormData} data - Form data with updated account information
   * @returns {Promise<void>}
   */
  const handleEdit = useCallback(async (data: AccountFormData) => {
    if (!email) {
      showErrorToast({ message: 'Email não encontrado. Por favor, faça login novamente.' });
      return;
    }

    try {
      // Send data to API
      await updateUser(email, data);

      // Sign in with new credentials to refresh session
      await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.newPassword || data.password,
      });

      // Update session data
      await session.update();

      // Show user feedback
      showSuccessToast({ message: 'Dados atualizados com sucesso' });
    } catch (error) {
      handleError(error);
    }
  }, [email, session, showSuccessToast, showErrorToast, handleError]);

  /**
   * Handles account deletion.
   * 
   * Deletes user account and signs out. Toast is shown before redirect
   * to ensure user sees the feedback.
   * 
   * @param {string} password - User password for authentication
   * @returns {Promise<void>}
   */
  const handleDelete = useCallback(async (password: string) => {
    if (!email) {
      showErrorToast({ message: 'Email não encontrado. Por favor, faça login novamente.' });
      return;
    }

    try {
      // Send delete request to API
      await deleteUser(email, password);

      // Show user feedback before redirect
      showSuccessToast({ message: 'Conta deletada com sucesso' });

      // Small delay to allow toast to be seen before redirect
      setTimeout(() => {
        signOut({ redirect: true });
      }, 1000);
    } catch (error) {
      handleError(error);
    }
  }, [email, showSuccessToast, showErrorToast, handleError]);

  // Render component
  return (
    <>
      {loading ? (
        <Loader2 size={60} className={styles.loader} />
      ) : (
        <AccountForm
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
      )}
    </>
  );
}

/**
 * Styles for SettingsPage component
 * 
 * All Tailwind classes are centralized here for better maintainability
 * and separation of concerns.
 */
const styles = {
  loader: 'animate-spin text-gray',
} as const;
