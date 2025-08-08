import { useMutation } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

export default function useClientQueries() {

  // Hooks
  const axiosPrivate = useAxiosPrivate()

  // Hooks Mutations
  //* Client
  const createClientMutation = useMutation({
    mutationFn: async (data) => {
      return await axiosPrivate.post('/customers', data)
    },
  })

  const modifyClientMutation = useMutation({
    mutationFn: async (clientId, data) => {
      return await axiosPrivate.patch(`/customers/${clientId}`, data)
    },
  })

  //* Address
  const createAddressMutation = useMutation({
    mutationFn: async (clientId, data) => {
      return await axiosPrivate.post(`/customers/${clientId}/addresses`, data)
    },
  })

  const modifyAddressMutation = useMutation({
    mutationFn: async (clientId, addressId, data) => {
      return await axiosPrivate.patch(`/customers/${clientId}/addresses/${addressId}`, data)
    },
  })

  const deleteAddressMutation = useMutation({
    mutationFn: async (clientId, addressId) => {
      return await axiosPrivate.delete(`/customers/${clientId}/addresses/${addressId}`)
    },
  })

  //* Contact
  const createContactMutation = useMutation({
    mutationFn: async (clientId, data) => {
      return await axiosPrivate.post(`/customers/${clientId}/contacts`, data)
    },
  })

  const modifyContactMutation = useMutation({
    mutationFn: async (clientId, contactId, data) => {
      return await axiosPrivate.patch(`/customers/${clientId}/contacts/${contactId}`, data)
    },
  })

  const deleteContactMutation = useMutation({
    mutationFn: async (clientId, contactId) => {
      return await axiosPrivate.delete(`/customers/${clientId}/contacts/${contactId}`)
    },
  })

  return {
    createClientMutation,
    modifyClientMutation,
    createAddressMutation,
    modifyAddressMutation,
    deleteAddressMutation,
    createContactMutation,
    modifyContactMutation,
    deleteContactMutation,
  }
}
