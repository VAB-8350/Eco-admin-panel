
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { formSchema } from './Schema'
import { ROLE_ADMIN, ROLE_USER } from '@/Helpers/roles'
import { useMutation } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import SimpleToast from '@/components/MyComponents/SimpleToast'

export default function AdminForm({ initialVal, setOpen, refetch }) {

  // Hooks
  const axiosPrivate = useAxiosPrivate()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialVal,
  })
  const { formState: { isSubmitting } } = form

  // Hooks Mutations
  const createUserMutation = useMutation({ // create a user
    mutationFn: async (data) => {
      return await axiosPrivate.post('/users/invitation', data)
    },
  })

  const modifyUserMutation = useMutation({ // modify a user
    mutationFn: async ({ data, clerkId }) => {
      return await axiosPrivate.patch(`/users/${clerkId}`, data)
    },
  })

  // Constants
  const errorResponse = createUserMutation.isError || modifyUserMutation.error


  // Methods
  const onSubmit = async (data) => {

    const isNewUser = !initialVal.id
    
    const body = {
      first_name: data.firstName !== initialVal.firstName ? data.firstName : undefined,
      last_name: data.lastName !== initialVal.lastName ? data.lastName : undefined,
      email_address: data.email !== initialVal.email ? data.email : undefined,
      public_metadata: data.role !== initialVal.role ? { role: data.role } : undefined,
    }

    if (!isNewUser) {
      await modifyUserMutation.mutateAsync({ data: body, clerkId: initialVal.id })
      toast(<SimpleToast message='Usuario Modificado!' state='success' />)
    }

    else await createUserMutation.mutateAsync(body)

    setTimeout(() => {
      setOpen(false)
      refetch()
    }, 100)

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.firstName}>Nombre</FormLabel>
                
                <FormControl>
                  <Input id={field.firstName} placeholder='Nombre' {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.lastName}>Apellido</FormLabel>
                
                <FormControl>
                  <Input id={field.lastName} placeholder='Apellido' {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Email</FormLabel>

              <FormControl>
                <Input id={field.name} placeholder='example@gmail.com' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className='w-full'>
                  <SelectTrigger>
                    <SelectValue placeholder='Role' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={ROLE_ADMIN}>{ROLE_ADMIN}</SelectItem>
                  <SelectItem value={ROLE_USER}>{ROLE_USER}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='font-bold mt-2' disabled={isSubmitting}>
          {isSubmitting ? <Loader className='animate-spin' /> : 'Guardar'}
        </Button>

        {errorResponse && (
          <div className='text-red-500 text-sm'>
            {errorResponse?.response?.data?.message || errorResponse?.message || 'Error'}
          </div>
        )}
      </form>
    </Form>
  )
}
