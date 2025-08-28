import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Este campo es requerido.'),
  description: z.string().min(10, 'Este campo es requerido.'),
})

export default function MasterProductForm({ submit, defaultValues }) {

  // Hooks
  const form = useForm({
    resolver: zodResolver(schema),
    // defaultValues
  })

  const { formState: { isSubmitting } } = form

  const onSubmit = async (data) => {
    // Handle form submission
    console.log(data)
  }

  return (
    <Form {...form}>
      <form id='master-product-form' onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4' >
        <div className='flex flex-col gap-4 lg:gap-6'>
  
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>
                  Nombre
                </FormLabel>
                                        
                <FormControl>
                  <Input
                    id={field.name}
                    type='text'
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                                        
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>
                  Descripción
                </FormLabel>
                                        
                <FormControl>
                  <Textarea
                    id={field.name}
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
      </form>
    </Form>
  )
}
