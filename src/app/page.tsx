import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth/auth';

export default async () => {
  return await getServerSession(authOptions)
    ? redirect('/dashboard')
    : redirect('/home');
};
