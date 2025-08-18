import { useState, useEffect } from 'react'
import ClientForm from '@/components/MyComponents/ClientForm/ClientForm'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog } from '@/components/ui/dialog'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Save, X } from 'lucide-react'

export default function EditClients() {
  
  const { id } = useParams()

  //Hooks
  const axiosPrivate = useAxiosPrivate()
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(`/customers/${id}`)
      return data
    },
    cacheTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    enabled: !!id,
  })

  const discardClientMutation = useMutation({
    mutationFn: async (clientId) => {
      try {
        return await axiosPrivate.post(`/customers/${clientId}/session/discard`)
      } catch {
        return false
      }
    },
  })

  // Local State
  const [open, setOpen] = useState()
  const [defaultVal, setDefaultVal] = useState(null)

  useEffect(() => {

    if (data && !isLoading && !isFetching) {
      // parsed data
      const body = {
        id: data.id,
        name: data.customerDetails.firstName ?? data.customerDetails.fantasyName,
        lastName: data.customerDetails.firstSurname ?? data.customerDetails.companyName,
        DNI: data.identificationNumber,
        note: data.internalNotes.metadata,
        type: data.customerType,
        preferences: data.preferences,
        addresses: data.addresses.map(address => ({
          id: address.uuid,
          place: address.addressType,
          address: address.street,
          city: address.city,
          region: address.stateProvince,
          country: address.countryCode,
          zip: address.zipCode,
          isPrimary: address.isPrimary,
          dpto: address.additionalInfo,
          note: address.internalNotes.metadata,
        })),
        contacts: data.contacts.map(contact => ({
          id: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          role: contact.role,
          type: contact.type,
          primary: contact.isPrimary,
          internalNotes: contact.internalNotes,
          contactMethods: contact.contactMethods.map(method => ({
            id: method.uuid,
            type: method.type,
            value: method.value,
            primary: method.isPrimary
          })),
        }))
      }

      setDefaultVal(body)
    }

  }, [data, isLoading, isFetching])

  const goBack = async () => {
    const res = confirm('¿Estás seguro que deseas salir? Se perderán los cambios no guardados.')
    if (res) {
      document.body.style.cursor = 'wait'
      await discardClientMutation.mutateAsync(id)
      document.body.style.cursor = 'default'
      window.history.back()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <main className='h-[calc(100vh-180px)]'>
        <header className='flex justify-between flex-row gap-5 h-[10%] lg:h-[15%]'>
          <h1 className='text-2xl lg:text-4xl font-bold'>Editar Cliente</h1>

          <div className='flex gap-3'>
            <Button type='button' className='font-bold w-fit text-md hover:cursor-pointer' form='client-form' variant='outline' asChild>
              <button onClick={goBack} className='flex items-center gap-2'>
                <X />
                Cancelar
              </button>
            </Button>
            <Button type='submit' className='font-bold w-fit text-md hover:cursor-pointer' form='client-form'>
              <Save />
              Guardar cliente
            </Button>
          </div>
        </header>

        <ScrollArea className='flex flex-col w-full mx-auto overflow-hidden h-[90%]'>
          {
            (defaultVal && !isError && !isLoading && !isFetching) &&
            <ClientForm setOpen={setOpen} defaultValues={defaultVal} editMode />
          }
          {
            (!isLoading && isError) && <p>Error al cargar los datos del cliente</p>
          }
          {
            (isLoading || isFetching) &&
            <div className='grid grid-cols-12 h-full gap-9'>
              <span className='animate-pulse bg-muted h-[300px] rounded col-span-7' />
              <span className='animate-pulse bg-muted h-[300px] rounded col-span-5' />
              <span className='animate-pulse bg-muted h-[300px] rounded col-span-6' />
              <span className='animate-pulse bg-muted h-[300px] rounded col-span-6' />
            </div>
          }

          <span className='inline-block w-full h-10 bg-linear-to-b from-transparent to-[var(--background)] position absolute bottom-0' />
          <span className='inline-block h-10'/>
        </ScrollArea>
      </main>
    </Dialog>
  )
}
