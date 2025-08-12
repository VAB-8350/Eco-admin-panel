import { z } from 'zod'

// Schema principal que incluye toda la validación condicional
export const contactSchema = z.object({
  firstName: z.string({
    required_error: 'El Nombre es requerido.',
    invalid_type_error: 'El Nombre es requerido.'
  }).min(2, 'El Nombre es requerido.'),
  lastName: z.string({
    required_error: 'El Apellido es requerido.',
    invalid_type_error: 'El Apellido es requerido.'
  }).min(2, 'El Apellido es requerido.'),
  note: z.string().optional(),
  role: z.string().optional(),
  type: z.enum(['EMPLOYEE', 'FAMILY', 'EMERGENCY', 'OTHER'], {
    required_error: 'Debe seleccionar un tipo válido.',
    invalid_type_error: 'Debe seleccionar un tipo válido.'
  }),
  email: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  primary: z.string().optional()
}).superRefine((data, ctx) => {
  const { email, phone, whatsapp, primary } = data

  // Validar email
  if (email && email !== '') {
    const emailResult = z.string().email('Debe ser un email válido').safeParse(email)
    if (!emailResult.success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Debe ser un email válido',
        path: ['email']
      })
    }
  }

  // Si email es principal, debe ser requerido y válido
  if (primary === 'EMAIL') {
    if (!email || email === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El Email es requerido.',
        path: ['email']
      })
    } else {
      const emailResult = z.string().email('Debe ser un email válido').safeParse(email)
      if (!emailResult.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Debe ser un email válido',
          path: ['email']
        })
      }
    }
  }

  // Si teléfono es principal, debe ser requerido
  if (primary === 'PHONE_PERSONAL' && (!phone || phone === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'El Teléfono es requerido.',
      path: ['phone']
    })
  }

  // Si WhatsApp es principal, debe ser requerido
  if (primary === 'WHATSAPP' && (!whatsapp || whatsapp === '')) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'El WhatsApp es requerido.',
      path: ['whatsapp']
    })
  }
})