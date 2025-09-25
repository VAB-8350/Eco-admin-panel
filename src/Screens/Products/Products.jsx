import { Search, Plus, Pencil, Trash, Blocks } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import BigTable from '@/components/MyComponents/BigTable'
import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import ErrorMessage from '@/components/MyComponents/ErrorMessage'

export default function Products() {

  const axiosPrivate = useAxiosPrivate()
  const { data: products, isLoading, isRefetching, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axiosPrivate.get('/v1/inventory/items')
      return data
    },
  })

  const columns = [
    {
      header: 'Nombre',
      accessorKey: 'itemName',
      enableSorting: false,
      size: '30%'
    },
    {
      header: 'SKU',
      accessorKey: 'sku',
      enableSorting: false,
      size: '100%'
    },
    {
      header: 'Actions',
      enableSorting: false,
      size: 100,
      cell: ({ row: { original } }) => (
        <>
          <Link to={`/lot/${original.stockItemId}`} className='hover:text-blue-500 duration-300 outline-none hover:cursor-pointer p-1' onClick={() => console.log(original.stockItemId)} title='Lotes del producto'>
            <Blocks className='w-4 h-4' />
          </Link>

          <Link to={`/edit-product/${original.itemId}`} className='hover:text-blue-500 duration-300 outline-none hover:cursor-pointer p-1' onClick={() => console.log(original.itemId)}>
            <Pencil className='w-4 h-4' />
          </Link>

          <button onClick={() => console.log(original.itemId)} title='Eliminar cliente' className='text-red-500/50 hover:text-red-500 duration-300 outline-none hover:cursor-pointer p-1'>
            <Trash className='w-4 h-4' />
          </button>
        </>
      )
    }
  ]

  return (
    <main className='h-[calc(100vh-180px)]'>
      <header className='flex justify-between flex-row gap-5 h-[10%] lg:h-[15%]'>
        <h1 className='text-2xl lg:text-4xl font-bold'>Productos</h1>

        <Button className='font-bold' asChild>
          <Link to='/add-product'>
            <span className='hidden lg:inline-block'>Cargar Producto</span>
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
            data={products?.content || []}
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
