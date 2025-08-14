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
        DNI: z.string().min(8, 'DNI invalido').max(8, 'DNI invalido')
      })

    case 'BUSINESS':
      return baseSchema.extend({
        CUIT: z.string().min(11, 'CUIT invalido').max(11, 'CUIT invalido')
      })

    default:
      return baseSchema
  }
}