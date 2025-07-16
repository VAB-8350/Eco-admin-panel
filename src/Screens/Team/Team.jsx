import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Pencil, Trash2, UserRoundX, Ban, UserRound } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'

import AdminForm from './Components/AdminForm/AdminForm'
import BigTable from '@/components/MyComponents/BigTable'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { adminFormat } from '@/Helpers/adminFormat'
import { roleColors } from '@/Helpers/roles'
import { useIsMobile } from '@/hooks/use-mobile'
import { useEffect } from 'react'

const defaultVal = {
  firstName: '',
  lastName: '',
  email: '',
  role: 'admin',
}

export default function Team() {

  const isMobile = useIsMobile()
  const axiosPrivate = useAxiosPrivate()
  const { data, isLoading, isRefetching, isError, refetch } = useQuery({

    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axiosPrivate.get('/users')
      return data
    },
  })

  // Local State
  const [open, setOpen] = useState()
  const [showBans, setShowBans] = useState(false)
  const [initialValue, setInitialValue] = useState(defaultVal)
  const [columns, setColumns] = useState([])


  const columnsBase = [
    {
      header: 'Nombre',
      accessorKey: 'firstName',
      enableSorting: false,
      size: 100
    },
    {
      header: 'Apellido',
      accessorKey: 'lastName',
      enableSorting: false,
      size: 100
    },
    {
      header: 'Email',
      accessorKey: 'primaryEmailAddress',
      enableSorting: false,
    },
    {
      header: 'Rol',
      accessorKey: 'publicMetadata.role',
      enableSorting: false,
      size: 100,
      cell: ({ getValue }) => (
        <span className={`${roleColors[getValue()]} px-2 rounded-full text-white font-bold text-sm`}>
          {adminFormat(getValue())}
        </span>
      )
    },
    {
      header: 'Accion',
      enableSorting: false,
      size: 55,
      cell: ({ row: { original } }) => (
        <div className='flex items-center gap-4 justify-end'>
          <button className='hover:text-blue-500 duration-300 outline-none' onClick={() => modifyUser(original)}>
            <Pencil width={17} height={17} />
          </button>

          <button className='text-red-500 outline-none hover:opacity-50 duration-300' onClick={() => console.log('delete:', original.id)}>
            <Trash2 width={17} height={17} />
          </button>
        </div>
      )
    }
  ]

  useEffect(() => {
    if (isMobile) {
      const removeColumns = ['firstName', 'lastName', 'publicMetadata.role']
      const newColumns = columnsBase.filter(col => !removeColumns.includes(col.accessorKey))
      setColumns(newColumns)
    } else setColumns(columnsBase)
  }, [isMobile])

  // Methods
  const modifyUser = (original) => {

    const body = {
      id: original.clerkId,
      firstName: original.firstName,
      lastName: original.lastName,
      email: original.primaryEmailAddress,
      role: original.publicMetadata.role,
    }
    setInitialValue(body)
    setOpen(true)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <header className='flex justify-between items-center'>
        <h1 className='text-4xl font-bold'>Equipo</h1>
        <div className='flex items-center gap-2'>
          {
            // data?.length > 0 &&
            (
              showBans
                ? <Button disabled={isLoading} onClick={() => setShowBans(false)} variant='outline'><UserRound className='fill-green-500 dark:fill-green-400' />Equipo</Button>
                : <Button disabled={isLoading} onClick={() => setShowBans(true)} variant='outline'><UserRoundX className='stroke-red-500 dark:stroke-red-400' />Baneados</Button>
            )
          }

          <DialogTrigger asChild>
            <Button className='font-bold' onClick={() => setInitialValue(defaultVal)}>Agregar un admin</Button>
          </DialogTrigger>
        </div>

        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Agregar Admin</DialogTitle>
            <DialogDescription>
              Los Admin tienen permisos para administrar el sitio, y los admin pueden modificar los admins.
            </DialogDescription>
          </DialogHeader>

          <AdminForm initialVal={initialValue} setOpen={setOpen} refetch={refetch} />
        </DialogContent>
      </header>

      <div className='flex w-full  mx-auto overflow-hidden mt-20'>
        {
          isError &&
          <div className='w-full flex flex-col items-center justify-center gap-2.5 mt-10'>
            <Ban className='w-10 h-10' />
            <h3 className='text-xl'>Ups! Hubo un error al cargar los datos...</h3>
          </div>
        }
        {
          !isError &&
          <BigTable
            className='max-h-[500px]'
            columns={columns}
            data={data}
            isLoading={isLoading || isRefetching}
            hoverRow
            // enableLazyLoad={!isRefetching && hasNextPage}
            // loadingLazyLoad={hasNextPage && isFetchingNextPage}
            // handleLazyLoad={fetchNextPage}
          />
        }
      </div>
    </Dialog>
  )
}
