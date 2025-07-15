import { cn } from '@/lib/utils'

export function SplashScreen() {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col gap-5 items-center justify-center bg-background',
        'animate-in fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        'transition-opacity duration-500'
      )}
    >
      <div className='flex flex-col items-center gap-4'>
        <img
          src='/logo-eco.png'
          alt='Eco Panel Logo'
          className='h-16 w-auto animate-pulse translate-x-3'
        />
      </div>
      <div className='h-1 w-[200px] overflow-hidden rounded-full bg-muted'>
        <div
          className='h-full w-1/2 bg-primary animate-[move-right_1s_ease-in-out_infinite]'
        />
      </div>
    </div>
  )
}