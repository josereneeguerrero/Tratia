'use client'

import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function PersonalizedLoginForm() {
  const { signIn } = useSignIn()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return

    setError('')
    setLoading(true)

    try {
      await signIn?.create({
        identifier: email,
        password,
      })

      // Clerk handles the session, just redirect
      router.push('/dashboard')
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || 'Email o contraseña incorrectos')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          placeholder="••••••••"
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#8d4b00] hover:bg-[#6e3900] disabled:bg-[#b4a99f] text-white font-bold py-3 px-4 rounded-lg transition duration-200"
      >
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>

      {/* Forgot Password Link */}
      <div className="text-center">
        <a href="#" className="text-sm text-[#8d4b00] hover:text-[#6e3900] font-medium">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </form>
  )
}
