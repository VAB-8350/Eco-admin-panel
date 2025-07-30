import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { formSchema } from './schema'
import AddAddress from '@/components/MyComponents/AddAddress'
import { X, Plus, MapPinned } from 'lucide-react'
import { useState } from 'react'
import { useRef } from 'react'
import { z } from 'zod'

const phoneSchema = z.object({
  phone: z.string().min(7, 'Debe contener al menos 7 caracteres').regex(/^\+?\d+$/, 'El Teléfono no es valido')
})


export default function ClientForm({ setOpen, defaultValues }) {

  // Hooks
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues
  })

  const { formState: { isSubmitting } } = form

  // Local State
  const [phones, setPhones] = useState(defaultValues?.phones || [])
  const [phoneError, setPhoneError] = useState('')
  const [addresses, setAddresses] = useState(defaultValues?.addresses || [])

  // Refs
  const refPhoneInput = useRef(null)

  // Methods
  const onSubmit = async (data) => {

    console.log({
      ...data,
      phones,
      addresses
    })

  }

  const addPhone = () => {
    const phone = phoneSchema.safeParse({ phone: refPhoneInput.current?.value })
    setPhoneError('')

    if (phone.success) {
      const isAdded = phones.some(p => p.number === phone.data.phone)
      if (isAdded) {
        setPhoneError('Este Teléfono ya esta agregado')
        return
      }
      const hasPrimary = phones.some(p => p.primary)
      setPhones([...phones, { number: phone.data.phone, primary: (phones.length === 0) || !hasPrimary ? true : false }])
    } else {
      setPhoneError(JSON.parse(phone.error)[0].message)
    }

    if (refPhoneInput.current) {
      refPhoneInput.current.value = ''
      refPhoneInput.current.focus()
    }
  }

  const removePhone = (removePhone) => {
    setPhones(phones.filter(phone => phone.number !== removePhone.number))
  }

  const addAddress = (data) => {
    setAddresses([...addresses, data])
    setOpen(false)
  }

  // Render Methods
  const ErrorMessage = ({ message }) => {
    return (
      message.length > 0
        ? <p className='text-destructive text-sm'>{message}</p>
        : null
    )
  }

  return (
    <div className='px-5'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4' id='client-form'>

          <div className='grid grid-cols-12 grid-rows-3 gap-4'>
            <div className='col-span-2'>
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
            
            <div className='col-span-2'>
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
              <FormField
                control={form.control}
                name='DNI'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={field.name} className='font-bold'>DNI</FormLabel>
                    
                    <FormControl>
                      <Input id={field.name} placeholder='12345678' type='text' {...field} disabled={isSubmitting} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-6 row-span-3 col-start-7 h-full flex'>
              <FormField
                control={form.control}
                name='note'
                render={({ field }) => (
                  <FormItem className='flex flex-col w-full'>
                    <FormLabel htmlFor={field.name} className='font-bold h-fit'>Nota</FormLabel>
                    
                    <FormControl>
                      <Textarea className='h-full resize-none' id={field.name} placeholder='Nota de recordatorio' type='text' {...field} disabled={isSubmitting} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-3 row-start-2 flex flex-col gap-2'>
              <FormLabel htmlFor='phone' className='font-bold h-fit'>Teléfono</FormLabel>
              <div className='flex gap-1'>
                <Button className='w-fit' type='button' onClick={addPhone}><Plus /></Button>
                <Input
                  id='phone'
                  placeholder='3584123123'
                  type='text'
                  disabled={isSubmitting}
                  ref={refPhoneInput}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addPhone()
                    }
                  }}
                />
              </div>
              <ErrorMessage message={phoneError} />
            </div>
            
            <div className='col-span-3 col-start-4 row-start-2'>
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

            <div className='col-span-6 row-start-3 flex flex-wrap gap-2'>
              {
                phones.map((phone, index) => (
                  <Badge key={index} variant='outline' className='h-fit'>
                    <div className='flex items-center gap-1'>
                      {
                        phone.primary &&
                        <span className='w-2 h-2 bg-green-400 rounded-full' />
                      }
                      <p
                        className='text-xs p-0 hover:cursor-pointer'
                        onClick={() =>
                          setPhones(phones.map((p, i) => ({ ...p, primary: i === index })))
                        }
                      >{phone.number}</p>
                      <button type='button' className='text-xs hover:cursor-pointer' onClick={() => removePhone(phone)}><X className='w-4 h-4 stroke-red-600' /></button>
                    </div>
                  </Badge>
                ))
              }
            </div>
          </div>
        </form>
      </Form>

      <section className='my-10 border-t border-b border-[var(--border)]'>
        <header className='flex justify-between items-center my-5'>
          <h3 className='text-2xl font-bold'>Direcciones</h3>

          <DialogTrigger asChild>
            <Button className='font-bold'>
              <span className='hidden lg:inline-block'>Agregar Dirección</span>
              <span className='inline-block lg:hidden'><Plus className='stroke-3' /></span>
            </Button>
          </DialogTrigger>
        </header>
        
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Agregar Dirección</DialogTitle>
            <DialogDescription>
                Puedes rellenar primero el campo "Dirección" para obtener un autocompletado con google.
            </DialogDescription>
          </DialogHeader>

          <AddAddress submit={addAddress} />
        </DialogContent>

        <div className='grid grid-cols-3 gap-2 mb-10'>
          
          {
            addresses?.map((address, i) => (
              <div key={i} className='w-full border rounded-md flex gap-7 items-center p-2.5 pl-7'>
                <MapPinned />

                <div>
                  <h4 className='text-xl'><strong>{address.name}</strong> - <span>{address.address}</span></h4>
                  <p className='text-sm text-[var(--primary)]/60'>{address.country}, {address.region}, {address.city}, {address.zip}</p>
                </div>

                <button
                  type='button'
                  onClick={() => setAddresses([...addresses.filter((_, index) => index !== i)])}
                  className='text-red-600 ml-auto hover:cursor-pointer'
                >
                  <X />
                </button>
              </div>
            ))
          }

        </div>
      </section>
      
      <div className='w-full flex justify-end'>
        <Button type='submit' className='font-bold w-fit' disabled={isSubmitting} form='client-form'>
          Cargar Cliente
        </Button>
      </div>
    </div>
  )
}
