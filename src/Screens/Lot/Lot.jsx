import { Search, ArrowLeft, Plus, CircleCheck, CircleX } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import BigTable from '@/components/MyComponents/BigTable'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import ErrorMessage from '@/components/MyComponents/ErrorMessage'

export default function Lot() {
  const { id } = useParams()

  const axiosPrivate = useAxiosPrivate()
  const { data: lots, isLoading, isRefetching, isError, error } = useQuery({
    queryKey: ['lots', id],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(`/v1/inventory/stock-item/${id}/lots`)
      return data
    },
  })

  const columns = [
    {
      header: 'N. Lote',
      accessorKey: 'lotCode',
      enableSorting: false,
    },
    {
      header: 'Cantidad',
      accessorKey: 'currentQuantity',
      enableSorting: false,
    },
    {
      header: 'Perfil',
      accessorKey: 'profile.profileCode',
      enableSorting: false,
    },
    {
      header: 'Costo de unidad',
      accessorKey: 'unitCost',
      enableSorting: false,
    },
    {
      header: 'Origen',
      accessorKey: 'warehouse.warehouseName',
      enableSorting: false,
    },
    {
      header: 'Fecha de creación',
      accessorKey: 'creationDate',
      enableSorting: false,
      cell: ({ row: { original } }) => (
        <span>{new Date(original.creationDate).toLocaleDateString('es-AR')}</span>
      )
    },
    {
      header: 'Estado',
      accessorKey: 'lotStatus',
      enableSorting: false,
      cell: ({ row: { original } }) => (
        <span className={`px-2 py-1 rounded-full text-white text-sm font-semibold ${original.lotStatus === 'ACTIVE' ? 'bg-green-500/80' : 'bg-red-500/80'}`}>
          {
            original.lotStatus === 'ACTIVE'
              ? <div className='flex items-center gap-1'><CircleCheck width={16} height={16} /> Activo</div>
              : <div className='flex items-center gap-1'><CircleX width={16} height={16} /> Inactivo</div>
          }
        </span>
      )
    },
  ]

  return (
    <main className='h-[calc(100vh-180px)]'>
      <header className='flex justify-between flex-row gap-5 h-[10%] lg:h-[15%]'>
        <h1 className='text-2xl lg:text-4xl font-bold'>Nombre del item</h1>

        <div className='flex flex-row gap-2'>
          <Button variant='outline' asChild>
            <Link to='/products' className='font-bold'>
              <ArrowLeft />
              Volver a Productos
            </Link>
          </Button>

          <Button className='font-bold hover:cursor-pointer'>
            <span className='hidden lg:inline-block'>Cargar Lote</span>
            <span className='inline-block lg:hidden'><Plus className='stroke-3' /></span>
          </Button>
        </div>
      </header>

      <section className='flex flex-col w-full mx-auto overflow-hidden h-[90%]'>
        <div className='flex justify-center mb-4 lg:mb-6'>
          <div className='w-1/2 max-w-[400px] relative flex items-center'>
            <Input type='text' placeholder='Buscar' className='w-full' />
            <Search className='absolute right-3 w-4 h-4 stroke-[var(--primary)]/50' />
          </div>

          <Button variant='outline' className='ml-4 font-bold hover:cursor-pointer'>
            Agrupar por Perfil
          </Button>
        </div>

        {
          isError && <ErrorMessage message={error.message} />
        }

        {
          !isError &&
          <BigTable
            columns={columns}
            data={lots?.content || []}
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
