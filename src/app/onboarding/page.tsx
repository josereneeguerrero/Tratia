'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function OnboardingPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    salon_name: '',
    phone: '',
  })

  // Si no hay usuario, redirigir a signup
  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/signup')
    }
  }, [isLoaded, user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()

      // Crear registro de usuario en Supabase
      const { error: supabaseError } = await supabase.from('users').insert({
        id: user?.id,
        email: user?.primaryEmailAddress?.emailAddress,
        full_name: user?.fullName || '',
        salon_name: formData.salon_name,
        phone: formData.phone || null,
        subscription_plan: 'free',
      })

      if (supabaseError) {
        setError('Error al guardar datos: ' + supabaseError.message)
        return
      }

      // Redirigir a dashboard
      router.push('/dashboard')
    } catch (err) {
      setError('Error: ' + (err instanceof Error ? err.message : 'Intenta de nuevo'))
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#554336]">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fdfcfb] to-[#f7f5f2] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-[#ffdcc3] rounded-full">
            <p className="text-sm font-bold text-[#8d4b00]">Paso 1 de 1</p>
          </div>
          <h1 className="text-3xl font-bold text-[#1a1c1c] mb-2">Completa tu perfil</h1>
          <p className="text-[#554336]">Cuéntanos sobre tu salón</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-[2rem] border border-[#dbc2b0]/30 shadow-[0_20px_40px_-10px_rgba(85,67,54,0.08)] p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre del Salón */}
            <div>
              <label htmlFor="salon_name" className="block text-sm font-bold text-[#1a1c1c] mb-2">
                Nombre del salón *
              </label>
              <input
                id="salon_name"
                type="text"
                required
                placeholder="Ej: Salón María's Beauty"
                value={formData.salon_name}
                onChange={(e) => setFormData({ ...formData, salon_name: e.target.value })}
                className="w-full px-4 py-3 border border-[#dbc2b0] rounded-lg bg-white text-[#1a1c1c] placeholder-[#554336] focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20 transition"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-[#1a1c1c] mb-2">
                Teléfono (opcional)
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Ej: +504 9876 5432"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-[#dbc2b0] rounded-lg bg-white text-[#1a1c1c] placeholder-[#554336] focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8d4b00] hover:bg-[#6e3900] disabled:bg-[#b4a99f] text-white font-bold py-3 rounded-full transition duration-200 transform hover:scale-105"
            >
              {loading ? 'Guardando...' : 'Continuar al Dashboard'}
            </button>
          </form>

          {/* Info */}
          <p className="mt-6 text-xs text-[#554336] text-center">
            Hola, <strong>{user.fullName || user.primaryEmailAddress?.emailAddress}</strong>. Estos datos ayudan a
            personalizar tu experiencia.
          </p>
        </div>
      </div>
    </div>
  )
}
