import { z } from 'zod'

const addCartValidationSchema = z.object({
  body: z.object({
    products: z.array(
      z.object({
        productId: z.string().min(3).max(255),
        quantity: z.number().min(1),
      }),
    ),
  }),
})

export const cartValidateSchema = {
  addCartValidationSchema,
}
