import { Ban } from 'lucide-react'

export default function ErrorMessage({ message }) {
  return (
    <div className='w-full flex flex-col items-center justify-center gap-2.5 mt-10'>
      <Ban className='w-10 h-10' />
      <h3 className='text-xl'>Ups! Hubo un error al cargar los datos...</h3>
      <span className='text-red-500 text-sm'>{message}</span>
    </div>
  )
}
