'use client'

import { useClerkUser } from '@/hooks/useClerkUser'
import { useBookings } from '@/hooks/useBookings'
import Link from 'next/link'
import { useState } from 'react'

export default function BookingsPage() {
  const { userProfile, loading: userLoading } = useClerkUser()
  const { bookings, isLoading: bookingsLoading, error } = useBookings()
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'completed' | 'cancelled'>('all')

  if (userLoading || bookingsLoading) {
    return <p className="text-[#554336]">Cargando citas...</p>
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        Error al cargar citas: {error.message}
      </div>
    )
  }

  const filtered = bookings.filter((b: any) => filter === 'all' || b.status === filter)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'completed':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#1a1c1c] mb-2">📅 Citas</h2>
          <p className="text-[#554336]">Gestiona todas las citas de tu salón</p>
        </div>
        <Link
          href="/dashboard/bookings/new"
          className="bg-[#8d4b00] hover:bg-[#6e3900] text-white font-bold py-3 px-6 rounded-lg transition"
        >
          + Nueva cita
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2">
        {(['all', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === status
                ? 'bg-[#8d4b00] text-white'
                : 'bg-white border border-[#dbc2b0]/30 text-[#554336] hover:bg-[#f3f3f3]'
            }`}
          >
            {status === 'all' && 'Todas'}
            {status === 'confirmed' && 'Confirmadas'}
            {status === 'completed' && 'Completadas'}
            {status === 'cancelled' && 'Canceladas'}
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-[1.5rem] border border-[#dbc2b0]/30 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-[#554336]">
            <p className="text-lg mb-2">No hay citas en esta categoría</p>
            <Link href="/dashboard/bookings/new" className="text-[#8d4b00] font-bold hover:underline">
              Crear primera cita →
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-[#f3f3f3] border-b border-[#dbc2b0]/30">
              <tr>
                <th className="text-left px-6 py-4 font-bold text-[#1a1c1c]">Cliente</th>
                <th className="text-left px-6 py-4 font-bold text-[#1a1c1c]">Servicio</th>
                <th className="text-left px-6 py-4 font-bold text-[#1a1c1c]">Fecha & Hora</th>
                <th className="text-left px-6 py-4 font-bold text-[#1a1c1c]">Precio</th>
                <th className="text-left px-6 py-4 font-bold text-[#1a1c1c]">Estado</th>
                <th className="text-left px-6 py-4 font-bold text-[#1a1c1c]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((booking: any) => (
                <tr key={booking.id} className="border-b border-[#dbc2b0]/20 hover:bg-[#f9f9f9] transition">
                  <td className="px-6 py-4 text-[#1a1c1c] font-medium">{booking.client_name}</td>
                  <td className="px-6 py-4 text-[#554336]">{booking.service}</td>
                  <td className="px-6 py-4 text-[#554336]">{formatDate(booking.start_time)}</td>
                  <td className="px-6 py-4 text-[#8d4b00] font-bold">${booking.price}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        booking.status,
                      )}`}
                    >
                      {booking.status === 'confirmed' && 'Confirmada'}
                      {booking.status === 'completed' && 'Completada'}
                      {booking.status === 'cancelled' && 'Cancelada'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/bookings/${booking.id}`}
                      className="text-[#8d4b00] hover:text-[#6e3900] font-bold text-sm"
                    >
                      Ver →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
