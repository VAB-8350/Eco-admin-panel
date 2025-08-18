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
import { toast } from 'sonner'
import SimpleToast from '@/components/MyComponents/SimpleToast'
import { useNavigate } from 'react-router-dom'
import { buildClient, parseClient, parseAddress, parseContact } from './ContactForm/BuildObjForSend'
import LoadScreenBlur from '@/components/MyComponents/LoadScreenBlur'

export default function ClientForm({ defaultValues, editMode = false }) {

  // Local State
  const [type, setType] = useState(defaultValues?.type || 'INDIVIDUAL')
  const [addresses, setAddresses] = useState(defaultValues?.addresses || [])
  const [contacts, setContacts] = useState(defaultValues?.contacts || [])
  const [openDir, setOpenDir] = useState(false)
  const [openContact, setOpenContact] = useState(false)
  const [primaryContact, setPrimaryContact] = useState(defaultValues?.contacts.find(contact => contact.primary)?.id || null)
  const [shippingAddress, setShippingAddress] = useState(defaultValues?.preferences?.default_shipping_address_id || null)
  const [billingAddress, setBillingAddress] = useState(defaultValues?.preferences?.default_billing_address_id || null)
  const [errors, setErrors] = useState({})
  const [defaultContactForm, setDefaultContactForm] = useState({})
  const [defaultAddressForm, setDefaultAddressForm] = useState({})
  const [pendingChanges, setPendingChanges] = useState([])
  const [loading, setLoading] = useState({
    title: '',
    process: '',
    state: false
  })

  // Hooks
  const navigate = useNavigate()
  const {
    commitClientMutation,
    createClientMutation,
    modifyClientMutation,
    createAddressMutation,
    modifyAddressMutation,
    deleteAddressMutation,
    createContactMutation,
    modifyContactMutation,
    modifyContactMethodMutation,
    deleteContactMutation
  } = useClientQueries()
  const form = useForm({
    resolver: (() => zodResolver(clientSchema(type)))(),
    defaultValues
  })

  const { formState: { isSubmitting } } = form

  // Methods
  const onSubmit = async (data) => {

    if (!validate()) return

    if (editMode) {
      setLoading({ title: 'Actualizando cliente...', process: '', state: true })
      await sendPendingChanges(defaultValues?.id)
    } else {
      setLoading({
        title: 'Creando cliente...',
        process: '',
        state: true
      })

      const body = buildClient(data, addresses, contacts, primaryContact, shippingAddress, billingAddress, type)

      const res = await createClientMutation.mutateAsync(body)

      if (!res) {
        toast(<SimpleToast message='Ups! Ocurrio un error...' state='error' />)
      } else {
        navigate('/clients')
        toast(<SimpleToast message='Cliente creado exitosamente!' state='success' />)
      }
    }

    setLoading({
      title: '',
      process: '',
      state: false
    })

  }

  const sendPendingChanges = async (clientId) => {
    let isError = false
    for (const change of pendingChanges) {
      switch (change.type) {
        case 'deleteAddress': {
          setLoading({ title: 'Actualizando cliente...', process: 'Eliminando dirección...', state: true })
          const res = await deleteAddressMutation.mutateAsync({ clientId, addressId: change.id })
          if (!res) isError = true
          break
        }

        case 'deleteContact': {
          setLoading({ title: 'Actualizando cliente...', process: 'Eliminando contacto...', state: true })
          const res = await deleteContactMutation.mutateAsync({ clientId, contactId: change.id })
          if (!res) isError = true
          break
        }

        case 'modifyClient': {
          setLoading({ title: 'Actualizando cliente...', process: 'Modificando cliente...', state: true })
          const body = { ...parseClient(change.data, type), customer_id: clientId }
          const res = await modifyClientMutation.mutateAsync({ clientId, data: body })
          if (!res) isError = true
          break
        }

        case 'createAddress': {
          setLoading({ title: 'Actualizando cliente...', process: 'Creando dirección...', state: true })
          const body = parseAddress(change.data, shippingAddress, billingAddress)
          const res = await createAddressMutation.mutateAsync({ clientId, data: body })
          if (!res) isError = true
          break
        }

        case 'modifyAddress': {
          setLoading({ title: 'Actualizando cliente...', process: 'Modificando dirección...', state: true })
          const body = parseAddress(change.data, shippingAddress, billingAddress)
          const res = await modifyAddressMutation.mutateAsync({ clientId, addressId: change.id, data: { ...body, address_id: change.id } })
          if (!res) isError = true
          break
        }

        case 'createContact': {
          setLoading({ title: 'Actualizando cliente...', process: 'Creando contacto...', state: true })
          const body = parseContact(change.data, primaryContact)
          const res = await createContactMutation.mutateAsync({ clientId, data: body })
          if (!res) isError = true
          break
        }

        case 'modifyContact': {
          setLoading({ title: 'Actualizando cliente...', process: 'Modificando contacto...', state: true })
          const body = { ...parseContact(change.data, primaryContact), contact_id: change.id }
          const contactMethods = [...body.contact_methods]
          delete body.contact_methods
          const res = await modifyContactMutation.mutateAsync({ clientId, contactId: change.id, data: body })
          if (!res) isError = true

          if (contactMethods.length > 0) {
            for (const cm of contactMethods) {
              cm.contact_method_id = cm.id
              delete cm.id
              setLoading({ title: 'Actualizando cliente...', process: 'Actualizando Métodos...', state: true })
              const res = await modifyContactMethodMutation.mutateAsync({ clientId, contactId: change.id, methodId: cm.contact_method_id, data: cm })
              if (!res) isError = true
            }
          }
          break
        }
        
        // Agrega otros tipos si los necesitas
        default:
          break
      }
      if (isError) break
    }

    setLoading({ title: 'Actualizando cliente...', process: 'Confirmando datos...', state: true })
    const res = await commitClientMutation.mutateAsync(clientId)
    if (!res) isError = true

    if (isError) toast(<SimpleToast message='Ups! Ocurrio un error...' state='error' />)
    else {
      toast(<SimpleToast message='Cliente actualizado correctamente!' state='success' />)
      navigate('/clients')
    }
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

  const attachContactMethodIds = (contactData, defaultValues) => {
    // Busca el contacto original por id
    const originalContact = defaultValues.contacts.find(c => c.id === contactData.id)
    if (!originalContact) return contactData

    // Reconstruye los ids de los métodos
    const newMethods = contactData.contactMethods.map(cm => {
      const originalMethod = originalContact.contactMethods.find(om => om.type === cm.type)
      return originalMethod ? { ...cm, id: originalMethod.id } : cm
    })

    return { ...contactData, contactMethods: newMethods }
  }

  const addAddress = (data) => {

    const isEdited = !!data.id
    if (isEdited) {
      // Editar address existente
      const updatedAddresses = addresses.map(address => 
        address.id === data.id ? { ...address, ...data } : address
      )
      setAddresses(updatedAddresses)
      if (shippingAddress === null) setShippingAddress(updatedAddresses.id)
      if (billingAddress === null) setBillingAddress(updatedAddresses.id)
      setOpenDir(false)

      if (editMode && !data.id?.startsWith('front-id-')) {
        upsertChange({ type: 'modifyAddress', id: data.id, data })
      }

    } else {
      // Generar un id único para la dirección
      const newAddress = { ...data, id: `front-id-${crypto.randomUUID()}` }
      setAddresses([...addresses, newAddress])
      if (shippingAddress === null) setShippingAddress(newAddress.id)
      if (billingAddress === null) setBillingAddress(newAddress.id)
      setOpenDir(false)
      // Si está en modo edición, registrar el cambio
      if (editMode) {
        upsertChange({ type: 'createAddress', id: newAddress.id, data: newAddress })
      }
    }
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
      // Si está en modo edición y el contacto existe en backend, registrar modificación
      if (editMode && !data.id?.startsWith('front-id-')) {
        const contactDataWithIds = attachContactMethodIds(data, defaultValues)
        upsertChange({ type: 'modifyContact', id: data.id, data: contactDataWithIds })
      }
    } else {
      // Agregar nuevo contacto
      const newContact = { ...data, id: `front-id-${crypto.randomUUID()}` }
      setContacts([...contacts, newContact])
      if (primaryContact === null) setPrimaryContact(newContact.id)
      setOpenContact(false)
      // Si está en modo edición, registrar el cambio
      if (editMode) {
        upsertChange({ type: 'createContact', id: newContact.id, data: newContact })
      }
    }

  }

  const upsertChange = (change) => {
    setPendingChanges(prev => {
      const idx = prev.findIndex(
        c => c.type === change.type && c.id === change.id
      )
      if (idx !== -1) {
        // Actualiza el cambio existente
        const updated = [...prev]
        updated[idx] = { ...updated[idx], ...change }
        return updated
      }
      // Agrega nuevo cambio
      return [...prev, change]
    })
  }

  // Handlers para borrar Address y Contact
  const handleDeleteAddress = (address) => {
    setAddresses(addresses.filter(a => a.id !== address.id))
    // Si está en modo edición y la dirección ya existe en el backend
    if (editMode && !address.id?.startsWith('front-id-')) {
      upsertChange({ type: 'deleteAddress', id: address.id })
    }
    // Si la dirección borrada era la de envío/facturación, resetear selección
    if (shippingAddress === address.id) setShippingAddress(null)
    if (billingAddress === address.id) setBillingAddress(null)
  }

  const handleDeleteContact = (contact) => {
    setContacts(contacts.filter(c => c.id !== contact.id))
    // Si está en modo edición y el contacto ya existe en el backend
    if (editMode && !contact.id?.startsWith('front-id-')) {
      upsertChange({ type: 'deleteContact', id: contact.id })
    }
    // Si el contacto borrado era el principal, resetear selección
    if (primaryContact === contact.id) setPrimaryContact(null)
  }

  // Registrar cambios del formulario principal en modo edición
  const handleMainFormChange = (field, value) => {
    if (!editMode) return
    // Construir el objeto de datos modificado
    const updated = { ...defaultValues, [field]: value }
    upsertChange({ type: 'modifyClient', id: defaultValues?.id, data: updated })
  }

  const handleSetPrimaryContact = (newPrimaryId) => {
    if (!editMode) {
      setPrimaryContact(newPrimaryId)
      return
    }

    const prevPrimaryId = primaryContact
    setPrimaryContact(newPrimaryId)

    // Cambiar el anterior a false, si existe
    if (prevPrimaryId && prevPrimaryId !== newPrimaryId) {
      upsertChange({
        type: 'modifyContact',
        id: prevPrimaryId,
        data: { ...contacts.find(c => c.id === prevPrimaryId), primary: false }
      })
    }

    // Cambiar el nuevo a true
    upsertChange({
      type: 'modifyContact',
      id: newPrimaryId,
      data: { ...contacts.find(c => c.id === newPrimaryId), primary: true }
    })
  }

  const handleSetBillingAddress = (newBillingId) => {
    if (!editMode) {
      setBillingAddress(newBillingId)
      return
    }

    const prevBillingId = billingAddress
    setBillingAddress(newBillingId)

    // Cambiar el anterior a false, si existe
    if (prevBillingId && prevBillingId !== newBillingId) {
      upsertChange({
        type: 'modifyAddress',
        id: prevBillingId,
        data: { ...addresses.find(a => a.id === prevBillingId), billingAddress: false }
      })
    }

    // Cambiar el nuevo a true
    upsertChange({
      type: 'modifyAddress',
      id: newBillingId,
      data: { ...addresses.find(a => a.id === newBillingId), billingAddress: true }
    })
  }

  const handleSetShippingAddress = (newShippingId) => {
    if (!editMode) {
      setShippingAddress(newShippingId)
      return
    }

    const prevShippingId = shippingAddress
    setShippingAddress(newShippingId)

    // Cambiar el anterior a false, si existe
    if (prevShippingId && prevShippingId !== newShippingId) {
      upsertChange({
        type: 'modifyAddress',
        id: prevShippingId,
        data: { ...addresses.find(a => a.id === prevShippingId), shippingAddress: false }
      })
    }

    // Cambiar el nuevo a true
    upsertChange({
      type: 'modifyAddress',
      id: newShippingId,
      data: { ...addresses.find(a => a.id === newShippingId), shippingAddress: true }
    })
  }

  return (
    <div className='lg:px-5'>
      {
        loading.state && <LoadScreenBlur title={loading.title} process={loading.process} />
      }

      <section className='grid grid-cols-12 lg:gap-9 gap-x-0 gap-y-4'>
        <div className='col-span-12 lg:col-span-7 order-2 lg:order-1'>
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
                        <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>
                          {
                            type === 'INDIVIDUAL' ? 'Nombre' : 'Nombre de fantasía'
                          }
                        </FormLabel>
                          
                        <FormControl>
                          <Input
                            id={field.name}
                            placeholder={type === 'INDIVIDUAL' ? 'Juan' : 'FarmaSur'}
                            type='text'
                            {...field}
                            disabled={isSubmitting}
                            onChange={e => {
                              field.onChange(e)
                              handleMainFormChange('name', e.target.value)
                            }}
                          />
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
                        <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>
                          {
                            type === 'INDIVIDUAL' ? 'Apellido' : 'Nombre de la empresa'
                          }
                        </FormLabel>
                          
                        <FormControl>
                          <Input
                            id={field.name}
                            placeholder={type === 'INDIVIDUAL' ? 'Pérez' : 'Laboratorios Farmacéuticos del Sur S.A.'}
                            type='text'
                            {...field}
                            disabled={isSubmitting}
                            onChange={e => {
                              field.onChange(e)
                              handleMainFormChange('lastName', e.target.value)
                            }}
                          />
                        </FormControl>
                          
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-2 row-start-2 col-start-1'>
                  <FormLabel className='font-bold mb-2'>Tipo de cliente</FormLabel>
                      
                  <Select
                    onValueChange={value => {
                      setType(value)
                      handleMainFormChange('type', value)
                    }}
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
                          <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>DNI</FormLabel>
                            
                          <FormControl>
                            <Input
                              id={field.name}
                              placeholder='12345678'
                              type='text'
                              {...field}
                              disabled={isSubmitting}
                              onChange={e => {
                                field.onChange(e)
                                handleMainFormChange('DNI', e.target.value)
                              }}
                            />
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
                          <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full'>CUIT</FormLabel>

                          <FormControl>
                            <Input
                              id={field.name}
                              placeholder='20123456785'
                              type='text'
                              {...field}
                              disabled={isSubmitting}
                              onChange={e => {
                                field.onChange(e)
                                handleMainFormChange('CUIT', e.target.value)
                              }}
                            />
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
                        <FormLabel htmlFor={field.name} className='inline-block font-bold text-nowrap truncate max-w-full min-h-3.5'>Nota</FormLabel>
                          
                        <FormControl>
                          <Textarea
                            className='h-full resize-none'
                            id={field.name}
                            placeholder='Nota de recordatorio'
                            type='text'
                            {...field}
                            disabled={isSubmitting}
                            onChange={e => {
                              field.onChange(e)
                              handleMainFormChange('note', e.target.value)
                            }}
                          />
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

        <Card className='col-span-12 lg:col-span-5 order-1 lg:order-2'>
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

        <div className='col-span-12 lg:col-span-6 order-3'>
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
                <DialogTitle>{defaultContactForm?.id ? 'Editar Contacto' : 'Agregar Contacto'}</DialogTitle>
                <DialogDescription>
                  Con los switches puedes seleccionar el método principal de este contacto.
                </DialogDescription>
              </DialogHeader>

              <ContactForm handleSubmit={addContact} defaultValues={defaultContactForm} />
            </DialogContent>
          </Dialog>

          <ScrollArea className='w-full h-[250px] pr-5' id='contacts-scroll-area'>

            {contacts.length === 0 ? (
              <div className='w-full h-full flex flex-col items-center justify-center mt-13'>
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
                        handleSetPrimaryContact(contact.id)
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
                      onClick={() => handleDeleteContact(contact)}
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

        <div className='col-span-12 lg:col-span-6 order-4'>
          <Dialog open={openDir} onOpenChange={setOpenDir}>
            <div className='flex flex-col'>
              <header className='flex justify-between items-center mb-5'>
                <h3 className='text-2xl font-bold'>Direcciones</h3>
                
                <DialogTrigger asChild>
                  <Button className='font-bold hover:cursor-pointer' variant='outline' onClick={() => setDefaultAddressForm({})}>
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
                {/* <DialogDescription>
                    Puedes rellenar primero el campo "Dirección" para obtener un autocompletado con google.
                </DialogDescription> */}
              </DialogHeader>

              <AddAddress submit={addAddress} defaultValues={defaultAddressForm} />
            </DialogContent>
          </Dialog>

          <ScrollArea className='flex flex-col gap-3 h-[250px] overflow-y-auto pr-2' id='addresses-scroll-area'>

            {addresses.length === 0 ? (
              <div className='w-full h-full flex flex-col items-center justify-center mt-13'>
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
                      onClick={() => handleSetShippingAddress(address.id)}
                      className='hover:cursor-pointer ml-auto opacity-70 hover:opacity-100 hover:text-green-500 transition-opacity duration-200'
                    >
                      <Truck className={`w-5 h-5 ${shippingAddress === address.id ? 'fill-green-500 stroke-green-700' : ''}`} />
                    </button>
                    <button
                      type='button'
                      onClick={() => handleSetBillingAddress(address.id)}
                      className='hover:cursor-pointer ml-auto opacity-70 hover:opacity-100 hover:text-blue-400 transition-opacity duration-200'
                    >
                      <FileText className={`w-5 h-5 ${billingAddress === address.id ? 'fill-blue-400 stroke-blue-800' : ''}`} />
                    </button>
                    <button
                      type='button'
                      onClick={() => {
                        setDefaultAddressForm(address)
                        setOpenDir(true)
                      }}
                      className='hover:text-blue-500 hover:cursor-pointer ml-auto transition-colors duration-200'
                    >
                      <Pencil className='w-4 h-4' />
                    </button>
                    <button
                      type='button'
                      onClick={() => handleDeleteAddress(address)}
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
