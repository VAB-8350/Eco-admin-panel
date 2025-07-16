import { Check, X, Loader, TriangleAlert } from 'lucide-react'

export default function SimpleToast({ message, state }) {
  return (
    <div className='flex items-center gap-2'>
      {state === 'success' && <Check className='stroke-green-500 dark:stroke-green-400' />}
      {state === 'error' && <X className='stroke-red-500 dark:stroke-red-400' />}
      {state === 'loading' && <Loader className='stroke-[--border] animate-spin' />}
      {state === 'warning' && <TriangleAlert className='stroke-yellow-500 dark:stroke-yellow-400' />}

      <h4>{message}</h4>
    </div>
  )
}
