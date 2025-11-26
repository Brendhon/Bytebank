'use client';

import { LoginForm, RegisterForm } from "@/components/form";
import { Footer, Header } from "@/components/layout";
import { useAuth, useRegister } from "@/hooks";
import { LoginFormData, RegisterFormData } from "@/schemas";
import { ReactElement, ReactNode, useCallback, useState } from "react";

/**
 * Props for the GuestLayout component
 */
export interface GuestLayoutProps {
  /**
   * Child components to render inside the layout
   */
  children: ReactNode;
}

/**
 * Guest layout component that wraps guest pages.
 * 
 * Provides:
 * - Header with guest actions (login, register)
 * - Footer
 * - Login and Register modals
 * - Authentication and registration logic via custom hooks
 * 
 * This is a Client Component that manages modal state and delegates
 * authentication/registration logic to custom hooks (useAuth, useRegister).
 * 
 * @component
 * @param {GuestLayoutProps} props - Component props
 * @returns {ReactElement} Guest layout structure
 */
export default function GuestLayout({ children }: GuestLayoutProps): ReactElement {
  // State to manage modals
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Custom hooks for authentication and registration
  const { login } = useAuth();
  const { register } = useRegister();

  // Handle login submission
  const onLoginSubmit = useCallback(async (data: LoginFormData) => {
    const success = await login(data);
    if (success) {
      setIsLoginOpen(false);
    }
  }, [login]);

  // Handle account registration
  const onRegisterSubmit = useCallback(async (formData: RegisterFormData) => {
    const success = await register(formData);
    if (success) {
      setIsRegisterOpen(false);
    }
  }, [register]);

  return (
    <>
      {/* Header */}
      <Header
        variant="guest"
        onOpenAccount={() => setIsRegisterOpen(true)}
        onLogin={() => setIsLoginOpen(true)}
      />

      {/* Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <RegisterForm
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSubmit={onRegisterSubmit}
      />
      <LoginForm
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSubmit={onLoginSubmit}
      />
    </>
  );
}
