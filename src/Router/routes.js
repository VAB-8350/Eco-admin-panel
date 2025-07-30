// External modules
import React from 'react'

// Internal modules
import {
  ROLE_USER,
  ROLE_ADMIN
} from '@/Helpers/roles'

// Public routes
const Login = React.lazy(() => import('@/Screens/Login/Login'))

// Private routes
const Dashboard   = React.lazy(() => import('@/Screens/Dashboard/Dashboard'))
const Sales       = React.lazy(() => import('@/Screens/Sales/Sales'))
const Team        = React.lazy(() => import('@/Screens/Team/Team'))
const Client      = React.lazy(() => import('@/Screens/Clients/Clients'))
const AddClient   = React.lazy(() => import('@/Screens/AddClient/AddClient'))
const EditClient = React.lazy(() => import('@/Screens/EditClient/EditClient'))

const publicRoutes = [
  {
    path: '/',
    label: 'Login',
    component: Login
  }
]

const privateRoutes = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    component: Dashboard,
    roles: [ROLE_ADMIN, ROLE_USER]
  },
  {
    path: '/sales',
    label: 'Ventas',
    component: Sales,
    roles: [ROLE_ADMIN, ROLE_USER]
  },
  {
    path: '/team',
    label: 'Team',
    component: Team,
    roles: [ROLE_ADMIN]
  },
  {
    path: '/add-client',
    label: 'Add Client',
    component: AddClient,
    roles: [ROLE_ADMIN, ROLE_USER]
  },
  {
    path: '/clients',
    label: 'Client',
    component: Client,
    roles: [ROLE_ADMIN, ROLE_USER]
  },
  {
    path: '/edit-client/*',
    label: 'Edit Client',
    component: EditClient,
    roles: [ROLE_ADMIN, ROLE_USER]
  }
]

export { publicRoutes, privateRoutes }