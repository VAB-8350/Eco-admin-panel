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
import useMasterProductQueries from './useMasterProductQueries'
import LoadScreenBlur from '@/components/MyComponents/LoadScreenBlur'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import SimpleToast from '@/components/MyComponents/SimpleToast'

const schema = z.object({
  name: z.string().min(2, 'Este campo es requerido.'),
  description: z.string().min(2, 'Este campo es requerido.'),
})

export default function MasterProductForm({ defaultValues }) {

  const { masterProductId } = defaultValues || {}

  // Local State
  const [loading, setLoading] = useState({
    title: '',
    process: '',
    state: false
  })

  // Hooks
  const navigate = useNavigate()
  const { addMasterProduct, editMasterProduct } = useMasterProductQueries()
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: defaultValues?.masterName, description: defaultValues?.description || ''},
  })

  const { formState: { isSubmitting } } = form


  const onSubmit = async (data) => {
    // Handle form submission
    if (masterProductId) {
      setLoading({ title: 'Actualizando cliente...', process: '', state: true })
      const res = await editMasterProduct.mutateAsync({ id: masterProductId, data })
      setLoading({ title: '', process: '', state: false })

      if (res) {
        toast(<SimpleToast message='Producto Maestro Actualizado.' state='success' />)
        navigate('/master-products')
      } else {
        toast(<SimpleToast message='Ups! Ocurrio un error...' state='error' />)
      }
    } else {

      addMasterProduct.mutate(data)
    
    }
  }

  return (
    <>
      {
        loading.state && <LoadScreenBlur title={loading.title} process={loading.process} />
      }
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
    </>
  )
}
