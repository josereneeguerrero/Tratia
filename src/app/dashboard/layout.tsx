'use client'

import { useClerkUser } from '@/hooks/useClerkUser'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useClerkUser()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const isActive = (path: string) => pathname === path

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-[#554336]">Cargando dashboard...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#f3f3f3]">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-[#1a1c1c] text-white transition-all duration-300 flex flex-col border-r border-[#554336]/20`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[#554336]/20">
          <Link href="/" className="inline-block">
            {sidebarOpen ? (
              <p className="text-xl font-bold text-[#ffdcc3]">Tratia</p>
            ) : (
              <p className="text-lg font-bold text-[#ffdcc3]">T</p>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2">
          <Link
            href="/dashboard"
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
              isActive('/dashboard')
                ? 'bg-[#8d4b00] text-white'
                : 'text-[#554336] hover:bg-[#2a2d2d]'
            }`}
          >
            <span className="text-xl">📊</span>
            {sidebarOpen && <span>Dashboard</span>}
          </Link>

          <Link
            href="/dashboard/bookings"
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
              isActive('/dashboard/bookings')
                ? 'bg-[#8d4b00] text-white'
                : 'text-[#554336] hover:bg-[#2a2d2d]'
            }`}
          >
            <span className="text-xl">📅</span>
            {sidebarOpen && <span>Citas</span>}
          </Link>

          <Link
            href="/dashboard/services"
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
              isActive('/dashboard/services')
                ? 'bg-[#8d4b00] text-white'
                : 'text-[#554336] hover:bg-[#2a2d2d]'
            }`}
          >
            <span className="text-xl">✨</span>
            {sidebarOpen && <span>Servicios</span>}
          </Link>

          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
              isActive('/dashboard/settings')
                ? 'bg-[#8d4b00] text-white'
                : 'text-[#554336] hover:bg-[#2a2d2d]'
            }`}
          >
            <span className="text-xl">⚙️</span>
            {sidebarOpen && <span>Configuración</span>}
          </Link>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#554336]/20">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full text-[#554336] hover:text-white p-2 rounded transition-colors"
            title={sidebarOpen ? 'Contraer' : 'Expandir'}
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-[#dbc2b0]/30 px-8 py-4 flex items-center justify-between shadow-sm">
          <h1 className="text-2xl font-bold text-[#1a1c1c]">Dashboard</h1>
          <div className="flex items-center gap-6">
            <button className="text-[#554336] hover:text-[#8d4b00] transition-colors">🔔</button>
            <UserButton />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">{children}</main>
      </div>
    </div>
  )
}
