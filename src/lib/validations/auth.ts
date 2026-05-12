import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
})

export const signupSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Necesita al menos una mayúscula')
    .regex(/[0-9]/, 'Necesita al menos un número'),
  full_name: z.string().min(2, 'Mínimo 2 caracteres'),
  salon_name: z.string().min(2, 'Mínimo 2 caracteres'),
  phone: z.string().optional().nullable(),
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
