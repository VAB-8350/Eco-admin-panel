import { Moon, Sun, Monitor } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant='outline'
      size='icon'
      className='w-full'
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >

      Cambiar tema

      {
        theme === 'system' ? (
          <Monitor className='h-[1.2rem] w-[1.2rem] not-dark:hidden' />
        ) : (
          <>
            <Sun className='h-[1.2rem] w-[1.2rem] dark:hidden' />
            <Moon className='h-[1.2rem] w-[1.2rem] not-dark:hidden' />
          </>
        )
      }
    </Button>
  )
}