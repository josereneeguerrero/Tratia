'use client'

import { useClerkUser } from '@/hooks/useClerkUser'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

export default function SettingsPage() {
  const { userProfile, loading } = useClerkUser()
  const { user } = useUser()
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    salon_name: '',
    phone: '',
  })

  useEffect(() => {
    if (userProfile) {
      setFormData({
        salon_name: userProfile.salon_name || '',
        phone: userProfile.phone || '',
      })
    }
  }, [userProfile])

  if (loading) {
    return <p className="text-[#554336]">Cargando...</p>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to update profile')
      setMessage('Cambios guardados exitosamente')
    } catch (err) {
      setMessage('Error al guardar cambios')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#1a1c1c] mb-2">⚙️ Configuración</h2>
        <p className="text-[#554336]">Gestiona tu perfil y preferencias</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Settings */}
        <div className="bg-white rounded-[1.5rem] border border-[#dbc2b0]/30 p-8 shadow-sm">
          <h3 className="text-xl font-bold text-[#1a1c1c] mb-6">📋 Información del Salón</h3>

          {message && (
            <div
              className={`mb-4 p-4 rounded-lg text-sm ${
                message.includes('Error')
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Salon Name */}
            <div>
              <label className="block text-sm font-bold text-[#1a1c1c] mb-2">Nombre del Salón</label>
              <input
                type="text"
                value={formData.salon_name}
                onChange={(e) => setFormData({ ...formData, salon_name: e.target.value })}
                className="w-full px-4 py-3 border border-[#dbc2b0] rounded-lg bg-white text-[#1a1c1c] focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20 transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-bold text-[#1a1c1c] mb-2">Teléfono</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-[#dbc2b0] rounded-lg bg-white text-[#1a1c1c] focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20 transition"
              />
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="block text-sm font-bold text-[#1a1c1c] mb-2">Email</label>
              <input
                type="email"
                value={userProfile?.email || ''}
                disabled
                className="w-full px-4 py-3 border border-[#dbc2b0] rounded-lg bg-[#f3f3f3] text-[#554336] cursor-not-allowed opacity-75"
              />
              <p className="text-xs text-[#554336] mt-2">El email no puede ser cambiado</p>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#8d4b00] hover:bg-[#6e3900] disabled:bg-[#b4a99f] text-white font-bold py-3 rounded-lg transition"
            >
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </form>
        </div>

        {/* Account Settings */}
        <div className="space-y-6">
          {/* Subscription Plan */}
          <div className="bg-white rounded-[1.5rem] border border-[#dbc2b0]/30 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1a1c1c] mb-6">💳 Plan de Suscripción</h3>
            <div className="mb-6">
              <p className="text-sm text-[#554336] mb-2">Plan Actual</p>
              <div className="inline-block px-4 py-2 bg-[#ffdcc3] rounded-full">
                <p className="font-bold text-[#8d4b00]">
                  {userProfile?.subscription_plan === 'free' && '🆓 Plan Gratuito'}
                  {userProfile?.subscription_plan === 'pro' && '⭐ Plan Pro'}
                  {userProfile?.subscription_plan === 'premium' && '👑 Plan Premium'}
                </p>
              </div>
            </div>
            <button className="w-full border-2 border-[#8d4b00] text-[#8d4b00] hover:bg-[#ffdcc3] font-bold py-3 rounded-lg transition">
              Ver Planes →
            </button>
          </div>

          {/* Security */}
          <div className="bg-white rounded-[1.5rem] border border-[#dbc2b0]/30 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1a1c1c] mb-6">🔐 Seguridad</h3>
            <button className="w-full bg-white border-2 border-[#554336] text-[#554336] hover:bg-[#f3f3f3] font-bold py-3 rounded-lg transition mb-4">
              Cambiar Contraseña
            </button>
            <button className="w-full bg-white border-2 border-[#554336] text-[#554336] hover:bg-[#f3f3f3] font-bold py-3 rounded-lg transition">
              Sesiones Activas
            </button>
          </div>

          {/* Integrations */}
          <div className="bg-white rounded-[1.5rem] border border-[#dbc2b0]/30 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#1a1c1c] mb-6">🔗 Integraciones</h3>
            <div className="space-y-3">
              <p className="text-sm text-[#554336] mb-4">Próximas integraciones:</p>
              <button className="w-full bg-white border-2 border-[#dbc2b0] text-[#554336] hover:bg-[#f3f3f3] font-bold py-3 rounded-lg transition opacity-50 cursor-not-allowed">
                WhatsApp Business (Próximamente)
              </button>
              <button className="w-full bg-white border-2 border-[#dbc2b0] text-[#554336] hover:bg-[#f3f3f3] font-bold py-3 rounded-lg transition opacity-50 cursor-not-allowed">
                Google Calendar (Próximamente)
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 border-2 border-red-200 rounded-[1.5rem] p-8">
            <h3 className="text-xl font-bold text-red-700 mb-6">⚠️ Zona de Peligro</h3>
            <button className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-bold py-3 rounded-lg transition">
              Eliminar Cuenta
            </button>
            <p className="text-xs text-red-600 mt-3">Esta acción es irreversible y eliminará todos tus datos</p>
          </div>
        </div>
      </div>
    </div>
  )
}
