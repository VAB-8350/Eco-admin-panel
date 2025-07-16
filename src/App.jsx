import { ThemeProvider } from '@/components/theme-provider'
import Router from '@/Router/Router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='eco-admin-panel-ui-theme'>
        <Toaster />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App