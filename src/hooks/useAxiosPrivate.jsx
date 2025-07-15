import { axiosPrivate } from '@/Helpers/Axios'
import { useAuth, useClerk } from '@clerk/clerk-react'
import { useEffect } from 'react'

export default function useAxiosPrivate() {
  const { getToken } = useAuth()
  const { signOut } = useClerk()

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(async (config) => {
      const token = await getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      } else {
        signOut()
      }
      return config
    })

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor)
    }
  }, [getToken])

  return axiosPrivate
}
