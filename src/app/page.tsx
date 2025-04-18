import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

export default async () => {
  await getServerSession(authOptions)
    ? redirect('/dashboard')
    : redirect('/home');
};
