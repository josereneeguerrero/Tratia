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

      router.push('/onboarding')
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || 'No pudimos crear tu cuenta')
      setLoading(false)
    }
  }

  const handleSocialAuth = async (strategy: 'oauth_google' | 'oauth_facebook' | 'oauth_apple') => {
    if (!signUp) return

    try {
      await (signUp as any).authenticateWithRedirect({
        strategy,
        redirectUrl: '/signup-verify',
        redirectUrlComplete: '/onboarding',
      })
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || 'Error con la autenticación social')
    }
  }

  return (
    <div className="space-y-6">
      {/* Social Signup Buttons */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => handleSocialAuth('oauth_google')}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#dbc2b0] hover:bg-[#f9f7f5] rounded-lg text-[#1a1c1c] font-semibold transition"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>

        <button
          type="button"
          onClick={() => handleSocialAuth('oauth_facebook')}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#dbc2b0] hover:bg-[#f9f7f5] rounded-lg text-[#1a1c1c] font-semibold transition"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </button>

        <button
          type="button"
          onClick={() => handleSocialAuth('oauth_apple')}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-[#dbc2b0] hover:bg-[#f9f7f5] rounded-lg text-[#1a1c1c] font-semibold transition"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.12-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.05 2.29.89 3.08.89.79 0 2.38-1.1 4.02-.96 1.71.15 2.98.82 3.79 2.65-3.57 2.08-2.95 6.58.5 7.77-.52 1.45-1.47 2.65-2.84 3.33l-.53-.03z"/>
          </svg>
          Apple
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#dbc2b0]/30"></div>
        <span className="text-sm text-[#554336] font-medium">o con email</span>
        <div className="flex-1 h-px bg-[#dbc2b0]/30"></div>
      </div>

      {/* Email Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
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
    </div>
  )
}
