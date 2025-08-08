import { useState } from 'react'
import ClientForm from '@/components/MyComponents/ClientForm/ClientForm'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog } from '@/components/ui/dialog'

// ! se debe reemplazar esto con la informacion para este usuario traida desde el back
import { data } from '@/Helpers/ClientMockData'
const defaultVal = data[0]

export default function EditClients() {

  // Local State
  const [open, setOpen] = useState()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <main className='h-[calc(100vh-180px)]'>
        <header className='flex justify-between flex-row gap-5 h-[10%] lg:h-[15%]'>
          <h1 className='text-4xl font-bold'>Editar Cliente</h1>
        </header>

        <ScrollArea className='flex flex-col w-full mx-auto overflow-hidden h-[90%]'>
          <ClientForm setOpen={setOpen} defaultValues={defaultVal} />

          <span className='inline-block w-full h-10 bg-linear-to-b from-transparent to-[var(--background)] position absolute bottom-0' />
          <span className='inline-block h-10'/>
        </ScrollArea>
      </main>
    </Dialog>
  )
}
