import BigTable from '@/components/MyComponents/BigTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Pencil, UserRoundX } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Clients() {

  const columns = [
    {
      header: 'Nombre',
      accessorKey: 'name',
      enableSorting: false,
    },
    {
      header: 'Apellido',
      accessorKey: 'lastName',
      enableSorting: false,
    },
    {
      header: 'Email',
      accessorKey: 'email',
      enableSorting: false,
    },
    {
      header: 'DNI',
      accessorKey: 'DNI',
      enableSorting: false,
      size: 100,
    },
    {
      header: 'Phone',
      accessorKey: 'phone',
      enableSorting: false,
      size: 100,
      cell: ({ row: { original } }) => (
        <p>{original.phones.find(p => p.primary).number}</p>
      )
    },
    {
      header: 'Acciones',
      enableSorting: false,
      size: 55,
      cell: ({ row: { original } }) => (
        <div className='flex items-center gap-4 justify-end'>
          <Link className='hover:text-blue-500 duration-300 outline-none hover:cursor-pointer p-1' to={`/edit-client/${original.id}`}>
            <Pencil width={17} height={17} />
          </Link>

          <button className='text-red-500 outline-none hover:opacity-50 duration-300 hover:cursor-pointer p-1' onClick={() => removeClient(original)}>
            <UserRoundX width={17} height={17} />
          </button>
        </div>
      )
    }
  ]

  const data = [
    {
      id: '123asdf123',
      name: 'Andres',
      lastName: 'Barilin',
      Email: '41815998',
      DNI: '41815998',
      email: 'algo@algol.com',
      phones: [
        {
          number: '123123123',
          primary: true
        },
        {
          number: '123123123',
          primary: false
        }
      ],
      note: 'algo que va en la nota',
      addresses: [
        {
          name: 'Casa',
          address: 'asdf 123',
          country: 'argentina',
          region: 'cordoba',
          city: 'Rio Cuarto',
          zip: '1234'
        },
        {
          name: 'Casa',
          address: 'asdf 123',
          country: 'argentina',
          region: 'cordoba',
          city: 'Rio Cuarto',
          zip: '1234'
        }
      ]
    }
  ]

  // Methods
  const removeClient = (client) => {
    const res = confirm(`estas seguro que deseas eliminar a ${client.name} de los clientes?`)
    console.log(res)
  }

  return (
    <main className='h-[calc(100vh-180px)]'>
      <header className='flex justify-between flex-row gap-5 h-[10%] lg:h-[15%]'>
        <h1 className='text-4xl font-bold'>Clientes</h1>

        <Button className='font-bold' asChild>
          <Link to='/add-client'>
            <span className='hidden lg:inline-block'>Cargar Cliente</span>
            <span className='inline-block lg:hidden'><Plus className='stroke-3' /></span>
          </Link>
        </Button>
      </header>

      <section className='flex flex-col w-full mx-auto overflow-hidden h-[90%]'>
        <div className='flex justify-center mb-2.5'>
          <div className='w-1/2 max-w-[400px] relative flex items-center'>
            <Input type='text' placeHolder='Buscar' className='w-full' />
            <Search className='absolute right-3 w-4 h-4 stroke-[var(--primary)]/50' />
          </div>
        </div>

        <BigTable
          columns={columns}
          data={data}
          // isLoading={isLoading || isRefetching}
          hoverRow
          // enableLazyLoad={!isRefetching && hasNextPage}
          // loadingLazyLoad={hasNextPage && isFetchingNextPage}
          // handleLazyLoad={fetchNextPage}
        />
      </section>
    </main>
  )
}
