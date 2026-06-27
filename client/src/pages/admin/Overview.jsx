import { useOutletContext } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUsers, FiMessageSquare, FiPackage, FiTrendingUp } from 'react-icons/fi'
import { useGems } from '../../hooks/useGems'

export default function Overview() {
  const { stats } = useOutletContext()
  const { gems, loading: gemsLoading } = useGems()

  const inStock = gems.filter(g => g.availability === 'In Stock').length

  const STAT_CARDS = [
    { icon: <FiPackage size={22} />, label: 'Total Gems',    value: gemsLoading ? '…' : gems.length, color: 'from-blue-500 to-blue-600', change: 'DB + catalogue' },
    { icon: <FiUsers   size={22} />, label: 'Site Visitors', value: stats.visitors  || '—', color: 'from-gold-500 to-gold-600',   change: 'All time' },
    { icon: <FiMessageSquare size={22} />, label: 'Inquiries', value: stats.inquiries || '—', color: 'from-green-500 to-green-600', change: 'Total received' },
    { icon: <FiTrendingUp size={22} />, label: 'In Stock', value: gemsLoading ? '…' : inStock, color: 'from-purple-500 to-purple-600', change: 'Available now' },
  ]

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard Overview</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map(({ icon, label, value, color, change }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3`}>
              {icon}
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
            <p className="text-[10px] text-green-500 mt-1">{change}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent gems table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 dark:text-white">Recent Gemstones</h2>
          <a href="/admin/dashboard/gems" className="text-xs text-gold-500 hover:underline">View all</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {['Name', 'Category', 'Weight', 'Price', 'Status'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] uppercase tracking-wider text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gems.slice(0, 8).map((gem, i) => (
                <motion.tr
                  key={gem.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {gem.images?.[0] ? (
                        <img src={gem.images[0]} alt="" className="w-8 h-8 rounded-lg object-cover"
                             onError={e => { e.target.style.display = 'none' }} />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-base">💎</div>
                      )}
                      <span className="font-medium text-gray-900 dark:text-white truncate max-w-[150px]">{gem.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 capitalize text-gray-600 dark:text-gray-400">{gem.category}</td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{gem.weight} ct</td>
                  <td className="px-5 py-3 text-gray-900 dark:text-white font-medium">
                    {gem.price ? `₹${Number(gem.price).toLocaleString('en-IN')}` : '—'}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`badge text-[10px] ${
                      gem.availability === 'In Stock' ? 'bg-green-100 text-green-700' :
                      gem.availability === 'Limited'  ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>{gem.availability}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
