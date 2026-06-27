import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiGlobe, FiClock, FiMonitor, FiRefreshCw } from 'react-icons/fi'
import axios from 'axios'

export default function Visitors() {
  const [visitors, setVisitors] = useState([])
  const [stats, setStats]       = useState({ total: 0, today: 0, unique: 0 })
  const [loading, setLoading]   = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const [vRes, sRes] = await Promise.all([
        axios.get('/api/visitors'),
        axios.get('/api/visitors/stats'),
      ])
      setVisitors(vRes.data)
      setStats(sRes.data)
    } catch {
      // Demo fallback
      setVisitors([
        { id: 1, ip: '103.xx.xx.xx', page: '/collection', userAgent: 'Chrome 120 / Windows', createdAt: new Date().toISOString(), country: 'India' },
        { id: 2, ip: '49.xx.xx.xx',  page: '/',           userAgent: 'Safari / iOS',         createdAt: new Date(Date.now()-3600000).toISOString(), country: 'India' },
        { id: 3, ip: '74.xx.xx.xx',  page: '/gemstone/7', userAgent: 'Firefox / macOS',       createdAt: new Date(Date.now()-7200000).toISOString(), country: 'USA' },
      ])
      setStats({ total: 3, today: 2, unique: 3 })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const STAT_CARDS = [
    { icon: <FiGlobe   />, label: 'Total Visits',  value: stats.total,  color: 'text-blue-500'  },
    { icon: <FiClock   />, label: 'Today',         value: stats.today,  color: 'text-gold-500'  },
    { icon: <FiMonitor />, label: 'Unique Visitors',value: stats.unique, color: 'text-green-500' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">Visitor Analytics</h1>
        <button onClick={load} className="flex items-center gap-2 text-sm text-gold-500 hover:text-gold-600">
          <FiRefreshCw /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {STAT_CARDS.map(({ icon, label, value, color }) => (
          <div key={label} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 text-center">
            <div className={`text-2xl ${color} mb-1 flex justify-center`}>{icon}</div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="font-semibold text-gray-900 dark:text-white">Recent Visits</h2>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 rounded-full border-2 border-gold-500 border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  {['IP Address', 'Page Visited', 'Device / Browser', 'Country', 'Time'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] uppercase tracking-wider text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visitors.map((v, i) => (
                  <motion.tr
                    key={v.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-5 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">{v.ip}</td>
                    <td className="px-5 py-3 text-blue-500 text-xs">{v.page}</td>
                    <td className="px-5 py-3 text-gray-600 dark:text-gray-400 text-xs">{v.userAgent}</td>
                    <td className="px-5 py-3 text-gray-600 dark:text-gray-400 text-xs">{v.country || '—'}</td>
                    <td className="px-5 py-3 text-gray-400 text-xs">
                      {new Date(v.createdAt).toLocaleString('en-IN')}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {visitors.length === 0 && (
              <p className="text-center text-gray-400 py-8">No visitors recorded yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
