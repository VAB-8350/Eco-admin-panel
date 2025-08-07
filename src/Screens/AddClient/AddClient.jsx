import ClientForm from '@/components/MyComponents/ClientForm/ClientForm'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Save, X } from 'lucide-react'

export default function AddCients() {

  const goBack = () => {
    const res = confirm('¿Estás seguro que deseas salir? Se perderán los cambios no guardados.')
    res && window.history.back()
  }

  return (
    <main className='h-[calc(100vh-180px)]'>
      <header className='flex justify-between flex-row gap-5 h-[10%] lg:h-[15%] px-5'>
        <h1 className='text-4xl font-bold'>Cargar Cliente</h1>

        <div className='flex gap-3'>
          <Button type='button' className='font-bold w-fit text-md hover:cursor-pointer' form='client-form' variant='outline' asChild>
            <button onClick={goBack} className='flex items-center gap-2'>
              <X />
              Cancelar
            </button>
          </Button>
          <Button type='submit' className='font-bold w-fit text-md hover:cursor-pointer' form='client-form'>
            <Save />
            Guardar cliente
          </Button>
        </div>
      </header>

      <ScrollArea className='flex flex-col w-full mx-auto overflow-hidden h-[90%]'>
        <ClientForm />

        <span className='inline-block w-full h-10 bg-linear-to-b from-transparent to-[var(--background)] position absolute bottom-0' />
        <span className='inline-block h-10'/>
      </ScrollArea>
    </main>
  )
}
