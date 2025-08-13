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
import { provincesAr } from '@/Helpers/RegionsAr'

const addressSchema = z.object({
  place: z.enum(['HOME', 'WORK', 'OTHER'], {
    errorMap: () => ({ message: 'Debe seleccionar un lugar.' }),
  }),
  country: z.string().min(1),
  address: z.string().min(1, 'Escriba una dirección.'),
  region: z.string().min(1, 'Seleccione una provincia.'),
  zip: z.string().min(4, 'Escriba un código postal.'),
  city: z.string().min(1, 'Escriba una ciudad.'),
  dpto: z.string().optional(),
  note: z.string().optional(),
})

const addressTypes = [
  { value: 'HOME', label: 'Casa' },
  { value: 'WORK', label: 'Trabajo' },
  { value: 'OTHER', label: 'Otro' }
]

const defaultValues = {
  place: '',
  country: 'AR',
  address: '',
  region: '',
  zip: '',
  city: '',
  dpto: '',
  note: '',
}

export default function AddAddress({ submit }) {

  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues
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
            name='place'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={field.name} className='font-bold'>Lugar</FormLabel>
                  
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Seleccione lugar' />
                    </SelectTrigger>

                    <SelectContent>
                      {addressTypes.map((province) => (
                        <SelectItem key={province.value} value={province.value}>
                          {province.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    disabled
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Seleccione un país' />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value={'AR'}>Argentina</SelectItem>
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
                      <SelectValue placeholder='Cordoba' />
                    </SelectTrigger>

                    <SelectContent>
                      {provincesAr.map((province) => (
                        <SelectItem key={province.code} value={province.code}>
                          {province.name}
                        </SelectItem>
                      ))}
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
