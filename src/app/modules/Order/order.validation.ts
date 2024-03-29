import { z } from 'zod'

const createOrderValidationSchema = z.object({
  body: z.object({
    products: z.array(
      z.object({
        productId: z.string().min(3).max(255),
        quantity: z.number().min(1),
      }),
    ),
    customerName: z.string().min(3).max(255),
    address: z.string().min(3).max(255),
    phoneNumber: z.number(),
  }),
})

export const orderValidateSchema = {
  createOrderValidationSchema,
}
