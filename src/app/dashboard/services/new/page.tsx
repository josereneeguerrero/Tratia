'use client'

import { useClerkUser } from '@/hooks/useClerkUser'
import { useServices } from '@/hooks/useServices'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

export default function NewServicePage() {
  const { userProfile, loading: userLoading } = useClerkUser()
  const { createService, isLoading } = useServices()
  const router = useRouter()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    duration_minutes: 30,
    price: 0,
    description: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.name || formData.price <= 0) {
      setError('Completa todos los campos requeridos')
      return
    }

    try {
      await createService(formData)
      router.push('/dashboard/services')
    } catch (err: any) {
      setError(err.message || 'Error al crear servicio')
    }
  }

  if (userLoading) {
    return <p className="text-[#554336]">Cargando...</p>
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link href="/dashboard/services" className="text-[#8d4b00] font-bold hover:text-[#6e3900] mb-4 inline-block">
          ← Volver a servicios
        </Link>
        <h1 className="text-3xl font-bold text-[#1a1c1c] mb-2">✨ Crear Nuevo Servicio</h1>
        <p className="text-[#554336]">Agrega un servicio que ofrece tu salón</p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-[1.5rem] border border-[#dbc2b0]/30 p-8 shadow-sm max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre del Servicio */}
          <div>
            <label className="block text-sm font-bold text-[#1a1c1c] mb-2">Nombre del Servicio *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="ej: Corte de cabello"
              className="w-full px-4 py-3 border border-[#dbc2b0] rounded-lg focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-[#1a1c1c] mb-2">Descripción</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe brevemente este servicio"
              rows={3}
              className="w-full px-4 py-3 border border-[#dbc2b0] rounded-lg focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20"
            />
          </div>

          {/* Grid: Duration & Price */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#1a1c1c] mb-2">Duración (minutos) *</label>
              <input
                type="number"
                value={formData.duration_minutes}
                onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
                placeholder="30"
                className="w-full px-4 py-3 border border-[#dbc2b0] rounded-lg focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#1a1c1c] mb-2">Precio ($) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                placeholder="0.00"
                step="0.01"
                className="w-full px-4 py-3 border border-[#dbc2b0] rounded-lg focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20"
              />
            </div>
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
              disabled={isLoading}
              className="flex-1 bg-[#8d4b00] hover:bg-[#6e3900] disabled:bg-[#b4a99f] text-white font-bold py-3 rounded-lg transition"
            >
              {isLoading ? 'Guardando...' : 'Crear Servicio'}
            </button>
            <Link
              href="/dashboard/services"
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
