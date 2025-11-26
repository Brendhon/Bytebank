import { useToast } from '@/hooks';
import { PROTECTED_ROUTES } from '@/lib/constants';
import { LoginFormData } from '@/schemas';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { signIn } from 'next-auth/react';

/**
 * Return type for the useAuth hook
 */
export interface UseAuthReturn {
  /**
   * Handles user login submission
   * @param data - Login form data (email and password)
   * @param hideToast - Whether to hide success toast message (default: false)
   * @returns Promise that resolves to true if login succeeds, false otherwise
   */
  login: (data: LoginFormData, hideToast?: boolean) => Promise<boolean>;
}

/**
 * Custom hook to handle user authentication
 * 
 * Provides a login function that authenticates users using NextAuth credentials,
 * handles success/error feedback via toast notifications, and redirects to dashboard on success.
 * 
 * @returns {UseAuthReturn} Object containing the login function
 * 
 * @example
 * ```tsx
 * function LoginComponent() {
 *   const { login } = useAuth();
 * 
 *   const handleSubmit = async (formData: LoginFormData) => {
 *     const success = await login(formData);
 *     if (success) {
 *       // Handle successful login (e.g., close modal)
 *     }
 *   };
 * 
 *   return <LoginForm onSubmit={handleSubmit} />;
 * }
 * ```
 */
export const useAuth = (): UseAuthReturn => {
  const router = useRouter();
  const { showSuccessToast, showErrorToast } = useToast();

  const login = useCallback(async (data: LoginFormData, hideToast = false): Promise<boolean> => {
    const response = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (response?.ok) {
      if (!hideToast) {
        showSuccessToast({ message: 'Login realizado com sucesso!' });
      }
      router.push(PROTECTED_ROUTES.DASHBOARD);
      return true;
    } else {
      console.error('Login failed:', response?.error);
      showErrorToast({ message: 'Email ou senha inválidos' });
      return false;
    }
  }, [router, showSuccessToast, showErrorToast]);

  return { login };
};

