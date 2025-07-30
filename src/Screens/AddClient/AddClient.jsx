import { useState } from 'react'
import ClientForm from './ClientForm/ClientForm'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
} from '@/components/ui/dialog'

export default function AddCients() {

  // Local State
  const [open, setOpen] = useState()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <main className='h-[calc(100vh-180px)]'>
        <header className='flex justify-between flex-row gap-5 h-[10%] lg:h-[15%]'>
          <h1 className='text-4xl font-bold'>Cargar Cliente</h1>
        </header>

        <ScrollArea className='flex flex-col w-full mx-auto overflow-hidden h-[90%]'>
          <ClientForm setOpen={setOpen} />

          <span className='inline-block w-full h-10 bg-linear-to-b from-transparent to-[var(--background)] position absolute bottom-0' />
          <span className='inline-block h-10'/>
        </ScrollArea>
      </main>
    </Dialog>
  )
}
