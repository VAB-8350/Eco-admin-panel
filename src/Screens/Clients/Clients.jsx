import BigTable from '@/components/MyComponents/BigTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Clients() {

  const columns = [
    {
      header: 'Nombre',
      accessorKey: 'firstName',
      enableSorting: false,
    },
    {
      header: 'Apellido',
      accessorKey: 'lastName',
      enableSorting: false,
    },
    {
      header: 'email',
      accessorKey: 'email',
      enableSorting: false,
    },
    {
      header: 'Ultima compra',
      accessorKey: 'lastBuy',
      enableSorting: false,
    },
    {
      header: 'Gastado el ultimo año',
      accessorKey: 'pay',
      enableSorting: false,
    }
  ]

  const data = [
    {
      firstName: 'Andres',
      lastName: 'Barilin',
      email: 'algo@algol.com',
      lastBuy: '12 jul 2024',
      pay: '$123.456'
    },
    {
      firstName: 'Andres',
      lastName: 'Barilin',
      email: 'algo@algol.com',
      lastBuy: '12 jul 2024',
      pay: '$123.456'
    },
    {
      firstName: 'Andres',
      lastName: 'Barilin',
      email: 'algo@algol.com',
      lastBuy: '12 jul 2024',
      pay: '$123.456'
    },
    {
      firstName: 'Andres',
      lastName: 'Barilin',
      email: 'algo@algol.com',
      lastBuy: '12 jul 2024',
      pay: '$123.456'
    },
    {
      firstName: 'Andres',
      lastName: 'Barilin',
      email: 'algo@algol.com',
      lastBuy: '12 jul 2024',
      pay: '$123.456'
    },
    {
      firstName: 'Andres',
      lastName: 'Barilin',
      email: 'algo@algol.com',
      lastBuy: '12 jul 2024',
      pay: '$123.456'
    },
    {
      firstName: 'Andres',
      lastName: 'Barilin',
      email: 'algo@algol.com',
      lastBuy: '12 jul 2024',
      pay: '$123.456'
    },
    {
      firstName: 'Andres',
      lastName: 'Barilin',
      email: 'algo@algol.com',
      lastBuy: '12 jul 2024',
      pay: '$123.456'
    },
    {
      firstName: 'Andres',
      lastName: 'Barilin',
      email: 'algo@algol.com',
      lastBuy: '12 jul 2024',
      pay: '$123.456'
    },
    {
      firstName: 'Andres',
      lastName: 'Barilin',
      email: 'algo@algol.com',
      lastBuy: '12 jul 2024',
      pay: '$123.456'
    },
    {
      firstName: 'Andres',
      lastName: 'Barilin',
      email: 'algo@algol.com',
      lastBuy: '12 jul 2024',
      pay: '$123.456'
    },
    {
      firstName: 'Andres',
      lastName: 'Barilin',
      email: 'algo@algol.com',
      lastBuy: '12 jul 2024',
      pay: '$123.456'
    },
    {
      firstName: 'Andres',
      lastName: 'Barilin',
      email: 'algo@algol.com',
      lastBuy: '12 jul 2024',
      pay: '$123.456'
    },
    {
      firstName: 'Andres',
      lastName: 'Barilin',
      email: 'algo@algol.com',
      lastBuy: '12 jul 2024',
      pay: '$123.456'
    },
    {
      firstName: 'Andres',
      lastName: 'Barilin',
      email: 'algo@algol.com',
      lastBuy: '12 jul 2024',
      pay: '$123.456'
    },
  ]

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
