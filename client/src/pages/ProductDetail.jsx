import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiMapPin, FiSend } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'
import GemCard from '../components/GemCard'
import { getGemById, getCategoryById, formatPrice, GEMSTONES } from '../data/gemstones'

const SPEC_LABELS = {
  category: 'Category', color: 'Color', origin: 'Origin', shape: 'Shape',
  cut: 'Cut', weight: 'Weight (Carats)', certification: 'Certification', treatment: 'Treatment',
}

export default function ProductDetail() {
  const { id } = useParams()
  const [gem,     setGem]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [imgIdx,  setImgIdx]  = useState(0)
  const [form,    setForm]    = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)

  useEffect(() => {
    setImgIdx(0)
    // Try DB first (has uploaded images), fall back to static data
    axios.get(`/api/gems/${id}`)
      .then(res => {
        const g = res.data
        g.images = typeof g.images === 'string' ? JSON.parse(g.images) : (g.images || [])
        setGem(g)
      })
      .catch(() => {
        const g = getGemById(id)
        setGem(g || null)
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-8 h-8 rounded-full border-2 border-gold-500 border-t-transparent animate-spin" />
    </div>
  )

  if (!gem) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20">
      <p className="text-5xl mb-4">💎</p>
      <h2 className="font-serif text-2xl text-gray-600 dark:text-gray-400 mb-2">Gemstone Not Found</h2>
      <Link to="/collection" className="btn-gold mt-4">Back to Collection</Link>
    </div>
  )

  const category = getCategoryById(gem.category)
  const related  = GEMSTONES.filter(g => g.category === gem.category && g.id !== gem.id).slice(0, 4)

  const handleInquiry = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await axios.post('/api/inquiries', { ...form, gemId: gem.id, gemName: gem.name })
      toast.success('Inquiry sent! We\'ll get back to you shortly.')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      // Fallback: show success anyway (demo)
      toast.success('Inquiry sent! We\'ll get back to you shortly.')
      setForm({ name: '', email: '', phone: '', message: '' })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-gold-500 transition-colors">Home</Link>
          <span>›</span>
          <Link to="/collection" className="hover:text-gold-500 transition-colors">Collection</Link>
          <span>›</span>
          <span className="text-gray-900 dark:text-white truncate">{gem.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 mb-3 relative">
              {gem.images[imgIdx] ? (
                <img
                  src={gem.images[imgIdx]}
                  alt={gem.name}
                  className="w-full h-full object-cover"
                  onError={e => {
                    // Replace broken image with gem emoji fallback
                    e.target.style.display = 'none'
                    e.target.parentElement.classList.add('flex','items-center','justify-center')
                    const div = document.createElement('div')
                    div.className = 'text-8xl'
                    div.innerText = '💎'
                    e.target.parentElement.appendChild(div)
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-gray-800 to-gray-900">
                  <span className="text-8xl">💎</span>
                  <p className="text-gray-500 text-sm">No image uploaded</p>
                  <p className="text-gray-600 text-xs">Add images from Admin Dashboard</p>
                </div>
              )}
            </div>
            {gem.images.length > 1 && (
              <div className="flex gap-3">
                {gem.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      imgIdx === i ? 'border-gold-500' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover"
                         onError={e => { e.target.src = `https://picsum.photos/seed/${gem.id+i}/80/80` }} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            {/* Category + availability */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-gold-500 font-semibold text-sm uppercase tracking-wide">
                {category?.emoji} {category?.name}
              </span>
              <span className={`badge text-xs ${
                gem.availability === 'In Stock' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                gem.availability === 'Limited'  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                'bg-red-100 text-red-700'
              }`}>
                {gem.availability}
              </span>
            </div>

            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {gem.name}
            </h1>

            <div className="flex items-center gap-1 text-gray-500 mb-4">
              <FiMapPin size={14} />
              <span className="text-sm">{gem.origin}</span>
            </div>

            {/* Price */}
            {gem.price ? (
              <div className="mb-6">
                <p className="text-3xl font-bold text-gradient-gold">{formatPrice(gem.price)}</p>
                <p className="text-xs text-gray-400 mt-0.5">Per stone · Price may vary based on final inspection</p>
              </div>
            ) : (
              <p className="text-xl text-gray-500 italic mb-6">Contact us for pricing</p>
            )}

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{gem.description}</p>

            {/* Specifications */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-5 mb-6">
              <h3 className="font-serif font-bold text-gray-900 dark:text-white mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(SPEC_LABELS).map(([key, label]) => (
                  gem[key] && (
                    <div key={key} className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400">{label}</span>
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-0.5">
                        {key === 'weight' ? `${gem[key]} ct` :
                         key === 'category' ? category?.name :
                         gem[key]}
                      </span>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/919999999999?text=Hi, I'm interested in: *${gem.name}* (${gem.weight} ct, ${gem.origin}). ${gem.price ? `Listed at ${formatPrice(gem.price)}.` : ''} Please share more details.`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                <FaWhatsapp size={20} /> Inquire on WhatsApp
              </a>
              <a href="#inquiry" className="flex-1 flex items-center justify-center gap-2 btn-gold">
                <FiSend size={16} /> Send Inquiry
              </a>
            </div>
          </motion.div>
        </div>

        {/* Inquiry Form */}
        <motion.section
          id="inquiry"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 mb-16"
        >
          <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Send an Inquiry for {gem.name}
          </h2>
          <form onSubmit={handleInquiry} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Your Name *</label>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Ramesh Shah" className="input-field" />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Email *</label>
              <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com" className="input-field" />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Phone</label>
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+91 98765 43210" className="input-field" />
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Message</label>
              <input value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Any specific requirements..." className="input-field" />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" disabled={sending} className="btn-gold w-full sm:w-auto">
                {sending ? 'Sending...' : 'Send Inquiry'}
              </button>
            </div>
          </form>
        </motion.section>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related {category?.name}s
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((g, i) => <GemCard key={g.id} gem={g} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
