import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'

export default function InventoryPolicyForm({ submit, defaultValues }) {

  // Hooks
  const form = useForm()

  const { formState: { isSubmitting } } = form

  const onSubmit = async (data) => {

    submit({ ...data, id: defaultValues?.id })

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
    
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>Nombre</FormLabel>
                
              <FormControl>
                <Input id={field.name} type='text' {...field} disabled={isSubmitting} />
              </FormControl>
                
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='sellOutOfStock'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>Vender sin Stock</FormLabel>
                
              <FormControl>
                <Switch id='sellOutOfStock' checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
                
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='minStock'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>Cantidad Mínima en Stock</FormLabel>

              <FormControl>
                <Input id={field.name} type='number' {...field} disabled={isSubmitting} />
              </FormControl>
                
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='orderAmount'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>Cantidad Mínima de Pedido</FormLabel>

              <FormControl>
                <Input id={field.name} type='number' {...field} disabled={isSubmitting} />
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
