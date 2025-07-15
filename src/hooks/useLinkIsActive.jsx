import { useLocation } from 'react-router-dom'

export default function useLinkIsActive() {

  const { pathname } = useLocation()

  const isActive = (url) => {
    if (pathname === url) return true
    if (pathname.startsWith(url + '/')) return true
    return false
  }

  return ({
    isActive
  })
}
