'use client'

import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function PersonalizedSignupForm() {
  const { signUp } = useSignUp()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return

    setError('')
    setLoading(true)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    // Validate password strength
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      setLoading(false)
      return
    }

    try {
      await signUp?.create({
        emailAddress: email,
        password,
      })

      // Clerk handles the session, just redirect
      router.push('/onboarding')
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || 'No pudimos crear tu cuenta')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-[#1a1c1c] mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className="w-full px-4 py-3 bg-[#f9f7f5] border border-[#dbc2b0] rounded-lg text-[#1a1c1c] placeholder-[#999] focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20 transition"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-semibold text-[#1a1c1c] mb-2">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 8 caracteres"
          required
          className="w-full px-4 py-3 bg-[#f9f7f5] border border-[#dbc2b0] rounded-lg text-[#1a1c1c] placeholder-[#999] focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20 transition"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-semibold text-[#1a1c1c] mb-2">Confirmar Contraseña</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repite tu contraseña"
          required
          className="w-full px-4 py-3 bg-[#f9f7f5] border border-[#dbc2b0] rounded-lg text-[#1a1c1c] placeholder-[#999] focus:outline-none focus:border-[#8d4b00] focus:ring-2 focus:ring-[#8d4b00]/20 transition"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Terms Agreement */}
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="terms"
          required
          className="mt-1 w-4 h-4 rounded border-[#dbc2b0] text-[#8d4b00] focus:ring-[#8d4b00]"
        />
        <label htmlFor="terms" className="text-xs text-[#554336]">
          Acepto los{' '}
          <a href="#" className="text-[#8d4b00] hover:text-[#6e3900] font-medium">
            términos de servicio
          </a>{' '}
          y la{' '}
          <a href="#" className="text-[#8d4b00] hover:text-[#6e3900] font-medium">
            política de privacidad
          </a>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#8d4b00] hover:bg-[#6e3900] disabled:bg-[#b4a99f] text-white font-bold py-3 px-4 rounded-lg transition duration-200"
      >
        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>

      {/* Already have account */}
      <div className="text-center text-sm text-[#554336]">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="text-[#8d4b00] font-bold hover:text-[#6e3900]">
          Inicia sesión
        </Link>
      </div>
    </form>
  )
}
