import useAxiosPrivate from '@/hooks/useAxiosPrivate'

export default function useProductQueries() {

  // Hooks
  const axiosPrivate = useAxiosPrivate()

  const getMasterProducts = async () => {
    const response = await axiosPrivate.get('/v1/inventory/master-products')
    return response
  }

  const getUnits = async () => {
    const response = await axiosPrivate.get('/v1/inventory/common/uom')
    return response
  }



  return {
    getMasterProducts,
    getUnits
  }
}
