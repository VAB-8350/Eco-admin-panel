import { z } from 'zod'

export const baseSchema = z.object({
  name: z.string().min(2, 'Este campo es requerido.'),
  lastName: z.string().min(2, 'Este campo es requerido.'),
  note: z.string().optional()
})

export function clientSchema (clientType) {
  switch (clientType) {
    case 'INDIVIDUAL':
      return baseSchema.extend({
        DNI: z.string().regex(/^(\d{7,8}|\d{1,2}\.\d{3}\.\d{3})$/, 'DNI inválido')
      })

    case 'BUSINESS':
      return baseSchema.extend({
        CUIT: z.string().regex(/^(\d{11}|\d{2}-\d{8}-\d{1})$/, 'CUIT inválido')
      })

    default:
      return baseSchema
  }
}