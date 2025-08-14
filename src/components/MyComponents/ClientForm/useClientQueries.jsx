import { useMutation } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

export default function useClientQueries() {

  // Hooks
  const axiosPrivate = useAxiosPrivate()

  // Hooks Mutations
  //* Actions
  const commitClientMutation = useMutation({
    mutationFn: async (clientId) => {
      try {
        return await axiosPrivate.post(`/customers/${clientId}/session/commit`)
      } catch {
        return false
      }
    },
  })

  //* Client
  const createClientMutation = useMutation({
    mutationFn: async (data) => {
      try {
        return await axiosPrivate.post('/customers', data)
      } catch {
        return false
      }
    },
  })

  const modifyClientMutation = useMutation({
    mutationFn: async ({ clientId, data }) => {
      try {
        return await axiosPrivate.patch(`/customers/${clientId}`, data)
      } catch {
        return false
      }
    },
  })

  //* Address
  const createAddressMutation = useMutation({
    mutationFn: async ({ clientId, data }) => {
      try {
        return await axiosPrivate.post(`/customers/${clientId}/addresses`, data)
      } catch {
        return false
      }
    },
  })

  const modifyAddressMutation = useMutation({
    mutationFn: async ({ clientId, addressId, data }) => {
      try {
        return await axiosPrivate.patch(`/customers/${clientId}/addresses/${addressId}`, data)
      } catch {
        return false
      }
    },
  })

  const deleteAddressMutation = useMutation({
    mutationFn: async ({ clientId, addressId }) => {
      try {
        return await axiosPrivate.delete(`/customers/${clientId}/addresses/${addressId}`)
      } catch {
        return false
      }
    },
  })

  //* Contact
  const createContactMutation = useMutation({
    mutationFn: async ({ clientId, data }) => {
      try {
        return await axiosPrivate.post(`/customers/${clientId}/contacts`, data)
      } catch {
        return false
      }
    },
  })

  const modifyContactMutation = useMutation({
    mutationFn: async ({ clientId, contactId, data }) => {
      try {
        return await axiosPrivate.patch(`/customers/${clientId}/contacts/${contactId}`, data)
      } catch {
        return false
      }
    },
  })

  const deleteContactMutation = useMutation({
    mutationFn: async ({ clientId, contactId }) => {
      try {
        return await axiosPrivate.delete(`/customers/${clientId}/contacts/${contactId}`)
      } catch {
        return false
      }
    },
  })

  //* Contact Methods
  const createContactMethodMutation = useMutation({
    mutationFn: async ({ clientId, contactId, data }) => {
      try {
        return await axiosPrivate.post(`/customers/${clientId}/contacts/${contactId}/methods`, data)
      } catch {
        return false
      }
    },
  })

  const modifyContactMethodMutation = useMutation({
    mutationFn: async ({ clientId, contactId, methodId, data }) => {
      try {
        return await axiosPrivate.patch(`/customers/${clientId}/contacts/${contactId}/methods/${methodId}`, data)
      } catch {
        return false
      }
    },
  })

  const deleteContactMethodMutation = useMutation({
    mutationFn: async ({ clientId, contactId, methodId }) => {
      try {
        return await axiosPrivate.delete(`/customers/${clientId}/contacts/${contactId}/methods/${methodId}`)
      } catch {
        return false
      }
    },
  })

  return {
    commitClientMutation,
    createClientMutation,
    modifyClientMutation,
    createAddressMutation,
    modifyAddressMutation,
    deleteAddressMutation,
    createContactMutation,
    modifyContactMutation,
    deleteContactMutation,
    createContactMethodMutation,
    modifyContactMethodMutation,
    deleteContactMethodMutation,
  }
}
