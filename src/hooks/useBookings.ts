import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useBookings() {
  const { data, error, isLoading, mutate } = useSWR('/api/bookings', fetcher)

  const createBooking = async (bookingData: {
    client_name: string
    client_phone?: string
    service: string
    start_time: string
    end_time: string
    price?: number
    notes?: string
  }) => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    })
    if (!res.ok) throw new Error('Failed to create booking')
    const newBooking = await res.json()
    mutate()
    return newBooking
  }

  const updateBooking = async (
    id: string,
    bookingData: Record<string, any>
  ) => {
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    })
    if (!res.ok) throw new Error('Failed to update booking')
    mutate()
  }

  const deleteBooking = async (id: string) => {
    const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete booking')
    mutate()
  }

  return {
    bookings: data || [],
    isLoading,
    error,
    createBooking,
    updateBooking,
    deleteBooking,
    mutate,
  }
}
