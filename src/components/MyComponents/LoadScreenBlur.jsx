import { Loader } from 'lucide-react'

export default function LoadScreenBlur({ title, process }) {
  return (
    <div className='fixed inset-0 bg-[var(--background)]/50 backdrop-blur-sm grid place-items-center z-50'>
      <div className='loader'>
        <h2 className='text-2xl flex items-center gap-2'>
          <span>
            <Loader className='animate-spin' />
          </span>
          {title}
        </h2>

        <p className='text-sm text-center text-[var(--primary)]/70 mt-1'>Por favor, espere mientras se procesa la información.</p>

        {
          process && <span className='text-md'>{process}</span>
        }
      </div>
    </div>
  )
}
