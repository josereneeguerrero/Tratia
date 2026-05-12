'use client'

import { SignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#fdfcfb] to-[#f7f5f2] px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block mb-6">
            <p className="text-3xl font-bold text-[#8d4b00] tracking-tight">Tratia</p>
          </Link>
          <h1 className="text-3xl font-bold text-[#1a1c1c] mb-2">Bienvenido</h1>
          <p className="text-[#554336]">Ingresa a tu cuenta de salón</p>
        </div>

        {/* Clerk SignIn Component - Personalizado */}
        <div className="bg-white rounded-[2rem] border border-[#dbc2b0]/30 shadow-[0_20px_40px_-10px_rgba(85,67,54,0.08)] p-8">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: 'bg-[#8d4b00] hover:bg-[#6e3900] text-white font-bold rounded-full py-2.5',
                card: 'shadow-none border-0 bg-transparent',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton: 'border border-[#dbc2b0] hover:bg-[#f3f3f3] text-[#1a1c1c] rounded-full',
                formFieldInput: 'border-[#dbc2b0] rounded-lg focus:border-[#8d4b00] focus:ring-[#8d4b00]',
                formFieldLabel: 'text-[#1a1c1c] font-medium',
                footerActionLink: 'text-[#8d4b00] hover:text-[#6e3900]',
                dividerLine: 'bg-[#dbc2b0]/30',
                dividerText: 'text-[#554336]',
              },
              layout: {
                socialButtonsPlacement: 'bottom',
              },
            }}
          />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-[#554336]">
          ¿No tienes cuenta?{' '}
          <Link href="/signup" className="text-[#8d4b00] font-bold hover:text-[#6e3900]">
            Regístrate aquí
          </Link>
        </div>

        {/* Back to home */}
        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-[#554336] hover:text-[#8d4b00] transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
