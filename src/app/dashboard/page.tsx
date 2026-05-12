'use client'

import { useClerkUser } from '@/hooks/useClerkUser'
import Link from 'next/link'

export default function DashboardPage() {
  const { userProfile, loading } = useClerkUser()

  if (loading) {
    return <p className="text-[#554336]">Cargando...</p>
  }

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1a1c1c] mb-2">
          ¡Hola, {userProfile?.salon_name || 'Salón'}! 👋
        </h2>
        <p className="text-[#554336]">Aquí está un resumen de tu negocio esta semana</p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-[1.5rem] border border-[#dbc2b0]/30 p-6 shadow-sm">
          <p className="text-sm text-[#554336] mb-2">Citas esta semana</p>
          <p className="text-4xl font-bold text-[#8d4b00]">12</p>
          <p className="text-xs text-[#554336] mt-2">↑ 5% vs semana anterior</p>
        </div>

        <div className="bg-white rounded-[1.5rem] border border-[#dbc2b0]/30 p-6 shadow-sm">
          <p className="text-sm text-[#554336] mb-2">Ingresos esta semana</p>
          <p className="text-4xl font-bold text-[#8d4b00]">$480</p>
          <p className="text-xs text-[#554336] mt-2">↑ 12% vs semana anterior</p>
        </div>

        <div className="bg-white rounded-[1.5rem] border border-[#dbc2b0]/30 p-6 shadow-sm">
          <p className="text-sm text-[#554336] mb-2">Tasa ocupación</p>
          <p className="text-4xl font-bold text-[#8d4b00]">85%</p>
          <p className="text-xs text-[#554336] mt-2">Excelente desempeño</p>
        </div>

        <div className="bg-white rounded-[1.5rem] border border-[#dbc2b0]/30 p-6 shadow-sm">
          <p className="text-sm text-[#554336] mb-2">No-shows</p>
          <p className="text-4xl font-bold text-[#8d4b00]">1</p>
          <p className="text-xs text-[#554336] mt-2">Muy bajo, ¡bien hecho!</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-[#1a1c1c] mb-4">Acciones rápidas</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/dashboard/bookings"
            className="bg-gradient-to-r from-[#8d4b00] to-[#b15f00] text-white rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <p className="font-bold mb-2">📅 Nueva cita</p>
            <p className="text-sm opacity-90">Crear una cita para un cliente</p>
          </Link>

          <Link
            href="/dashboard/services"
            className="bg-gradient-to-r from-[#8d4b00] to-[#b15f00] text-white rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <p className="font-bold mb-2">✨ Gestionar servicios</p>
            <p className="text-sm opacity-90">Editar precios y duración de servicios</p>
          </Link>
        </div>
      </div>

      {/* Próximas Citas */}
      <div className="bg-white rounded-[1.5rem] border border-[#dbc2b0]/30 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#1a1c1c] mb-4">Próximas citas</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-[#f3f3f3] rounded-lg">
            <div>
              <p className="font-bold text-[#1a1c1c]">Corte + Barba</p>
              <p className="text-sm text-[#554336]">María González</p>
            </div>
            <p className="text-sm font-bold text-[#8d4b00]">Hoy 2:00 PM</p>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#f3f3f3] rounded-lg">
            <div>
              <p className="font-bold text-[#1a1c1c]">Balayage + Corte</p>
              <p className="text-sm text-[#554336]">Carmen López</p>
            </div>
            <p className="text-sm font-bold text-[#8d4b00]">Mañana 10:00 AM</p>
          </div>

          <div className="flex items-center justify-between p-4 bg-[#f3f3f3] rounded-lg">
            <div>
              <p className="font-bold text-[#1a1c1c]">Manicure</p>
              <p className="text-sm text-[#554336]">Ana Martínez</p>
            </div>
            <p className="text-sm font-bold text-[#8d4b00]">Mañana 3:30 PM</p>
          </div>
        </div>

        <Link
          href="/dashboard/bookings"
          className="mt-4 inline-block text-[#8d4b00] font-bold hover:text-[#6e3900]"
        >
          Ver todas las citas →
        </Link>
      </div>
    </div>
  )
}
