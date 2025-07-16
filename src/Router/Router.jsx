// External modules
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@/Layouts/Layout'
import { useUser, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'

// Internal modules
import { publicRoutes, privateRoutes } from '@/Router/routes'
import NotFound from '@/Screens/NotFound/NotFound'
import { SplashScreen } from '@/components/MyComponents/SplashScreen'

export default function Router() {
  const { isLoaded, user } = useUser()

  return (
    <React.Suspense fallback={<SplashScreen />}>
      <Routes>
        {/* Rutas públicas */}
        {
          publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))
        }

        {/* Rutas privadas */}
        {
          isLoaded && user &&
          privateRoutes.map((route) => (
            route.roles.includes(user.publicMetadata?.role)
              ?
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <SignedIn>
                      <route.component />
                    </SignedIn>
                    <SignedOut>
                      <RedirectToSignIn redirectUrl='/' />
                    </SignedOut>
                  </Layout>
                }
              />
              : null
          ))
        }

        {
          isLoaded &&
          <Route path='*' element={<NotFound />} />
        }
      </Routes>
    </React.Suspense>
  )
}
