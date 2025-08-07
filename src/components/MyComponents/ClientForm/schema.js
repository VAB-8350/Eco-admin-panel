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
        DNI: z.string().min(8, 'Este campo es requerido.')
      })

    case 'BUSINESS':
      return baseSchema.extend({
        CUIT: z.string().min(11, 'Este campo es requerido.')
      })

    default:
      return baseSchema
  }
}