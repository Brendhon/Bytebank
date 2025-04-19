'use client';

import { AccountForm } from "@/components/form";
import { AccountFormData } from "@/schemas";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default () => {
  // Get session data
  const session = useSession();

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
  }, [session.status]);

  // Handle submit
  const handleSubmit = async (data: AccountFormData) => {
    console.log(data);
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
            onSubmit={handleSubmit}
          />
      }
    </>
  );
};
