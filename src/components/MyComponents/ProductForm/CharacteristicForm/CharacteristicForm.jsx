import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useForm } from 'react-hook-form'

export default function CharacteristicForm({ submit, defaultValues }) {

  // Hooks
  const form = useForm()

  const { formState: { isSubmitting } } = form

  const onSubmit = async (data) => {

    submit({ ...data, id: defaultValues?.id })

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'> 

        dynamic form...
    
        <Button type='submit' className='font-bold w-fit self-end' disabled={isSubmitting}>
          Agregar
        </Button>
      </form>
    </Form>
  )
}
