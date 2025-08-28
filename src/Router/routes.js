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
const EditClient  = React.lazy(() => import('@/Screens/EditClient/EditClient'))
const Products    = React.lazy(() => import('@/Screens/Products/Products'))
const AddProduct  = React.lazy(() => import('@/Screens/AddProduct/AddProduct'))
const MasterProducts  = React.lazy(() => import('@/Screens/MasterProducts/MasterProducts'))
const AddMasterProducts  = React.lazy(() => import('@/Screens/AddMasterProducts/AddMasterProducts'))

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
    path: '/edit-client/:id',
    label: 'Edit Client',
    component: EditClient,
    roles: [ROLE_ADMIN, ROLE_USER]
  },
  {
    path: '/products',
    label: 'Products',
    component: Products,
    roles: [ROLE_ADMIN, ROLE_USER]
  },
  {
    path: '/add-product',
    label: 'Add Product',
    component: AddProduct,
    roles: [ROLE_ADMIN, ROLE_USER]
  },
  {
    path: '/master-products',
    label: 'Master Products',
    component: MasterProducts,
    roles: [ROLE_ADMIN, ROLE_USER]
  },
  {
    path: '/add-master-product',
    label: 'Add Master Product',
    component: AddMasterProducts,
    roles: [ROLE_ADMIN, ROLE_USER]
  }
]

export { publicRoutes, privateRoutes }