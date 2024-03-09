import { z } from 'zod'

const createProductValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(255),
    price: z.number().min(1),
    image: z.array(z.string().min(3).max(255)),
    description: z.string().min(3),
    companyName: z.string().min(3).max(255),
    quantity: z.number().min(1),
  }),
})
const updateProductValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(255).optional(),
    price: z.number().min(1).optional(),
    image: z.array(z.string().min(3).max(255)),
    description: z.string().min(3).max(255).optional(),
    companyName: z.string().min(3).max(255).optional(),
    quantity: z.number().min(1),
  }),
})

export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
}
