import MasterProductForm from '@/components/MyComponents/MasterProductForm/MasterProductForm'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Save, X } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { useNavigate, useParams } from 'react-router-dom'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import useTimer from '@/components/MyComponents/useTimer'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export default function AddMasterProducts() {

  const { id } = useParams()
  const { state } = useLocation()

  // Hooks
  const navigate = useNavigate()
  const removeDecimal = num => String(num).split('.')[0]
  const { timerReset, timerRender } = useTimer({
    seconds: removeDecimal(state.lock.timeRemaining),
    onFinish: () => navigate('/master-products'),
    triggers: [{ at: 60, fn: () => setOpenTimeAlert(true) }]
  })
  const isMobile = useIsMobile()
  const axiosPrivate = useAxiosPrivate()
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(`/v1/inventory/master-products/${id}`)
      return data
    },
    cacheTime: 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    enabled: !!id,
  })

  const discardMasterProductMutation = useMutation({
    mutationFn: async (productId) => {
      try {
        return await axiosPrivate.delete(`/v1/inventory/master-products/${productId}/discard`)
      } catch {
        return false
      }
    },
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

  // Local State
  const [openTimeAlert, setOpenTimeAlert] = useState(false)

  const goBack = async (alert = true) => {
    let res = true
    if (alert) {
      res = confirm('¿Estás seguro que deseas salir? Se perderán los cambios no guardados.')
    }

    if (res) {
      document.body.style.cursor = 'wait'
      await discardMasterProductMutation.mutateAsync(id)
      document.body.style.cursor = 'default'
      window.history.back()
    }
  }

  async function handleContinue() {
    const res = await lockMasterProduct.mutateAsync(id)
    timerReset(removeDecimal(res.data.timeRemaining))
  }

  return (
    <>
      <AlertDialog open={openTimeAlert} onOpenChange={setOpenTimeAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Solo te queda un minuto!</AlertDialogTitle>
            <AlertDialogDescription>
              Si necesitas mas tiempo, puedes continuar editando el cliente o cancelar la edición (si cancelas perderás todos tus cambios).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => goBack(false)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleContinue}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <main className='h-[calc(100vh-180px)]'>
        <header className='flex justify-between flex-row gap-5 h-[10%] lg:h-[15%] px-5'>
          <h1 className='text-2xl lg:text-4xl font-bold'>
            Editar Producto Maestro
          </h1>

          {
            timerRender
          }

          <div className='flex gap-3'>
            <Button type='button' className='font-bold w-fit text-md hover:cursor-pointer' variant='outline' asChild>
              <button onClick={goBack} className='flex items-center gap-2'>
                <X />
                {!isMobile && 'Cancelar'}
              </button>
            </Button>
            <Button type='submit' className='font-bold w-fit text-md hover:cursor-pointer' form='master-product-form'>
              <Save />
              {!isMobile ? 'Guardar cliente' : ''}
            </Button>
          </div>
        </header>

        <ScrollArea className='flex flex-col w-full mx-auto overflow-hidden h-[90%]'>
          {
            (data && !isError && !isLoading && !isFetching) &&
            <MasterProductForm defaultValues={data} />
          }

          <span className='inline-block w-full h-10 bg-linear-to-b from-transparent to-[var(--background)] position absolute bottom-0' />
          <span className='inline-block h-10'/>
        </ScrollArea>
      </main>
    </>
  )
}
