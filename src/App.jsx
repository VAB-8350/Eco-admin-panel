import { ThemeProvider } from '@/components/theme-provider'
import Router from '@/Router/Router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='eco-admin-panel-ui-theme'>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App