import { z } from 'zod'

export const registerValidation = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(50, 'Name must be under 50 characters.'),

  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .max(100, 'Email must be under 100 characters.'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(100, 'Password must be under 100 characters.'),
})

export const loginValidation = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address.')
    .max(100, 'Email must be under 100 characters.'),

  password: z.string().min(1, 'Password is required.'),
})

export type RegisterValidation = z.infer<typeof registerValidation>
export type LoginValidation = z.infer<typeof loginValidation>
