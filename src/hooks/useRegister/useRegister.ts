import { useAuth } from '@/hooks/useAuth/useAuth';
import { useToast } from '@/hooks';
import { RegisterFormData } from '@/schemas';
import { registerUser } from '@/services/user/user.service';
import { IUser } from '@/types/user';
import { useCallback } from 'react';
import { getErrorMessage } from '@/lib/errors/error-utils';

/**
 * Return type for the useRegister hook
 */
export interface UseRegisterReturn {
  /**
   * Handles user registration submission
   * @param formData - Registration form data
   * @returns Promise that resolves to true if registration succeeds, false otherwise
   */
  register: (formData: RegisterFormData) => Promise<boolean>;
}

/**
 * Custom hook to handle user registration
 * 
 * Provides a register function that creates new user accounts,
 * handles success/error feedback via toast notifications, and automatically
 * logs in the user after successful registration.
 * 
 * @returns {UseRegisterReturn} Object containing the register function
 * 
 * @example
 * ```tsx
 * function RegisterComponent() {
 *   const { register } = useRegister();
 * 
 *   const handleSubmit = async (formData: RegisterFormData) => {
 *     const success = await register(formData);
 *     if (success) {
 *       // Handle successful registration (e.g., close modal)
 *     }
 *   };
 * 
 *   return <RegisterForm onSubmit={handleSubmit} />;
 * }
 * ```
 */
export const useRegister = (): UseRegisterReturn => {
  const { showSuccessToast, showErrorToast } = useToast();
  const { login } = useAuth();

  const register = useCallback(async (formData: RegisterFormData): Promise<boolean> => {
    const data: IUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      acceptPrivacy: formData.acceptPrivacy,
    };

    try {
      await registerUser(data);
      showSuccessToast({ message: 'Conta criada com sucesso!' });
      
      // Automatically log in the user after successful registration
      await login(
        {
          email: formData.email,
          password: formData.password,
        },
        true // Hide toast for automatic login
      );
      
      return true;
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error) || 'Erro ao criar conta';
      showErrorToast({ message: errorMessage });
      console.error('Registration failed:', error);
      return false;
    }
  }, [showSuccessToast, showErrorToast, login]);

  return { register };
};

