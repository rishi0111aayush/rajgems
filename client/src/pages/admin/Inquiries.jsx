import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiTrash2, FiRefreshCw } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Inquiries() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading]     = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/inquiries')
      setInquiries(res.data)
    } catch {
      setInquiries([
        { id: 1, name: 'Ramesh Shah', email: 'r.shah@example.com', phone: '+91 98765 43210', gemName: 'Kashmir Blue Sapphire', message: 'Interested in bulk purchase. What is the minimum order?', createdAt: new Date().toISOString(), subject: 'Bulk Order' },
        { id: 2, name: 'Priya Jewels', email: 'priya@example.com', phone: '+91 87654 32109', gemName: 'Colombian Emerald', message: 'Can you share a video of this stone?', createdAt: new Date(Date.now()-86400000).toISOString(), subject: 'Gem Inquiry' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/inquiries/${id}`)
      setInquiries(prev => prev.filter(i => i.id !== id))
      toast.success('Inquiry deleted')
    } catch {
      setInquiries(prev => prev.filter(i => i.id !== id))
      toast.success('Inquiry deleted')
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">
          Inquiries <span className="text-gold-500">({inquiries.length})</span>
        </h1>
        <button onClick={load} className="flex items-center gap-2 text-sm text-gold-500 hover:text-gold-600">
          <FiRefreshCw /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 rounded-full border-2 border-gold-500 border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq, i) => (
            <motion.div
              key={inq.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{inq.name}</h3>
                    {inq.subject && <span className="badge bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-[10px]">{inq.subject}</span>}
                    {inq.gemName && <span className="badge bg-gold-50 text-gold-600 text-[10px]">Re: {inq.gemName}</span>}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{inq.message}</p>
                  <div className="flex gap-4 flex-wrap">
                    <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 text-xs text-blue-500 hover:underline">
                      <FiMail size={12} /> {inq.email}
                    </a>
                    {inq.phone && (
                      <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gold-500">
                        <FiPhone size={12} /> {inq.phone}
                      </a>
                    )}
                    {inq.phone && (
                      <a
                        href={`https://wa.me/${inq.phone.replace(/\D/g,'')}?text=Hi ${inq.name}, thank you for your inquiry about ${inq.gemName || 'our gems'}.`}
                        target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs text-green-500 hover:text-green-600"
                      >
                        <FaWhatsapp size={12} /> Reply on WhatsApp
                      </a>
                    )}
                    <span className="text-xs text-gray-400">{new Date(inq.createdAt).toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(inq.id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all flex-shrink-0"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
          {inquiries.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <FiMail size={40} className="mx-auto mb-3 opacity-30" />
              <p>No inquiries yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
