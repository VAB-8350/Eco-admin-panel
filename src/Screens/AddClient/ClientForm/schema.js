import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(2, 'Este campo es requerido.'),
  lastName: z.string().min(2, 'Este campo es requerido.'),
  DNI: z.string().min(8, 'Este campo es requerido.'),
  note: z.string()
})