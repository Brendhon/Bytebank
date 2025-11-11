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

  // Handle error
  const handleError = (error: any) => {
    console.error('Error:', error);
    const message = error.message || 'Erro ao realizar ação';
    showErrorToast({ message });
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
