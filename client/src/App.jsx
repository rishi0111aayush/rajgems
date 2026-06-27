import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useState, useEffect } from 'react'

import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider }  from './context/AuthContext'
import { useVisitorTracking } from './hooks/useVisitorTracking'

import Navbar      from './components/Navbar'
import Footer      from './components/Footer'
import BackToTop   from './components/BackToTop'
import LoadingScreen from './components/LoadingScreen'

import Home          from './pages/Home'
import Collection    from './pages/Collection'
import ProductDetail from './pages/ProductDetail'
import Categories    from './pages/Categories'
import CategoryDetail from './pages/CategoryDetail'
import Gallery       from './pages/Gallery'
import About         from './pages/About'
import Contact       from './pages/Contact'
import IndiaGems    from './pages/IndiaGems'

import AdminLogin    from './pages/admin/Login'
import Dashboard     from './pages/admin/Dashboard'
import Overview      from './pages/admin/Overview'
import AddGem        from './pages/admin/AddGem'
import ManageGems    from './pages/admin/ManageGems'
import EditGem       from './pages/admin/EditGem'
import Visitors      from './pages/admin/Visitors'
import Inquiries     from './pages/admin/Inquiries'

// Tracks every page visit automatically
function VisitorTracker() {
  useVisitorTracking()
  return null
}

function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          {loading && <LoadingScreen />}

          <Toaster
            position="top-right"
            toastOptions={{
              className: 'font-sans text-sm',
              style: { background: '#1a1a2e', color: '#fff', border: '1px solid rgba(212,175,55,0.3)' },
            }}
          />

          <VisitorTracker />
          <Routes>
            {/* Public */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/collection" element={<PublicLayout><Collection /></PublicLayout>} />
            <Route path="/gemstone/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
            <Route path="/categories" element={<PublicLayout><Categories /></PublicLayout>} />
            <Route path="/categories/:id" element={<PublicLayout><CategoryDetail /></PublicLayout>} />
            <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
            <Route path="/india-gems" element={<PublicLayout><IndiaGems /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Dashboard />}>
              <Route index element={<Overview />} />
              <Route path="gems"      element={<ManageGems />} />
              <Route path="add"       element={<AddGem />} />
              <Route path="edit/:id"  element={<EditGem />} />
              <Route path="visitors"  element={<Visitors />} />
              <Route path="inquiries" element={<Inquiries />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
