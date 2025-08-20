import BigTable from '@/components/MyComponents/BigTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Pencil, UserRound, Factory, Mail, Copy, Trash } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import SimpleToast from '@/components/MyComponents/SimpleToast'
import { Badge } from '@/components/ui/badge'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useQuery, useMutation } from '@tanstack/react-query'
import ErrorMessage from '@/components/MyComponents/ErrorMessage'
import { useNavigate } from 'react-router-dom'

export default function Clients() {

  //Hooks
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const { data, isLoading, isRefetching, isError, refetch, error } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data } = await axiosPrivate.get('/customers')
      return data
    },
  })

  const deleteClientMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosPrivate.delete(`/customers/${id}`)
      return data
    },
    onSuccess: () => {
      toast(<SimpleToast message='Cliente eliminado correctamente' state='success' />)
      refetch()
    },
    onError: () => {
      toast(<SimpleToast message='Error al eliminar el cliente' state='error' />)
    }
  })

  const EditClient = useMutation({
    mutationFn: async (id) => {
      try {
        return  await axiosPrivate.post(`/customers/${id}/session/lock`)
      } catch {
        return false
      }
    },
  })

  const handleDelete = (id) => {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.')
    if (confirm) deleteClientMutation.mutate(id)
  }

  const handleEdit = async (id) => {
    document.body.style.cursor = 'wait'
    const res = await EditClient.mutateAsync(id)
    document.body.style.cursor = 'default'

    if (res) {
      navigate(`/edit-client/${id}`, { state: { lock: res.data } })
    } else {
      toast(<SimpleToast message='Error al obtener el cliente' state='error' />)
    }
  }

  const columns = [
    {
      header: 'Tipo',
      accessorKey: 'customerType',
      enableSorting: false,
      size: 105,
      cell: ({ row: { original } }) => (
        original.customerType === 'INDIVIDUAL'
          ? <Badge variant='outline' className=''><UserRound className=' stroke-sky-500' /> Persona</Badge>
          : <Badge variant='outline' className=''><Factory className='stroke-purple-600' /> Empresa</Badge>
      )
    },
    {
      header: 'Nombre',
      enableSorting: false,
      size: 100,
      cell: ({ row: { original } }) => (
        original.customerDetails.firstName ?? original.customerDetails.fantasyName
      )
    },
    {
      header: 'Apellido',
      enableSorting: false,
      cell: ({ row: { original } }) => (
        original.customerDetails.firstSurname ?? original.customerDetails.companyName
      )
    },
    {
      header: 'Contacto principal',
      enableSorting: false,
      cell: ({ row: { original } }) => {
        const primaryContact = original.contacts.find(c => c.isPrimary)
        const contactMethod = primaryContact?.contactMethods.find(cm => cm.isPrimary) ?? primaryContact?.contactMethods[0]

        const handleCopy = () => {
          if (contactMethod) {
            navigator.clipboard.writeText(contactMethod.value)
            toast(<SimpleToast message='Email copiado al portapapeles' state='success' />)
          }
        }

        if (!contactMethod) {
          return (
            <div className='text-gray-500 hover:cursor-not-allowed'>Sin contacto</div>
          )
        }

        return (
          <div className='flex gap-1 items-center'>
            <button type='button' title='Copiar email' onClick={handleCopy} className='hover:opacity-100 opacity-50 duration-300 outline-none hover:cursor-pointer'>
              <Copy className='w-4 h-4' />
            </button>
            {
              contactMethod?.type === 'EMAIL' && (
                <a title='Escribir email' href={`mailto:${contactMethod?.value}`} className='hover:opacity-100 opacity-50 duration-300 outline-none hover:cursor-pointer p-1'>
                  <Mail className='w-4 h-4'/>
                </a>
              )
            }
            <button type='button' title='Copiar email' onClick={handleCopy} className='hover:text-green-500 duration-300 outline-none hover:cursor-pointer p-1 underline'>
              {contactMethod?.value}
            </button>
          </div>
        )
      }
    },
    {
      header: 'Dir. Envió',
      enableSorting: false,
      size: 130,
      cell: ({ row: { original } }) => {

        const shippingAddressId = original?.preferences?.default_shipping_address_id
        const address = original.addresses.find(a => a.uuid === shippingAddressId)
        const addressAndDepto = `${address.street}${address.additional_info ? ` - ${address.additional_info}` : ''}`

        const handleCopy = () => {
          if (address) {
            navigator.clipboard.writeText(addressAndDepto)
            toast(<SimpleToast message='Dirección copiada al portapapeles' state='success' />)
          }
        }

        return (
          <button type='button' title='Copiar dirección' onClick={handleCopy} className='hover:text-green-500 duration-300 outline-none hover:cursor-pointer p-1 underline w-full overflow-hidden text-ellipsis text-left'>
            {addressAndDepto}
          </button>
        )
      }
    },
    {
      header: 'Dir. Facturación',
      enableSorting: false,
      size: 130,
      cell: ({ row: { original } }) => {

        const billingAddressId = original?.preferences?.default_billing_address_id
        const address = original.addresses.find(a => a.uuid === billingAddressId)
        const addressAndDepto = `${address.street}${address.additional_info ? ` - ${address.additional_info}` : ''}`

        const handleCopy = () => {
          if (address) {
            navigator.clipboard.writeText(addressAndDepto)
            toast(<SimpleToast message='Dirección copiada al portapapeles' state='success' />)
          }
        }

        return (
          <button type='button' title='Copiar dirección' onClick={handleCopy} className='hover:text-green-500 duration-300 outline-none hover:cursor-pointer p-1 underline w-full overflow-hidden text-ellipsis text-left'>
            {addressAndDepto}
          </button>
        )
      }
    },
    {
      header: 'Acciones',
      enableSorting: false,
      size: 150,
      cell: ({ row: { original } }) => {

        const handleCopy = () => {
          if (original) {
            navigator.clipboard.writeText(JSON.stringify(original))
            toast(<SimpleToast message='Datos copiados al portapapeles' state='success' />)
          }
        }

        return (
          <div className='flex items-center gap-2 justify-end'>
            <button className='hover:text-blue-500 duration-300 outline-none hover:cursor-pointer p-1' onClick={() => handleEdit(original.id)}>
              <Pencil className='w-4 h-4' />
            </button>

            <button onClick={handleCopy} title='Copiar todos los datos del cliente' className='hover:text-green-500 duration-300 outline-none hover:cursor-pointer p-1'>
              <Copy className='w-4 h-4' />
            </button>

            <button onClick={() => handleDelete(original.id)} title='Eliminar cliente' className='text-red-500/50 hover:text-red-500 duration-300 outline-none hover:cursor-pointer p-1'>
              <Trash className='w-4 h-4' />
            </button>
          </div>
        )
      }
    }
  ]

  return (
    <main className='h-[calc(100vh-180px)]'>
      <header className='flex justify-between flex-row gap-5 h-[10%] lg:h-[15%]'>
        <h1 className='text-2xl lg:text-4xl font-bold'>Clientes</h1>

        <Button className='font-bold' asChild>
          <Link to='/add-client'>
            <span className='hidden lg:inline-block'>Cargar Cliente</span>
            <span className='inline-block lg:hidden'><Plus className='stroke-3' /></span>
          </Link>
        </Button>
      </header>

      <section className='flex flex-col w-full mx-auto overflow-hidden h-[90%]'>
        <div className='flex justify-center mb-4 lg:mb-6'>
          <div className='w-1/2 max-w-[400px] relative flex items-center'>
            <Input type='text' placeholder='Buscar' className='w-full' />
            <Search className='absolute right-3 w-4 h-4 stroke-[var(--primary)]/50' />
          </div>
        </div>

        {
          isError && <ErrorMessage message={error.message} />
        }

        {
          !isError &&
          <BigTable
            columns={columns}
            data={data}
            isLoading={isLoading || isRefetching}
            hoverRow
            // enableLazyLoad={!isRefetching && hasNextPage}
            // loadingLazyLoad={hasNextPage && isFetchingNextPage}
            // handleLazyLoad={fetchNextPage}
          />
        }
      </section>
    </main>
  )
}
