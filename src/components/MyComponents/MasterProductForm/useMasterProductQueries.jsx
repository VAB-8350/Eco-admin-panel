import { useMutation } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

export default function useMasterProductQueries() {

  // Hooks
  const axiosPrivate = useAxiosPrivate()

  // queries
  const addMasterProduct = useMutation({
    mutationFn: async (data) => {
      try {
        return await axiosPrivate.post('/v1/inventory/master-products', data)
      } catch {
        return false
      }
    },
  })

  const editMasterProduct = useMutation({
    mutationFn: async (data) => {
      try {
        return await axiosPrivate.patch(`/v1/inventory/master-products/${data.id}`, data.data)
      } catch {
        return false
      }
    },
  })

  return {
    addMasterProduct,
    editMasterProduct
  }
}
