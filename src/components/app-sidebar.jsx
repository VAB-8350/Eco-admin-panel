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
  SoapDispenserDroplet,
  UserRoundSearch,
  UserRoundPlus,
  ShieldUser,
  LayoutTemplate
} from 'lucide-react'
import { ListMinus } from 'lucide-react'
import { Blocks } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

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
      name: 'Producto Maestro',
      url: '/master-products',
      icon: FlaskRound,
    },
    {
      name: 'Cargar Producto Maestro',
      url: '/add-master-product',
      icon: FlaskRound,
    },
    {
      name: 'Productos',
      url: '/products',
      icon: SoapDispenserDroplet,
    },
    {
      name: 'Cargar Producto',
      url: '/add-product',
      icon: SoapDispenserDroplet,
    },
    {
      name: 'Crear receta',
      url: '#',
      icon: ListMinus,
    },
    {
      name: 'Cargar Lote',
      url: '#',
      icon: Blocks,
    }
  ],
  navClient: [
    {
      name: 'Clientes',
      url: '/clients',
      icon: UserRoundSearch,
    },
    {
      name: 'Cargar cliente',
      url: '/add-client',
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
    lastName: user.lastName,
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
                <span className='text-base font-semibold'>Panel</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className='max-h-full'>
          <NavMain items={data.navMain} />
          <GenericNav title='Ventas' items={data.navVentas} />
          <GenericNav title='Producto' items={data.navProduct} />
          <GenericNav title='Clientes' items={data.navClient} />
          <NavSecondary items={data.navSecondary} className='mt-auto' />
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <div className='flex gap-3 my-2 items-center'>
          <div className='grid place-content-center w-[28px] h-[28px]'>
            <UserButton
              userProfileMode='modal'
              appearance={theme === 'dark' ? dark : {}}
              userProfileProps={{
                appearance: theme === 'dark' ? dark : {}
              }}
            />
          </div>

          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-medium'>{userObj.name} {userObj.lastName}</span>
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
