import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth/auth';
import { PAGE_ROUTES, PROTECTED_ROUTES } from '@/lib/constants';

export default async () => {
  return await getServerSession(authOptions)
    ? redirect(PROTECTED_ROUTES.DASHBOARD)
    : redirect(PAGE_ROUTES.HOME);
};
