'use client'

import { useClerkUser } from '@/hooks/useClerkUser'
import { useBookings } from '@/hooks/useBookings'
import { useServices } from '@/hooks/useServices'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

export default function NewBookingPage() {
  const { userProfile, loading: userLoading } = useClerkUser()
  const { createBooking, isLoading } = useBookings()
  const { services } = useServices()
  const router = useRouter()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    client_name: '',
    client_phone: '',
    service: '',
    start_time: '',
    end_time: '',
    status: 'confirmed',
    price: 0,
    notes: '',
  })

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedService = services.find((s: any) => s.id === e.target.value)
    const newData = {
      ...formData,
      service: selectedService?.name || '',
      price: selectedService?.price || 0,
    }
    setFormData(newData)

    // Calculate end_time if start_time is set
    if (formData.start_time && selectedService?.duration_minutes) {
      const startDate = new Date(formData.start_time)
      const endDate = new Date(startDate.getTime() + selectedService.duration_minutes * 60000)
      setFormData((prev: any) => ({
        ...prev,
        end_time: endDate.toISOString().slice(0, 16),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.client_name || !formData.service || !formData.start_time) {
      setError('Completa todos los campos requeridos')
      return
    }

    try {
      await createBooking(formData)
      router.push('/dashboard/bookings')
    } catch (err: any) {
      setError(err.message || 'Error al crear cita')
    }
  }

  if (userLoading) {
    return <p className="text-[#554336]">Cargando...</p>
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard/bookings" className="text-[#8d4b00] font-bold hover:text-[#6e3900] mb-4 inline-block">
          ← Volver a citas
        </Link>
        <h1 className="text-3xl font-bold text-[#1a1c1c] mb-2">📅 Crear Nueva Cita</h1>
        <p className="text-[#554336]">Agenda una cita para tu cliente</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-[1.5rem] border border-[#dbc2b0]/30 p-8 shadow-sm max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Name */}
          <div>
            <label className="block text-sm font-bold text-[#1a1c1c] mb-2">Nombre del Cliente *</label>
            <input
              type="text"
              value={formData.client_name}
              onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
              placeholder="ej: María García"
              className="w-full px-4 py-3 border border-[#dbc2b0] rounded-lg focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20"
            />
          </div>

          {/* Client Phone */}
          <div>
            <label className="block text-sm font-bold text-[#1a1c1c] mb-2">Teléfono del Cliente</label>
            <input
              type="tel"
              value={formData.client_phone}
              onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
              placeholder="ej: +1-555-0000"
              className="w-full px-4 py-3 border border-[#dbc2b0] rounded-lg focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20"
            />
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-bold text-[#1a1c1c] mb-2">Servicio *</label>
            {services.length === 0 ? (
              <p className="text-sm text-red-600 mb-2">Necesitas crear servicios primero</p>
            ) : (
              <select
                onChange={handleServiceChange}
                className="w-full px-4 py-3 border border-[#dbc2b0] rounded-lg focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20"
              >
                <option value="">Selecciona un servicio</option>
                {services.map((s: any) => (
                  <option key={s.id} value={s.id}>
                    {s.name} - ${s.price} ({s.duration_minutes} min)
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Date & Time */}
          <div>
            <label className="block text-sm font-bold text-[#1a1c1c] mb-2">Fecha y Hora *</label>
            <input
              type="datetime-local"
              value={formData.start_time}
              onChange={(e) => {
                const startTime = e.target.value
                const newData = { ...formData, start_time: startTime }

                // Find selected service to get duration
                const selectedService = services.find((s: any) => s.name === formData.service)
                if (startTime && selectedService?.duration_minutes) {
                  const startDate = new Date(startTime)
                  const endDate = new Date(startDate.getTime() + selectedService.duration_minutes * 60000)
                  newData.end_time = endDate.toISOString().slice(0, 16)
                }

                setFormData(newData)
              }}
              className="w-full px-4 py-3 border border-[#dbc2b0] rounded-lg focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-bold text-[#1a1c1c] mb-2">Estado</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-3 border border-[#dbc2b0] rounded-lg focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20"
            >
              <option value="confirmed">Confirmada</option>
              <option value="pending">Pendiente</option>
              <option value="completed">Completada</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-bold text-[#1a1c1c] mb-2">Precio ($)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              placeholder="0.00"
              step="0.01"
              className="w-full px-4 py-3 border border-[#dbc2b0] rounded-lg focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-bold text-[#1a1c1c] mb-2">Notas</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Notas adicionales sobre la cita"
              rows={3}
              className="w-full px-4 py-3 border border-[#dbc2b0] rounded-lg focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading || services.length === 0}
              className="flex-1 bg-[#8d4b00] hover:bg-[#6e3900] disabled:bg-[#b4a99f] text-white font-bold py-3 rounded-lg transition"
            >
              {isLoading ? 'Guardando...' : 'Crear Cita'}
            </button>
            <Link
              href="/dashboard/bookings"
              className="flex-1 bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#554336] font-bold py-3 rounded-lg transition text-center"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
