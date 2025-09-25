import { Search, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import BigTable from '@/components/MyComponents/BigTable'
import { Pencil, Trash } from 'lucide-react'
import { useQuery, useMutation } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import ErrorMessage from '@/components/MyComponents/ErrorMessage'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export default function MasterProducts() {

  // Hooks
  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate()
  const { data: masterProducts, isLoading, refetch, isRefetching, isError, error } = useQuery({
    queryKey: ['masterProducts'],
    queryFn: async () => {
      const { data } = await axiosPrivate.get('/v1/inventory/master-products')
      return data
    },
  })

  const deleteMasterProductMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosPrivate.delete(`/v1/inventory/master-products/${id}/discard`)
      return data
    },
    onSuccess: () => {
      toast(<SimpleToast message='Producto maestro eliminado correctamente' state='success' />)
      refetch()
    },
    onError: () => {
      toast(<SimpleToast message='Error al eliminar el producto maestro' state='error' />)
    }
  })

  const lockMasterProduct = useMutation({
    mutationFn: async (id) => {
      try {
        return  await axiosPrivate.post(`/v1/inventory/master-products/${id}/lock`)
      } catch {
        return false
      }
    },
  })

  const handleDelete = (id) => {
    const confirm = window.confirm('¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.')
    if (confirm) deleteMasterProductMutation.mutate(id)
  }

  const handleEdit = async (id) => {
    document.body.style.cursor = 'wait'
    const res = await lockMasterProduct.mutateAsync(id)
    document.body.style.cursor = 'default'

    if (res) {
      navigate(`/edit-master-product/${id}`, { state: { lock: res.data } })
    } else {
      toast(<SimpleToast message='Error al obtener el producto maestro' state='error' />)
    }
  }

  const columns = [
    {
      header: 'Nombre',
      accessorKey: 'masterName',
      enableSorting: false,
      size: 300
    },
    {
      header: 'Descripción',
      accessorKey: 'description',
      enableSorting: false,
      size: '100%'
    },
    {
      header: 'Actions',
      enableSorting: false,
      cell: ({ row: { original } }) => (
        <div className='flex items-center gap-2 justify-end'>
          <button className='hover:text-blue-500 duration-300 outline-none hover:cursor-pointer p-1' onClick={() => handleEdit(original.masterProductId)}>
            <Pencil className='w-4 h-4' />
          </button>

          {/* <button onClick={() => handleDelete(original.masterProductId)} title='Eliminar cliente' className='text-red-500/50 hover:text-red-500 duration-300 outline-none hover:cursor-pointer p-1'>
            <Trash className='w-4 h-4' />
          </button> */}
        </div>
      )
    }
  ]

  return (
    <main className='h-[calc(100vh-180px)]'>
      <header className='flex justify-between flex-row gap-5 h-[10%] lg:h-[15%]'>
        <h1 className='text-2xl lg:text-4xl font-bold'>Productos Maestro</h1>

        <Button className='font-bold' asChild>
          <Link to='/add-master-product'>
            <span className='hidden lg:inline-block'>Cargar Producto Maestro</span>
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
            data={masterProducts?.content || []}
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
