import { z } from 'zod'

const createUserValidationSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(255),
    email: z.string().email().min(3).max(255),
    password: z.string().min(6).max(255),
    role: z.enum(['user', 'admin']),
  }),
})

export const UserValidations = {
  createUserValidationSchema,
}
