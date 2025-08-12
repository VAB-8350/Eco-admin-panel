import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { useState, useCallback, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from './schema'
import { Separator } from '@/components/ui/separator'

const contactTypes = [
  { value: 'EMPLOYEE', label: 'Empleado' },
  { value: 'FAMILY', label: 'Familiar' },
  { value: 'EMERGENCY', label: 'Emergencia' },
  { value: 'OTHER', label: 'Otro' }
]


export default function ContactForm({ handleSubmit, defaultValues }) {

  // Local State
  const [primary, setPrimary] = useState(defaultValues.contactMethods?.find(cm => cm.primary)?.type || 'EMAIL')

  // Use standard form with static schema
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      ...defaultValues,
      phone: defaultValues?.contactMethods?.find(cm => cm.type === 'PHONE_PERSONAL')?.value || '',
      whatsapp: defaultValues?.contactMethods?.find(cm => cm.type === 'WHATSAPP')?.value || '',
      email: defaultValues?.contactMethods?.find(cm => cm.type === 'EMAIL')?.value || '',
    },
    mode: 'onSubmit', // Solo validar al enviar
    reValidateMode: 'onChange' // Re-validar en tiempo real después del primer envío
  })

  const { formState: { isSubmitting } } = form

  // Initialize primary value in form
  useEffect(() => {
    form.setValue('primary', primary)
  }, [form, primary])

  // Handle primary change
  const handlePrimaryChange = useCallback((newPrimary) => {
    setPrimary(newPrimary)
    // Actualizar el valor primary en el formulario para la validación
    form.setValue('primary', newPrimary)
    // Limpiar errores de campos de contacto
    form.clearErrors(['email', 'phone', 'whatsapp'])
    // Trigger validation on the contact fields
    setTimeout(() => {
      form.trigger(['email', 'phone', 'whatsapp'])
    }, 0)
  }, [form])


  // Methods
  const onSubmit = async (data) => {
    // Forzar validación completa antes de procesar
    const isValid = await form.trigger()
    
    if (!isValid) return

    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      internalNotes: { metadata: data.note },
      role: data.role,
      type: data.type,
      contactMethods: [
        {
          type: 'PHONE_PERSONAL',
          value: data.phone,
          primary: primary === 'PHONE_PERSONAL'
        },
        {
          type: 'WHATSAPP',
          value: data.whatsapp,
          primary: primary === 'WHATSAPP'
        },
        {
          type: 'EMAIL',
          value: data.email,
          primary: primary === 'EMAIL'
        }
      ]
    }

    handleSubmit(body)
  }

  return (
    <Form {...form} className='w-full'>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3' noValidate>

        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-6'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name} className='font-bold'>Nombre</FormLabel>
                            
                  <FormControl>
                    <Input id={field.name} placeholder='nombre' type='text' {...field} disabled={isSubmitting} />
                  </FormControl>
                            
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='col-span-6'>
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name} className='font-bold'>Apellido</FormLabel>
                            
                  <FormControl>
                    <Input id={field.name} placeholder='Apellido' type='text' {...field} disabled={isSubmitting} />
                  </FormControl>
                            
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='col-span-6'>
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name} className='font-bold'>Tipo de Contacto</FormLabel>

                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Tipo de contacto' />
                      </SelectTrigger>
  
                      <SelectContent>
                        {contactTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='col-span-6'>
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name} className='font-bold'>Rol</FormLabel>
                                
                  <FormControl>
                    <Input
                      id={field.name}
                      placeholder='Gerente de Compras'
                      type='text'
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                                
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
              
          <div className='col-span-2'>
            <Label className='font-bold mb-2'>Principal</Label>
            <Switch className='mt-2 ml-2' checked={primary === 'PHONE_PERSONAL'} onCheckedChange={() => handlePrimaryChange('PHONE_PERSONAL')} />
          </div>

          <div className='col-span-10 pl-8'>
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name} className='font-bold'>Teléfono</FormLabel>
                                
                  <FormControl>
                    <Input
                      id={field.name}
                      placeholder='3584123123'
                      type='text'
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                                
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator className='col-span-12' />


          <div className='col-span-2'>
            <Switch className='mt-7.5 ml-2' checked={primary === 'WHATSAPP'} onCheckedChange={() => handlePrimaryChange('WHATSAPP')} />
          </div>

          <div className='col-span-10 pl-8'>
            <FormField
              control={form.control}
              name='whatsapp'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name} className='font-bold'>WhatsApp</FormLabel>
                                
                  <FormControl>
                    <Input
                      id={field.name}
                      placeholder='3584123123'
                      type='text'
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                                
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator className='col-span-12' />

          <div className='col-span-2'>
            <Switch className='mt-7.5 ml-2' checked={primary === 'EMAIL'} onCheckedChange={() => handlePrimaryChange('EMAIL')} />
          </div>

          <div className='col-span-10 pl-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name} className='font-bold'>Email</FormLabel>
                                
                  <FormControl>
                    <Input id={field.name} placeholder='nombre@dominio.com' type='text' {...field} disabled={isSubmitting} />
                  </FormControl>
                                
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='col-span-12'>
            <FormField
              control={form.control}
              name='note'
              render={({ field }) => (
                <FormItem className='flex flex-col w-full h-full'>
                  <FormLabel htmlFor={field.name} className='font-bold'>Nota</FormLabel>
                        
                  <FormControl>
                    <Textarea className='h-full resize-none' id={field.name} placeholder='Nota de recordatorio' type='text' {...field} disabled={isSubmitting} />
                  </FormControl>
                        
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type='submit'
          className='w-fit self-end font-bold'
          disabled={isSubmitting}
        >
              Agregar Contacto
        </Button>
      </form>
    </Form>
  )
}
