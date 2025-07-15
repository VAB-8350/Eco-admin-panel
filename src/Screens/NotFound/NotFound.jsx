import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Home, ArrowLeft, FileQuestion } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-background'>
      <div className='w-full max-w-2xl mx-auto'>
        <Card className='border-2 border-dashed border-muted-foreground/25'>
          <CardContent className='p-8 md:p-12 text-center space-y-8'>
            {/* Icon and 404 */}
            <div className='space-y-4'>
              <div className='mx-auto w-20 h-20 rounded-full bg-muted flex items-center justify-center'>
                <FileQuestion className='w-10 h-10 text-muted-foreground' />
              </div>
              <div className='space-y-2'>
                <h1 className='text-6xl md:text-7xl font-bold text-muted-foreground/50'>404</h1>
                <h2 className='text-2xl md:text-3xl font-semibold tracking-tight'>Página no encontrada</h2>
              </div>
            </div>

            <Separator className='my-6' />

            {/* Description */}
            <div className='space-y-4'>
              <p className='text-lg text-muted-foreground max-w-md mx-auto'>
                Lo sentimos, no pudimos encontrar la página que estás buscando. Verifica la URL o regresa al inicio.
              </p>
            </div>

            {/* Action buttons */}
            <div className='flex flex-col sm:flex-row gap-3 justify-center'>
              <Button asChild size='lg' className='min-w-[140px]'>
                <Link to='/' className='flex items-center space-x-2'>
                  <Home className='w-4 h-4' />
                  <span>Ir al inicio</span>
                </Link>
              </Button>

              <Button variant='outline' size='lg' onClick={() => window.history.back()} className='min-w-[140px]'>
                <ArrowLeft className='w-4 h-4 mr-2' />
                Volver atrás
              </Button>
            </div>

            {/* Footer */}
            <div className='pt-4 border-t border-border'>
              <p className='text-sm text-muted-foreground'>Error 404 • Recurso no disponible</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
