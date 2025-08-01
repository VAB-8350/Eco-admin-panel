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
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

const addressSchema = z.object({
  name: z.string().min(1),
  country: z.string().min(1),
  address: z.string().min(1),
  region: z.string().min(1),
  zip: z.string().min(4),
  city: z.string().min(1),
  dpto: z.string().min(1),
  note: z.string().min(5),
})

export default function AddAddress({ submit }) {

  const form = useForm({
    resolver: zodResolver(addressSchema)
  })

  const { formState: { isSubmitting } } = form

  const onSubmit = async (data) => {

    submit(data)

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>

        <div className='grid grid-cols-2 gap-5'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name} className='font-bold'>Nombre</FormLabel>
                  
                <FormControl>
                  <Input id={field.name} placeholder='Casa' type='text' {...field} disabled={isSubmitting} />
                </FormControl>
                  
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='country'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name} className='font-bold'>País</FormLabel>
                  
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Seleccione un país' />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value={'algo'}>hola</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name} className='font-bold'>Dirección</FormLabel>
                
              <FormControl>
                <Input id={field.name} placeholder='Calle 624' type='text' {...field} disabled={isSubmitting} />
              </FormControl>
                
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-2 gap-5'>
          <FormField
            control={form.control}
            name='region'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name} className='font-bold'>Provincia / Estado</FormLabel>
                  
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Seleccione una region' />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value={'algo'}>hola</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='zip'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name} className='font-bold'>Código Postal</FormLabel>
                  
                <FormControl>
                  <Input id={field.name} placeholder='5800' type='text' {...field} disabled={isSubmitting} />
                </FormControl>
                  
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        

        <div className='grid grid-cols-2 gap-5 items-start'>
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name} className='font-bold'>Ciudad</FormLabel>
                  
                <FormControl>
                  <Input id={field.name} placeholder='Rio Cuarto' type='text' {...field} disabled={isSubmitting} />
                </FormControl>
                  
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='dpto'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name} className='font-bold'>Departamento</FormLabel>
                  
                <FormControl>
                  <Input id={field.name} placeholder='5C' type='text' {...field} disabled={isSubmitting} />
                </FormControl>
                  
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='note'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name} className='font-bold'>Nota</FormLabel>
                
              <FormControl>
                <Textarea className='max-h-28 h-[4em] field-sizing-content' id={field.name} placeholder='Nota de recordatorio' type='text' {...field} disabled={isSubmitting} />
              </FormControl>
                
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='font-bold w-fit self-end' disabled={isSubmitting}>
            Agregar
        </Button>
      </form>
    </Form>
  )
}
