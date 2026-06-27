import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiMenu, FiX, FiSearch } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { to: '/',           label: 'Home' },
  { to: '/collection', label: 'Collection' },
  { to: '/categories', label: 'Categories' },
  { to: '/india-gems', label: "India's Gems ★" },
  { to: '/gallery',    label: 'Gallery' },
  { to: '/about',      label: 'About' },
  { to: '/contact',    label: 'Contact' },
]

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery]     = useState('')
  const navigate              = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/collection?search=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
      setQuery('')
    }
  }

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold">
              <span className="text-white font-bold text-sm">RG</span>
            </div>
            <div>
              <span className="font-serif text-xl font-bold text-gray-900 dark:text-white group-hover:text-gold-500 transition-colors">
                Raj Gems
              </span>
              <p className="text-[9px] text-gold-500 tracking-widest uppercase -mt-0.5 hidden sm:block">
                Premium Gemstones
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-gold-500 bg-gold-50 dark:bg-gold-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-900/20'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(s => !s)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-all"
              aria-label="Search"
            >
              <FiSearch size={18} />
            </button>

            {/* Dark mode */}
            <button
              onClick={toggle}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-900/20 transition-all"
              aria-label="Toggle theme"
            >
              {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            {/* Admin */}
            <Link
              to="/admin"
              className="hidden sm:inline-flex btn-gold text-sm px-4 py-2"
            >
              Admin
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen(o => !o)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300"
              aria-label="Menu"
            >
              {open ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pb-3"
            >
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  autoFocus
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search gemstones by name, color, origin..."
                  className="input-field"
                />
                <button type="submit" className="btn-gold whitespace-nowrap">Search</button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 px-4 pb-4"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive ? 'text-gold-500 bg-gold-50 dark:bg-gold-900/20' : 'text-gray-700 dark:text-gray-300'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link to="/admin" onClick={() => setOpen(false)} className="block mt-2 btn-gold text-center text-sm">
              Admin Dashboard
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
