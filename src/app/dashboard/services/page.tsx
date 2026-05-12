'use client'

import { useClerkUser } from '@/hooks/useClerkUser'
import { useServices } from '@/hooks/useServices'
import Link from 'next/link'
import { useState } from 'react'

export default function ServicesPage() {
  const { userProfile, loading: userLoading } = useClerkUser()
  const { services, isLoading: servicesLoading, error, updateService } = useServices()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Record<string, any>>({})

  if (userLoading || servicesLoading) {
    return <p className="text-[#554336]">Cargando servicios...</p>
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        Error al cargar servicios: {error.message}
      </div>
    )
  }

  const handleSaveService = async (id: string) => {
    try {
      await updateService(id, editForm)
      setEditingId(null)
      setEditForm({})
    } catch (err) {
      console.error('Error updating service:', err)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#1a1c1c] mb-2">✨ Servicios</h2>
          <p className="text-[#554336]">Gestiona los servicios que ofrece tu salón</p>
        </div>
        <Link
          href="/dashboard/services/new"
          className="bg-[#8d4b00] hover:bg-[#6e3900] text-white font-bold py-3 px-6 rounded-lg transition"
        >
          + Nuevo servicio
        </Link>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service: any) => (
          <div
            key={service.id}
            className="bg-white rounded-[1.5rem] border border-[#dbc2b0]/30 p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#1a1c1c] mb-1">{service.name}</h3>
                <p className="text-sm text-[#554336]">{service.description}</p>
              </div>
              <button
                onClick={() => setEditingId(editingId === service.id ? null : service.id)}
                className="text-[#8d4b00] hover:text-[#6e3900] ml-4"
              >
                ⚙️
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-t border-b border-[#dbc2b0]/20">
              <div>
                <p className="text-xs text-[#554336] mb-1">Duración</p>
                <p className="text-lg font-bold text-[#8d4b00]">{service.duration_minutes} min</p>
              </div>
              <div>
                <p className="text-xs text-[#554336] mb-1">Precio</p>
                <p className="text-lg font-bold text-[#8d4b00]">${service.price}</p>
              </div>
            </div>

            {editingId === service.id && (
              <div className="space-y-3 pt-4 border-t border-[#dbc2b0]/20">
                <input
                  type="text"
                  defaultValue={service.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Nombre del servicio"
                  className="w-full px-4 py-2 border border-[#dbc2b0] rounded-lg focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20"
                />
                <input
                  type="number"
                  defaultValue={service.duration_minutes}
                  onChange={(e) => setEditForm({ ...editForm, duration_minutes: parseInt(e.target.value) })}
                  placeholder="Duración en minutos"
                  className="w-full px-4 py-2 border border-[#dbc2b0] rounded-lg focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20"
                />
                <input
                  type="number"
                  defaultValue={service.price}
                  onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                  placeholder="Precio"
                  step="0.01"
                  className="w-full px-4 py-2 border border-[#dbc2b0] rounded-lg focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20"
                />
                <textarea
                  defaultValue={service.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Descripción"
                  rows={2}
                  className="w-full px-4 py-2 border border-[#dbc2b0] rounded-lg focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveService(service.id)}
                    className="flex-1 bg-[#8d4b00] hover:bg-[#6e3900] text-white font-bold py-2 rounded-lg transition"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 bg-[#f3f3f3] hover:bg-[#e8e8e8] text-[#554336] font-bold py-2 rounded-lg transition"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="text-center py-12 text-[#554336]">
          <p className="text-lg mb-4">No hay servicios creados aún</p>
          <Link href="/dashboard/services/new" className="text-[#8d4b00] font-bold hover:underline">
            Crear primer servicio →
          </Link>
        </div>
      )}
    </div>
  )
}
