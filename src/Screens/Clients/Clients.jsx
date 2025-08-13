import BigTable from '@/components/MyComponents/BigTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Pencil, UserRound, Factory, Mail, Copy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import SimpleToast from '@/components/MyComponents/SimpleToast'
import { Badge } from '@/components/ui/badge'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useQuery } from '@tanstack/react-query'

export default function Clients() {

  //Hooks
  const axiosPrivate = useAxiosPrivate()
  const { data, isLoading, isRefetching, isError } = useQuery({

    queryKey: ['customers'],
    queryFn: async () => {
      const { data } = await axiosPrivate.get('/customers')
      return data
    },
  })

  console.log(data)

  const columns = [
    {
      header: 'Tipo',
      accessorKey: 'customerType',
      enableSorting: false,
      size: 100,
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
        console.log()

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
      header: 'Direccion',
      enableSorting: false,
      cell: ({ row: { original } }) => {
        const address = original.addresses.find(a => a.isPrimary)
        const addressAndDepto = `${address.street}${address.additional_info ? ` - ${address.additional_info}` : ''}`

        const handleCopy = () => {
          if (address) {
            navigator.clipboard.writeText(addressAndDepto)
            toast(<SimpleToast message='Dirección copiada al portapapeles' state='success' />)
          }
        }

        return (
          <div>
            <button type='button' title='Copiar dirección' onClick={handleCopy} className='hover:text-green-500 duration-300 outline-none hover:cursor-pointer p-1 underline'>
              {addressAndDepto}
            </button>
          </div>
        )
      }
    },
    {
      header: 'Acciones',
      enableSorting: false,
      size: 55,
      cell: ({ row: { original } }) => {

        const handleCopy = () => {
          if (original) {
            navigator.clipboard.writeText(JSON.stringify(original))
            toast(<SimpleToast message='Datos copiados al portapapeles' state='success' />)
          }
        }

        return (
          <div className='flex items-center gap-4 justify-end'>
            <Link className='hover:text-blue-500 duration-300 outline-none hover:cursor-pointer p-1' to={`/edit-client/${original.id}`}>
              <Pencil className='w-4 h-4' />
            </Link>

            <button onClick={handleCopy} title='Copiar todos los datos del cliente' className='hover:text-green-500 duration-300 outline-none hover:cursor-pointer p-1'>
              <Copy className='w-4 h-4' />
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
            <Input type='text' placeHolder='Buscar' className='w-full' />
            <Search className='absolute right-3 w-4 h-4 stroke-[var(--primary)]/50' />
          </div>
        </div>

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
