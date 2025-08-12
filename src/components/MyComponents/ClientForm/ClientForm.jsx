import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { clientSchema } from './schema'
import AddAddress from '@/components/MyComponents/AddAddress'
import { X, Plus, MapPinned, ContactRound, Pencil, Crown, Lightbulb, CircleCheck } from 'lucide-react'
import { useState } from 'react'
import ContactForm from './ContactForm/ContactForm'
import { Truck } from 'lucide-react'
import { FileText } from 'lucide-react'
import { provincesAr } from '@/Helpers/RegionsAr'
import useClientQueries from './useClientQueries'



export default function ClientForm({ defaultValues, editMode = false }) {

  // Local State
  const [type, setType] = useState(defaultValues?.type || 'INDIVIDUAL')
  const [addresses, setAddresses] = useState(defaultValues?.addresses || [])
  const [contacts, setContacts] = useState(defaultValues?.contacts || [])
  const [openDir, setOpenDir] = useState(false)
  const [openContact, setOpenContact] = useState(false)
  const [primaryContact, setPrimaryContact] = useState(defaultValues?.contacts.find(contact => contact.primary).id || null)
  const [shippingAddress, setShippingAddress] = useState(null)
  const [billingAddress, setBillingAddress] = useState(null)
  const [errors, setErrors] = useState({})
  const [defaultContactForm, setDefaultContactForm] = useState({})

  // Hooks
  const {
    createClientMutation,
    modifyClientMutation,
    createAddressMutation,
    modifyAddressMutation,
    deleteAddressMutation,
    createContactMutation,
    modifyContactMutation,
    deleteContactMutation,
  } = useClientQueries()
  const form = useForm({
    resolver: (() => zodResolver(clientSchema(type)))(),
    defaultValues
  })

  const { formState: { isSubmitting } } = form

  // Methods
  const onSubmit = async (data) => {

    if (!validate()) return

    const isPerson = !!data.DNI

    if  (editMode){
      console.log('Editando cliente...')
    }
    else {
      console.log('Creando cliente...')
      const body = {
        'customer_type': isPerson ? 'INDIVIDUAL' : 'BUSINESS',
        'internal_notes': { 'metadata':  data.note },
        'identification_type': isPerson ? 'AR_DNI' : 'AR_CUIT',
        'identification_number': data.DNI || data.CUIT,
        'customer_details': {
          // 'company_name': !isPerson ? data.lastName : '',
          // 'fantasy_name': !isPerson ? data.name : '',
          'first_name': isPerson ? data.name : '',
          // 'second_name': 'Carlos',
          'first_surname': isPerson ? data.lastName : '',
          // 'second_surname': 'Gómez',
          // 'birth_date': '1980-01-01'
        },
        'address': addresses.map(address => {
          return {
            'address_type': address.place,
            'street': address.address,
            'city': address.city,
            'state_province': address.region,
            'zip_code': address.zip,
            'country_code': address.country,
            'is_primary': address.id === shippingAddress,
          }
        }),
        'customer_contacts': contacts.map(contact => {
          return {
            'contact_type': contact.type,
            'first_name': contact.firstName,
            'last_name': contact.lastName,
            'role': contact.role,
            // 'is_primary': contact.id === primaryContact,
            'internal_notes': contact.internalNotes,
            'contact_methods': contact.contactMethods.map(cm => {
              return {
                'type': cm.type,
                'value': cm.value,
                'is_primary': cm.primary,
              }
            })
          }
        })
      }
      console.log(body)
      createClientMutation.mutate(body)
    }

    console.log({
      ...data,
      addresses,
      contacts,
      primaryContact,
      shippingAddress,
      billingAddress
    })

  }

  const validate = () => {
    const newErrors = {}

    if (contacts.length === 0) {
      newErrors.contacts = {
        type: 'contactsLength',
        message: 'Debe agregar al menos un contacto.'
      }
    }
    if (addresses.length === 0) {
      newErrors.addresses = {
        type: 'addressesLength',
        message: 'Debe agregar al menos una dirección.'
      }
    }
    if (billingAddress === null || !addresses.some(address => address.id === billingAddress)) {
      newErrors.billingAddress = {
        type: 'billingAddress',
        message: 'Debe seleccionar una dirección de facturación.'
      }
    }
    if (shippingAddress === null || !addresses.some(address => address.id === shippingAddress)) {
      newErrors.shippingAddress = {
        type: 'shippingAddress',
        message: 'Debe seleccionar una dirección de envío.'
      }
    }
    if (primaryContact === null || !contacts.some(contact => contact.id === primaryContact)) {
      newErrors.primaryContact = {
        type: 'primaryContact',
        message: 'Debe seleccionar un contacto principal.'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const addAddress = (data) => {
    // Generar un id único para la dirección
    const newAddress = { ...data, id: crypto.randomUUID() }
    setAddresses([...addresses, newAddress])
    if (shippingAddress === null) setShippingAddress(newAddress.id)
    if (billingAddress === null) setBillingAddress(newAddress.id)
    setOpenDir(false)
  }

  const addContact = (data) => {

    const isEdited = !!data.id
    
    if (isEdited) {
      // Editar contacto existente
      const updatedContacts = contacts.map(contact => 
        contact.id === data.id ? { ...contact, ...data } : contact
      )
      setContacts(updatedContacts)
      if (primaryContact === null) setPrimaryContact(data.id)
      setOpenContact(false)
    }
    
    else {
      // Agregar nuevo contacto
      const newContact = { ...data, id: crypto.randomUUID() }
      setContacts([...contacts, newContact])
      if (primaryContact === null) setPrimaryContact(newContact.id)
      setOpenContact(false)
    
    }

  }

  return (
    <div className='px-5'>
      <section className='grid grid-cols-12 gap-9'>
        <div className='col-span-7'>
          <header className='flex justify-between items-center mb-5'>
            <h3 className='text-2xl font-bold'>Cliente</h3>
          </header>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4' id='client-form'>
              <div className='grid grid-cols-6 gap-4'>
                <div className='col-span-3'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={field.name} className='font-bold'>
                          {
                            type === 'INDIVIDUAL' ? 'Nombre' : 'Nombre de fantasía'
                          }
                        </FormLabel>
                          
                        <FormControl>
                          <Input id={field.name} placeholder={type === 'INDIVIDUAL' ? 'Juan' : 'FarmaSur'} type='text' {...field} disabled={isSubmitting} />
                        </FormControl>
                          
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                  
                <div className='col-span-3'>
                  <FormField
                    control={form.control}
                    name='lastName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={field.name} className='font-bold'>
                          {
                            type === 'INDIVIDUAL' ? 'Apellido' : 'Nombre de la empresa'
                          }
                        </FormLabel>
                          
                        <FormControl>
                          <Input id={field.name} placeholder={type === 'INDIVIDUAL' ? 'Pérez' : 'Laboratorios Farmacéuticos del Sur S.A.'} type='text' {...field} disabled={isSubmitting} />
                        </FormControl>
                          
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-2 row-start-2 col-start-1'>
                  <FormLabel className='font-bold mb-2'>Tipo de cliente</FormLabel>
                      
                  <Select
                    onValueChange={setType}
                    defaultValue={type}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Tipo' />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value={'INDIVIDUAL'}>Persona</SelectItem>
                      <SelectItem value={'BUSINESS'}>Empresa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {
                  type === 'INDIVIDUAL' &&
                  <div className='col-span-4 row-start-2 col-start-3'>
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
                }
                {
                  type === 'BUSINESS' &&
                  <div className='col-span-4 row-start-2 col-start-3'>
                    <FormField
                      control={form.control}
                      name='CUIT'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor={field.name} className='font-bold'>CUIT</FormLabel>

                          <FormControl>
                            <Input id={field.name} placeholder='20123456785' type='text' {...field} disabled={isSubmitting} />
                          </FormControl>
                            
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                }

                <div className='col-span-6 row-start-3 col-start-1'>
                  <FormField
                    control={form.control}
                    name='note'
                    render={({ field }) => (
                      <FormItem className='flex flex-col w-full h-[100px]'>
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
            </form>
          </Form>
        </div>

        <Card className='col-span-5'>
          <CardHeader>
            <CardTitle className='font-bold flex items-center gap-2 text-xl'>
              <Lightbulb className='w-5 h-5 dark:stroke-amber-300 stroke-amber-500'/> Consejos
            </CardTitle>
            <CardDescription>Esto tal vez pueda servirte.</CardDescription>
          </CardHeader>

          <CardContent>
            <ul className='list-disc list-inside ml-5 flex flex-col gap-2'>
              <li className='font-'>Marca un contacto como principal</li>
              <li className='font-'>Agrega múltiples contactos si es necesario</li>
              <li className='font-'>Recuerda configurar el contacto principal</li>
              <li className='font-'>Agrega múltiples direcciones si es necesario</li>
              <li className='font-'>Recuerda configurar la dirección de envío y de facturación</li>
            </ul>
          </CardContent>
        </Card>

        <div className='col-span-6'>
          <Dialog open={openContact} onOpenChange={setOpenContact}>
            <div>
              <header className='flex justify-between items-center mb-5'>
                <h3 className='text-2xl font-bold'>Contactos</h3>
              
                <DialogTrigger asChild>

                  <Button className='font-bold hover:cursor-pointer' variant='outline' type='button' onClick={() => setDefaultContactForm({})}>
                    <span className='hidden lg:flex gap-2 items-center'><Plus className='stroke-3' />Agregar</span>
                    <span className='inline-block lg:hidden'><Plus className='stroke-3' /></span>
                  </Button>
                </DialogTrigger>
              </header>
              
              {
                errors.contacts &&
                <span className='text-red-600 text-sm'>{errors.contacts.message}</span>
              }
              {
                !errors.contacts && errors.primaryContact &&
                <span className='text-red-600 text-sm'>{errors.primaryContact.message}</span>
              }
            </div>

            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Agregar Contacto</DialogTitle>
                <DialogDescription>
                  Puedes agregar multiples contactos para el cliente y elegir uno como principal.
                </DialogDescription>
              </DialogHeader>

              <ContactForm handleSubmit={addContact} defaultValues={defaultContactForm} />
            </DialogContent>
          </Dialog>

          <ScrollArea className='w-full h-[250px] pr-5' id='contacts-scroll-area'>

            {contacts.length === 0 ? (
              <div className='w-full h-full flex flex-col items-center justify-center mt-10'>
                <h3 className='text-2xl font-bold'>Agregue un contacto</h3>
                <p className='text-sm text-muted-foreground'>Para comenzar, haga clic en "Agregar".</p>
              </div>
            ) : (
              contacts.map((contact) => (
                <div key={contact.id} className='border-b border-border py-2 last:border-b-0 flex items-center gap-4 px-4 relative hover:bg-[#f9f9f9] hover:dark:bg-[#181818] transition-colors duration-200'>
                  <ContactRound />
                  <div>
                    <h4 className='text-md font-bold'>
                      {contact.firstName} {contact.lastName}
                      {
                        primaryContact === contact.id &&
                        <Badge variant='outline' className='ml-2'>
                          <CircleCheck className='w-4 h-4 mr-1 stroke-green-500' />
                          Principal
                        </Badge>
                      }
                    </h4>
                    <p className='text-xs text-muted-foreground flex gap-2 flex-wrap'>
                      {contact.contactMethods
                        .filter(method => method.value)
                        .map(method => (
                          <span
                            key={method.type}
                            className={`text-nowrap ${method.primary ? 'font-semibold text-green-600 dark:text-green-500' : ''}`}
                          >
                            {method.value}
                          </span>
                        ))}
                    </p>
                  </div>

                  <div className='flex items-center gap-2 ml-auto'>
                    <button
                      type='button'
                      onClick={() => {
                        setPrimaryContact(contact.id)
                      }}
                      className='hover:text-yellow-500 hover:cursor-pointer ml-auto transition-colors duration-200'
                    >
                      <Crown className={`w-4 h-4 ${primaryContact === contact.id ? 'fill-yellow-500 stroke-yellow-500' : ''}`} />
                    </button>
                    <button
                      type='button'
                      onClick={() => {
                        setDefaultContactForm(contact)
                        setOpenContact(true)
                      }}
                      className='hover:text-blue-500 hover:cursor-pointer ml-auto transition-colors duration-200'
                    >
                      <Pencil className='w-4 h-4' />
                    </button>
                    <button
                      type='button'
                      onClick={() => setContacts([...contacts.filter((c) => c.id !== contact.id)])}
                      className='text-red-600 hover:cursor-pointer ml-auto opacity-70 hover:opacity-100 transition-opacity duration-200'
                    >
                      <X className='w-5 h-5' />
                    </button>
                  </div>
                  
                </div>
              ))
            )}

            <span className='inline-block w-full h-10 bg-linear-to-b from-transparent to-[var(--background)] position absolute bottom-0' />
            <span className='inline-block h-10' />
          </ScrollArea>
        </div>

        <div className='col-span-6'>
          <Dialog open={openDir} onOpenChange={setOpenDir}>
            <div className='flex flex-col'>
              <header className='flex justify-between items-center mb-5'>
                <h3 className='text-2xl font-bold'>Direcciones</h3>
                
                <DialogTrigger asChild>
                  <Button className='font-bold hover:cursor-pointer' variant='outline'>
                    <span className='hidden lg:flex gap-2 items-center'><Plus className='stroke-3' />Agregar</span>
                    <span className='inline-block lg:hidden'><Plus className='stroke-3' /></span>
                  </Button>
                </DialogTrigger>
              </header>
              {
                errors.addresses &&
                <span className='text-red-600 text-sm'>{errors.addresses.message}</span>
              }
              {
                !errors.addresses && errors.shippingAddress &&
                <span className='text-red-600 text-sm'>{errors.shippingAddress.message}</span>
              }
              {
                !errors.addresses && !errors.shippingAddress && errors.billingAddress &&
                <span className='text-red-600 text-sm'>{errors.billingAddress.message}</span>
              }
            </div>
            
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Agregar Dirección</DialogTitle>
                <DialogDescription>
                    Puedes rellenar primero el campo "Dirección" para obtener un autocompletado con google.
                </DialogDescription>
              </DialogHeader>

              <AddAddress submit={addAddress} />
            </DialogContent>
          </Dialog>

          <ScrollArea className='flex flex-col gap-3 h-[250px] overflow-y-auto pr-2' id='addresses-scroll-area'>

            {addresses.length === 0 ? (
              <div className='w-full h-full flex flex-col items-center justify-center mt-10'>
                <h3 className='text-2xl font-bold'>Agregue una Dirección</h3>
                <p className='text-sm text-muted-foreground'>Para comenzar, haga clic en "Agregar".</p>
              </div>
            ) : (
              addresses.map((address) => (
                <div key={address.id} className='border-b border-border py-2 last:border-b-0 flex items-center gap-4 px-4 relative hover:bg-[#f9f9f9] hover:dark:bg-[#181818] transition-colors duration-200'>
                  <MapPinned />
                  <div>
                    <h4 className='text-sm font-bold'>
                      {address.place} - {address.address}
                      {
                        shippingAddress === address.id &&
                        <Badge variant='outline' className='ml-2'>
                          <Truck className='w-4 h-4 mr-1 stroke-green-500' />
                          Envío
                        </Badge>
                      }

                      {
                        billingAddress === address.id &&
                        <Badge variant='outline' className='ml-2'>
                          <FileText className='w-4 h-4 mr-1 stroke-blue-400' />
                          Facturación
                        </Badge>
                      }
                    </h4>
                    <p className='text-xs text-muted-foreground'>
                      {address.country === 'AR' ? 'Argentina' : address.country}, {provincesAr.find(p => p.code === address.region)?.name}, {address.city}, {address.zip}
                    </p>
                  </div>

                  <div className='flex items-center gap-2 ml-auto'>
                    <button
                      type='button'
                      onClick={() => setShippingAddress(address.id)}
                      className='hover:cursor-pointer ml-auto opacity-70 hover:opacity-100 hover:text-green-500 transition-opacity duration-200'
                    >
                      <Truck className={`w-5 h-5 ${shippingAddress === address.id ? 'fill-green-500 stroke-green-700' : ''}`} />
                    </button>
                    <button
                      type='button'
                      onClick={() => setBillingAddress(address.id)}
                      className='hover:cursor-pointer ml-auto opacity-70 hover:opacity-100 hover:text-blue-400 transition-opacity duration-200'
                    >
                      <FileText className={`w-5 h-5 ${billingAddress === address.id ? 'fill-blue-400 stroke-blue-800' : ''}`} />
                    </button>
                    <button
                      type='button'
                      onClick={() => setAddresses([...addresses.filter((a) => a.id !== address.id)])}
                      className='text-red-600 hover:cursor-pointer ml-auto opacity-70 hover:opacity-100 transition-opacity duration-200'
                    >
                      <X className='w-5 h-5' />
                    </button>
                  </div>
                  
                </div>
              ))
            )}
            <span className='inline-block w-full h-10 bg-linear-to-b from-transparent to-[var(--background)] position absolute bottom-0' />
            <span className='inline-block h-10' />
          </ScrollArea>
        </div>
      </section>
    </div>
  )
}
