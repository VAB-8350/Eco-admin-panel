import { UserButton  } from '@clerk/clerk-react'

import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import { GenericNav } from '@/components/generic-nav'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { dark } from '@clerk/themes'
import { useTheme } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import { useUser } from '@clerk/clerk-react'
import {
  BadgeDollarSign,
  PackagePlus,
  FlaskRound,
  Bubbles,
  SoapDispenserDroplet,
  NotebookText,
  UserRoundSearch,
  UserRoundPlus,
  ShieldUser,
  LayoutTemplate
} from 'lucide-react'

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutTemplate,
    }
  ],
  navVentas: [
    {
      name: 'Todas las ventas',
      url: '/sales',
      icon: BadgeDollarSign,
    },
    {
      name: 'Generar Venta',
      url: '/generate-sale',
      icon: PackagePlus,
    }
  ],
  navProduct: [
    {
      name: 'Materia Prima',
      url: '#',
      icon: FlaskRound,
    },
    {
      name: 'Bases',
      url: '#',
      icon: Bubbles,
    },
    {
      name: 'Productos',
      url: '#',
      icon: SoapDispenserDroplet,
    },
    {
      name: 'Catalogo',
      url: '#',
      icon: NotebookText,
    }
  ],
  navClient: [
    {
      name: 'Clientes',
      url: '#',
      icon: UserRoundSearch,
    },
    {
      name: 'Cargar cliente',
      url: '#',
      icon: UserRoundPlus,
    },
  ],
  navSecondary: [
    {
      title: 'Equipo',
      url: '/team',
      icon: ShieldUser,
    }
  ]
}

export function AppSidebar({ ...props }) {

  const { theme } = useTheme()
  const { user } = useUser()

  const userObj = {
    name: user?.firstName,
    email: user?.emailAddresses[0]?.emailAddress,
  }

  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <a href='#'>
                <img src='/logo-eco-100w.png' alt='company logo' className='h-6 object-contain' />
                <span className='text-base font-semibold'>Eco Panel</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <GenericNav title='Ventas' items={data.navVentas} />
        <GenericNav title='Producto' items={data.navProduct} />
        <GenericNav title='Clientes' items={data.navClient} />
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <div className='flex gap-3 my-2'>
          <UserButton
            userProfileMode='modal'
            appearance={theme === 'dark' ? dark : {}}
            userProfileProps={{
              appearance: theme === 'dark' ? dark : {}
            }}
          />

          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-medium'>{userObj.name}</span>
            <span className='text-muted-foreground truncate text-xs'>
              {userObj.email}
            </span>
          </div>
        </div>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
