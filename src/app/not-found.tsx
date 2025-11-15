import { redirect } from 'next/navigation';
import { PAGE_ROUTES } from '@/lib/constants';

export default async () => redirect(PAGE_ROUTES.NOT_FOUND);
