import { z } from 'zod';

export const accountSchema = z.object({
  name: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório'),
  email: z
    .string({ required_error: 'Email obrigatório' })
    .email('Email inválido'),
  password: z
    .string({ required_error: 'Senha obrigatória' })
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  newPassword: z
    .string({ required_error: 'Senha obrigatória' })
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z
    .string({ required_error: 'Campo obrigatório' })
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
})
  .refine((data) => data.newPassword === data.confirmPassword, { // Check if passwords match
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type AccountFormData = z.infer<typeof accountSchema>;