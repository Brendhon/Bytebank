'use client';

import { LoginForm, RegisterForm } from "@/components/form";
import { Footer, Header } from "@/components/layout";
import { useToast } from "@/hooks";
import { LoginFormData, RegisterFormData } from "@/schemas";
import { registerUser } from "@/services/user/user.service";
import { IUser } from "@/types/user";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

export default ({ children }: { children: ReactNode }) => {
  // State to manage modals
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Router
  const router = useRouter();

  // Toast
  const { showSuccessToast, showErrorToast } = useToast();

  // Function to handle login submission
  const onLoginSubmit = async (data: LoginFormData, hideToast = false) => {
    const response = await signIn('credentials', {
      redirect: false, // Avoid redirecting
      email: data.email,
      password: data.password,
    });

    if (response?.ok) {
      // Show success toast
      if (!hideToast) showSuccessToast({ message: 'Login realizado com sucesso!' });

      // Close the modal
      setIsLoginOpen(false);

      // Redirect to the dashboard
      router.push('/dashboard');
    } else {
      // Log failed
      console.error('Login failed:', response?.error);
      // Show error toast
      showErrorToast({ message: 'Email ou senha inválidos' });
    }
  };

  // Function to handle account registration
  const onRegisterSubmit = async (formData: RegisterFormData) => {
    // Form user data
    const data: IUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      acceptPrivacy: formData.acceptPrivacy
    }

    // Register user
    try {
      // Call the registerUser function
      await registerUser(data);

      // Show success toast
      showSuccessToast({ message: 'Conta criada com sucesso!' });

      // Close the modal
      setIsRegisterOpen(false);

      // Make the login modal open
      await onLoginSubmit({
        email: formData.email,
        password: formData.password,
      }, true);
    } catch (error: any) {
      // Show error toast
      showErrorToast({ message: error.message || 'Erro ao criar conta' });

      // Log the error
      console.error(error);
    }
  };

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

      {/* Modais */}
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
};
