import { useState, useEffect } from 'react'
import { Link, useNavigate, Outlet, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiGrid, FiPlus, FiList, FiUsers, FiMessageSquare,
  FiLogOut, FiMenu, FiX, FiSun, FiMoon
} from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const NAV_ITEMS = [
  { to: '/admin/dashboard',          icon: <FiGrid />,         label: 'Overview' },
  { to: '/admin/dashboard/gems',     icon: <FiList />,         label: 'Manage Gems' },
  { to: '/admin/dashboard/add',      icon: <FiPlus />,         label: 'Add Gem' },
  { to: '/admin/dashboard/visitors', icon: <FiUsers />,        label: 'Visitors' },
  { to: '/admin/dashboard/inquiries',icon: <FiMessageSquare />,label: 'Inquiries' },
]

export default function Dashboard() {
  const { admin, logout } = useAuth()
  const { dark, toggle }  = useTheme()
  const navigate          = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState({ visitors: 0, inquiries: 0, gems: 52 })

  useEffect(() => {
    if (!admin) { navigate('/admin'); return }
    axios.get('/api/visitors/stats').then(r => setStats(s => ({ ...s, ...r.data }))).catch(() => {})
    axios.get('/api/inquiries/count').then(r => setStats(s => ({ ...s, inquiries: r.data.count }))).catch(() => {})
  }, [admin, navigate])

  const handleLogout = () => {
    logout()
    toast.success('Logged out')
    navigate('/admin')
  }

  if (!admin) return null

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-950 text-white flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex`}>
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center">
              <span className="text-white font-bold text-xs">RG</span>
            </div>
            <div>
              <p className="font-serif font-bold text-white text-sm">Raj Gems</p>
              <p className="text-[10px] text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive ? 'bg-gold-500 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {icon} {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button onClick={toggle} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            {dark ? <FiSun /> : <FiMoon />} {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-white hover:bg-red-500/20 transition-all">
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(o => !o)} className="lg:hidden p-2 rounded-lg text-gray-500">
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Welcome back, <span className="text-gold-500">{admin.username}</span>
          </p>
          <Link to="/" className="text-xs text-gray-400 hover:text-gold-500 transition-colors">← View Site</Link>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet context={{ stats, setStats }} />
        </main>
      </div>
    </div>
  )
}
