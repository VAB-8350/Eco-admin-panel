import { Search, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import BigTable from '@/components/MyComponents/BigTable'


const data = [
  {
    lote: 12,
    amount: 100,
    profile: 'Perfil 1',
    unitCost: 10,
    origin: 'Origen 1',
    createdAt: '2023-01-01',
    block: false,
  },
  {
    lote: 12,
    amount: 100,
    profile: 'Perfil 1',
    unitCost: 10,
    origin: 'Origen 1',
    createdAt: '2023-01-01',
    block: false,
  },
  {
    lote: 12,
    amount: 100,
    profile: 'Perfil 1',
    unitCost: 10,
    origin: 'Origen 1',
    createdAt: '2023-01-01',
    block: false,
  }
]

export default function Lot() {

  const columns = [
    {
      header: 'N. Lote',
      accessorKey: 'lote',
      enableSorting: false,
    },
    {
      header: 'Cantidad',
      accessorKey: 'amount',
      enableSorting: false,
    },
    {
      header: 'Perfil',
      accessorKey: 'profile',
      enableSorting: false,
    },
    {
      header: 'Costo de unidad',
      accessorKey: 'unitCost',
      enableSorting: false,
    },
    {
      header: 'Origen',
      accessorKey: 'origin',
      enableSorting: false,
    },
    {
      header: 'Fecha de creación',
      accessorKey: 'createdAt',
      enableSorting: false,
    },
    {
      header: 'Bloquear',
      accessorKey: 'block',
      enableSorting: false,
    },
  ]

  return (
    <main className='h-[calc(100vh-180px)]'>
      <header className='flex justify-between flex-row gap-5 h-[10%] lg:h-[15%]'>
        <h1 className='text-2xl lg:text-4xl font-bold'>Nombre del item</h1>

        {/* <Button className='font-bold' asChild>
          <Link to='/add-product'>
            <span className='hidden lg:inline-block'>Cargar Producto</span>
            <span className='inline-block lg:hidden'><Plus className='stroke-3' /></span>
          </Link>
        </Button> */}

        <Button variant='outline' asChild>
          <Link to='/products' className='font-bold'>
            <ArrowLeft />
            Volver a Productos
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
