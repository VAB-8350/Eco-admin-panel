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
import { Pencil, UserRoundX, UsersRound, UserRoundPlus, Plus } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import AdminForm from './Components/AdminForm/AdminForm'
import BigTable from '@/components/MyComponents/BigTable'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { adminFormat } from '@/Helpers/adminFormat'
import { roleColors } from '@/Helpers/roles'
import { useIsMobile } from '@/hooks/use-mobile'
import { useEffect } from 'react'
import ErrorMessage from '@/components/MyComponents/ErrorMessage'
import SimpleToast from '@/components/MyComponents/SimpleToast'

const defaultVal = {
  firstName: '',
  lastName: '',
  email: '',
  role: 'admin',
}

export default function Team() {

  const isMobile = useIsMobile()
  const axiosPrivate = useAxiosPrivate()
  const { data, isLoading, isRefetching, isError, refetch, error } = useQuery({

    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axiosPrivate.get('/users')
      return data
    },
  })

  const banMutation = useMutation({
    mutationFn: async (clerkId) => {
      try {
        return await axiosPrivate.post(`/users/${clerkId}/ban`)
      } catch {
        return false
      }
    }
  })

  const unbanMutation = useMutation({
    mutationFn: async (clerkId) => {
      try {
        return await axiosPrivate.post(`/users/${clerkId}/unban`)
      } catch {
        return false
      }
    }
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
          {
            !showBans
              ?
              <>
                <button className='hover:text-blue-500 duration-300 outline-none hover:cursor-pointer p-1' onClick={() => modifyUser(original)}>
                  <Pencil width={17} height={17} />
                </button>

                <button className='text-red-500 outline-none hover:opacity-50 duration-300 hover:cursor-pointer p-1' onClick={() => banUser(original)}>
                  <UserRoundX width={17} height={17} />
                </button>
              </>
              :
              <button className='hover:text-green-500 duration-300 outline-none hover:cursor-pointer p-1' onClick={() => unbanUser(original)}>
                <UserRoundPlus width={17} height={17} />
              </button>
          }
        </div>
      )
    }
  ]

  // Effects
  useEffect(() => {
    if (isMobile) {
      const removeColumns = ['firstName', 'lastName', 'publicMetadata.role']
      const newColumns = columnsBase.filter(col => !removeColumns.includes(col.accessorKey))
      setColumns(newColumns)
    } else setColumns(columnsBase)
  }, [isMobile, showBans])

  useEffect(() => {
    if (!data?.some(usr => usr.banned === true) && showBans) setShowBans(false)
  }, [data])

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

  const banUser = async (user) => {
    const confirm = window.confirm(`Seguro que deseas banear al usuario ${user.firstName} ${user.lastName}?`)
    
    if (confirm) {
      const res = await banMutation.mutateAsync(user.clerkId)
      
      if (!res) {
        toast(<SimpleToast message='Ups! Ocurrio un error...' state='error' />)
        return
      }

      toast(<SimpleToast message='Usuario banneado!' state='success' />)
      refetch()
    }
  }

  const unbanUser = async (user) => {
    const confirm = window.confirm(`Seguro que reactivar el usuario ${user.firstName} ${user.lastName}?`)
    
    if (confirm) {
      const res = await unbanMutation.mutateAsync(user.clerkId)

      if (!res) {
        toast(<SimpleToast message='Ups! Ocurrio un error...' state='error' />)
        return
      }

      toast(<SimpleToast message='Usuario reactivado!' state='success' />)
      refetch()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <header className='flex justify-between items-center gap-5'>
        <h1 className='text-4xl font-bold text-left w-full'>{showBans ? 'Baneados' : 'Equipo'}</h1>

        <div className='flex items-center gap-2'>
          {
            data?.some(usr => usr.banned === true) &&
            (
              showBans
                ? <Button disabled={isLoading} onClick={() => setShowBans(false)} variant='outline'><UsersRound className='stroke-green-500 dark:stroke-green-400' />Equipo</Button>
                : <Button disabled={isLoading} onClick={() => setShowBans(true)} variant='outline'><UserRoundX className='stroke-red-500 dark:stroke-red-400' />Baneados</Button>
            )
          }

          <DialogTrigger asChild>
            <Button className='font-bold' onClick={() => setInitialValue(defaultVal)}>
              <span className='hidden lg:inline-block'>Agregar un admin</span>
              <span className='inline-block lg:hidden'><Plus className='stroke-3' /></span>
            </Button>
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

      <div className='flex w-full  mx-auto overflow-hidden mt-5 lg:mt-20'>
        {
          isError && <ErrorMessage message={error.message} />
        }
        {
          !isError &&
          <BigTable
            className='max-h-[500px]'
            columns={columns}
            data={data?.filter(usr => usr.banned === showBans)}
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
