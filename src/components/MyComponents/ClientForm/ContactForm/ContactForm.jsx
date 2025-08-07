import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from './schema'
import { Separator } from '@/components/ui/separator'


export default function ContactForm({ handleSubmit, defaultValues }) {

  // Local State
  const [primary, setPrimary] = useState('EMAIL')

  // Hooks
  const form = useForm({
    resolver: (() => zodResolver(contactSchema(primary)))(),
    defaultValues
  })

  const { formState: { isSubmitting } } = form


  // Methods
  const onSubmit = async (data) => {

    const body = {
      first_name: data.name,
      last_name: data.lastName,
      internal_notes: { metadata: data.note },
      contact_methods: [
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-3'>

        <div className='grid grid-cols-12 gap-3'>
          <div className='col-span-6'>
            <FormField
              control={form.control}
              name='name'
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
              
          <div className='col-span-2'>
            <Label className='font-bold mb-2'>Principal</Label>
            <Switch className='mt-2 ml-2' checked={primary === 'PHONE_PERSONAL'} onCheckedChange={() => setPrimary('PHONE_PERSONAL')} />
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
            <Switch className='mt-7.5 ml-2' checked={primary === 'WHATSAPP'} onCheckedChange={() => setPrimary('WHATSAPP')} />
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
            <Switch className='mt-7.5 ml-2' checked={primary === 'EMAIL'} onCheckedChange={() => setPrimary('EMAIL')} />
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
