import { z } from 'zod'

const loginValidationSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Username is required',
    }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8)
      .max(100),
  }),
})

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old Password is required',
    }),
    newPassword: z
      .string({
        required_error: 'New Password is required',
      })
      .min(8)
      .max(100),
  }),
})

export const AuthValidation = {
  loginValidationSchema,
  changePasswordValidationSchema,
}
