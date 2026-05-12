import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useServices() {
  const { data, error, isLoading, mutate } = useSWR('/api/services', fetcher)

  const createService = async (serviceData: {
    name: string
    duration_minutes: number
    price: number
    description?: string
  }) => {
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(serviceData),
    })
    if (!res.ok) throw new Error('Failed to create service')
    const newService = await res.json()
    mutate()
    return newService
  }

  const updateService = async (
    id: string,
    serviceData: Record<string, any>
  ) => {
    const res = await fetch(`/api/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(serviceData),
    })
    if (!res.ok) throw new Error('Failed to update service')
    mutate()
  }

  const deleteService = async (id: string) => {
    const res = await fetch(`/api/services/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete service')
    mutate()
  }

  return {
    services: data || [],
    isLoading,
    error,
    createService,
    updateService,
    deleteService,
    mutate,
  }
}
