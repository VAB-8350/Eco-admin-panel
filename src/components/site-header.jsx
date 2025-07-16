import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useUser } from '@clerk/clerk-react'
import { adminFormat } from '@/Helpers/adminFormat'
import { roleColors } from '@/Helpers/roles'

export function SiteHeader() {
  const { isLoaded, user } = useUser()

  return (
    <header className='flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6'>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mx-2 data-[orientation=vertical]:h-4'
        />
        <h1 className='text-base font-medium'>
          {isLoaded
            ? 
            <span className={`px-2 py-[1px] rounded-3xl text-xs text-white ${roleColors[user.publicMetadata?.role]}`}>
              {adminFormat(user.publicMetadata?.role)}
            </span>
            : 'Cargando...'
          }
        </h1>
      </div>
    </header>
  )
}
