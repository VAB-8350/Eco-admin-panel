import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(10, 'Este campo es requerido.'),
  lastName: z.string().min(10, 'Este campo es requerido.'),
  DNI: z.string().min(10, 'Este campo es requerido.'),
})