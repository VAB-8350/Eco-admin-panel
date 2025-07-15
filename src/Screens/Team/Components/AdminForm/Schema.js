import { ROLE_ADMIN, ROLE_USER } from '@/Helpers/roles'
import { z } from 'zod'

export const formSchema = z.object({
  firstName: z.string().min(1, 'Este campo es requerido.').max(50, 'Maximo de 50 caracteres.'),
  lastName: z.string().min(1, 'Este campo es requerido.').max(50, 'Maximo de 50 caracteres.'),
  email: z.string().min(1, 'Este campo es requerido.').email('Este campo debe ser un email válido.'),
  role: z.enum([ROLE_ADMIN, ROLE_USER]),
})
