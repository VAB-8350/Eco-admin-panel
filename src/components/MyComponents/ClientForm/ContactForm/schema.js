import { z } from 'zod'

const baseSchema = z.object({
  name: z.string().min(2, 'Este campo es requerido.'),
  lastName: z.string().min(2, 'Este campo es requerido.'),
  note: z.string().optional(),
})

export function contactSchema (contactType) {
  const extendedSchema = baseSchema.extend({
    email: contactType === 'EMAIL' 
      ? z.string().email('Debe ser un email válido').min(1, 'Este campo es requerido.')
      : z.string().email('Debe ser un email válido').optional().or(z.literal('')),
    phone: contactType === 'PHONE_PERSONAL'
      ? z.string().min(1, 'Este campo es requerido.')
      : z.string().optional(),
    whatsapp: contactType === 'WHATSAPP'
      ? z.string().min(1, 'Este campo es requerido.')
      : z.string().optional(),
  })
  
  return extendedSchema
}