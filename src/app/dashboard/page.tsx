'use client'

import { useClerkUser } from '@/hooks/useClerkUser'
import { useBookings } from '@/hooks/useBookings'
import { useServices } from '@/hooks/useServices'
import Link from 'next/link'
import { useState, useMemo } from 'react'

export default function DashboardPage() {
  const { userProfile, loading: userLoading } = useClerkUser()
  const { bookings, isLoading: bookingsLoading } = useBookings()
  const { services } = useServices()

  const stats = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const thisMonthBookings = bookings.filter((b: any) => {
      const date = new Date(b.start_time)
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear
    })

    const totalRevenue = thisMonthBookings.reduce((sum: number, b: any) => sum + (b.price || 0), 0)

    const confirmedBookings = bookings.filter((b: any) => b.status === 'confirmed').length
    const completedBookings = bookings.filter((b: any) => b.status === 'completed').length
    const totalBookings = bookings.length

    const occupancyRate = totalBookings > 0 ? Math.round((confirmedBookings / totalBookings) * 100) : 0

    const upcomingBookings = bookings
      .filter((b: any) => new Date(b.start_time) > now && b.status !== 'cancelled')
      .sort((a: any, b: any) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
      .slice(0, 5)

    return {
      thisMonth: thisMonthBookings.length,
      revenue: totalRevenue,
      occupancy: occupancyRate,
      completed: completedBookings,
      upcoming: upcomingBookings,
    }
  }, [bookings])

  if (userLoading || bookingsLoading) {
    return <p className="text-[#554336]">Cargando...</p>
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#1a1c1c] mb-2">
          👋 Bienvenido, {userProfile?.salon_name || 'Salón'}
        </h1>
        <p className="text-[#554336] text-lg">Aquí está tu resumen de este mes</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Citas Este Mes */}
        <div className="bg-gradient-to-br from-[#fff5f0] to-[#ffe8dc] rounded-[1.5rem] border border-[#dbc2b0]/40 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-[#554336] font-medium mb-1">Citas este mes</p>
              <p className="text-3xl font-bold text-[#8d4b00]">{stats.thisMonth}</p>
            </div>
            <span className="text-3xl">📅</span>
          </div>
          <p className="text-xs text-[#554336]">Total de citas registradas</p>
        </div>

        {/* Ingresos */}
        <div className="bg-gradient-to-br from-[#fff0f5] to-[#ffe0ed] rounded-[1.5rem] border border-[#dbc2b0]/40 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-[#554336] font-medium mb-1">Ingresos</p>
              <p className="text-3xl font-bold text-[#8d4b00]">${stats.revenue.toFixed(0)}</p>
            </div>
            <span className="text-3xl">💰</span>
          </div>
          <p className="text-xs text-[#554336]">Este mes</p>
        </div>

        {/* Ocupación */}
        <div className="bg-gradient-to-br from-[#f0f5ff] to-[#e0ecff] rounded-[1.5rem] border border-[#dbc2b0]/40 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-[#554336] font-medium mb-1">Ocupación</p>
              <p className="text-3xl font-bold text-[#8d4b00]">{stats.occupancy}%</p>
            </div>
            <span className="text-3xl">📊</span>
          </div>
          <div className="w-full bg-[#dbc2b0]/20 rounded-full h-2 mt-2">
            <div className="bg-[#8d4b00] h-2 rounded-full" style={{ width: `${stats.occupancy}%` }}></div>
          </div>
        </div>

        {/* Completadas */}
        <div className="bg-gradient-to-br from-[#f0fff5] to-[#e0ffe8] rounded-[1.5rem] border border-[#dbc2b0]/40 p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-[#554336] font-medium mb-1">Completadas</p>
              <p className="text-3xl font-bold text-[#8d4b00]">{stats.completed}</p>
            </div>
            <span className="text-3xl">✅</span>
          </div>
          <p className="text-xs text-[#554336]">Este mes</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Próximas Citas */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[1.5rem] border border-[#dbc2b0]/30 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#1a1c1c]">📅 Próximas Citas</h2>
              <Link
                href="/dashboard/bookings/new"
                className="text-sm bg-[#8d4b00] hover:bg-[#6e3900] text-white font-bold py-2 px-4 rounded-lg transition"
              >
                + Nueva
              </Link>
            </div>

            {stats.upcoming.length === 0 ? (
              <div className="text-center py-8 text-[#554336]">
                <p className="mb-3">No hay citas próximas</p>
                <Link href="/dashboard/bookings/new" className="text-[#8d4b00] font-bold hover:underline">
                  Crear una cita →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {stats.upcoming.map((booking: any) => (
                  <div key={booking.id} className="border border-[#dbc2b0]/20 rounded-lg p-4 hover:bg-[#f9f9f9] transition">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-[#1a1c1c]">{booking.client_name}</p>
                        <p className="text-sm text-[#554336]">{booking.service}</p>
                      </div>
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Confirmada</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-[#554336]">
                      <span>
                        {new Date(booking.start_time).toLocaleDateString('es-ES', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <span className="font-bold text-[#8d4b00]">${booking.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-[1.5rem] border border-[#dbc2b0]/30 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1a1c1c] mb-6">⚡ Acciones Rápidas</h3>
            <div className="space-y-3">
              <Link
                href="/dashboard/bookings/new"
                className="w-full bg-[#8d4b00] hover:bg-[#6e3900] text-white font-bold py-3 rounded-lg transition text-center block"
              >
                Nueva Cita
              </Link>
              <Link
                href="/dashboard/services/new"
                className="w-full border-2 border-[#8d4b00] text-[#8d4b00] hover:bg-[#ffdcc3] font-bold py-3 rounded-lg transition text-center block"
              >
                Nuevo Servicio
              </Link>
              <Link
                href="/dashboard/settings"
                className="w-full border-2 border-[#dbc2b0] text-[#554336] hover:bg-[#f3f3f3] font-bold py-3 rounded-lg transition text-center block"
              >
                Configuración
              </Link>
            </div>
          </div>

          {/* Servicios */}
          <div className="bg-white rounded-[1.5rem] border border-[#dbc2b0]/30 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1a1c1c] mb-4">✨ Servicios ({services.length})</h3>
            {services.length === 0 ? (
              <p className="text-sm text-[#554336] mb-4">No tienes servicios creados</p>
            ) : (
              <div className="space-y-2 mb-4">
                {services.slice(0, 3).map((service: any) => (
                  <div key={service.id} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium text-[#1a1c1c]">{service.name}</p>
                      <p className="text-xs text-[#554336]">{service.duration_minutes} min</p>
                    </div>
                    <p className="font-bold text-[#8d4b00]">${service.price}</p>
                  </div>
                ))}
              </div>
            )}
            <Link
              href="/dashboard/services"
              className="text-sm text-[#8d4b00] font-bold hover:text-[#6e3900]"
            >
              Ver todos →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
