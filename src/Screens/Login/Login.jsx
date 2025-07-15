import { SignIn, useUser } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'
import { dark } from '@clerk/themes'
import { useTheme } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'

export default function Login() {
  const { isSignedIn } = useUser()
  const { theme } = useTheme()

  if (isSignedIn) {
    return <Navigate to='/dashboard' />
  }

  return (
    <main className='grid place-content-center w-vw h-vh h-dvh'>
      <SignIn appearance={theme === 'dark' ? dark : {}}/>
      <footer className='flex absolute bottom-10 right-10'>
        <div className='w-[150px]'>
          <ModeToggle />
        </div>
      </footer>
    </main>
  )
}
