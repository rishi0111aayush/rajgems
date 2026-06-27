import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiUpload, FiX, FiCheck, FiImage, FiAlertCircle } from 'react-icons/fi'
import axios from 'axios'
import toast from 'react-hot-toast'
import { CATEGORIES } from '../../data/gemstones'

const INITIAL = {
  name: '', category: '', color: '', origin: '', shape: '', cut: '',
  weight: '', price: '', availability: 'In Stock', certification: 'Uncertified',
  treatment: 'None', description: '', shortDesc: '', featured: false,
}

export default function AddGem() {
  const [form, setForm]         = useState(INITIAL)
  const [images, setImages]     = useState([])
  const [previews, setPreviews] = useState([])
  const [uploading, setUploading] = useState(false)
  const [dragging, setDragging]   = useState(false)
  const fileInputRef = useRef()

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const addFiles = (files) => {
    const valid = files.filter(f => f.type.startsWith('image/'))
    if (!valid.length) { toast.error('Only image files are allowed'); return }
    setImages(prev => [...prev, ...valid])
    setPreviews(prev => [...prev, ...valid.map(f => URL.createObjectURL(f))])
  }

  const handleImages = (e) => addFiles(Array.from(e.target.files))

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    addFiles(Array.from(e.dataTransfer.files))
  }

  const removeImage = (i) => {
    setImages(prev => prev.filter((_, idx) => idx !== i))
    setPreviews(prev => prev.filter((_, idx) => idx !== i))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.category) { toast.error('Name and Category are required'); return }
    setUploading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      images.forEach(img => fd.append('images', img))
      await axios.post('/api/gems', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      toast.success('Gemstone added! It is now live on the site.')
      setForm(INITIAL)
      setImages([])
      setPreviews([])
    } catch (err) {
      const msg = err?.response?.data?.error || 'Failed to save. Make sure the server is running.'
      toast.error(msg)
    } finally {
      setUploading(false)
    }
  }

  const Field = ({ label, name, type = 'text', placeholder, children }) => (
    <div>
      <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block font-medium">{label}</label>
      {children ?? (
        <input type={type} value={form[name]} onChange={set(name)}
          placeholder={placeholder} className="input-field" />
      )}
    </div>
  )

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Add New Gemstone</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Section title="Basic Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Gemstone Name *" name="name" placeholder="Burmese Pigeon Blood Ruby" />
            <Field label="Category *" name="category">
              <select required value={form.category} onChange={set('category')} className="input-field">
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>
            <Field label="Color" name="color" placeholder="Pigeon Blood Red" />
            <Field label="Origin" name="origin" placeholder="Mogok, Myanmar" />
            <Field label="Shape" name="shape" placeholder="Oval" />
            <Field label="Cut" name="cut" placeholder="Brilliant" />
            <Field label="Weight (Carats) *" name="weight" type="number" placeholder="3.12" />
            <Field label="Price (₹)" name="price" type="number" placeholder="285000" />
            <Field label="Availability" name="availability">
              <select value={form.availability} onChange={set('availability')} className="input-field">
                <option>In Stock</option>
                <option>Limited</option>
                <option>Sold</option>
              </select>
            </Field>
            <Field label="Certification" name="certification">
              <select value={form.certification} onChange={set('certification')} className="input-field">
                <option>Uncertified</option>
                <option>GIA Certified</option>
                <option>GRS Certified</option>
                <option>IGI Certified</option>
                <option>Certified Natural</option>
              </select>
            </Field>
            <Field label="Treatment" name="treatment" placeholder="Heat Treated / None" />
          </div>
          <label className="flex items-center gap-2 mt-2 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={set('featured')} className="w-4 h-4 accent-gold-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Mark as Featured</span>
          </label>
        </Section>

        {/* Descriptions */}
        <Section title="Descriptions">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block font-medium">Short Description (card preview) *</label>
            <input value={form.shortDesc} onChange={set('shortDesc')} maxLength={120}
              placeholder="One-line summary shown on cards..." className="input-field" />
            <p className="text-xs text-gray-400 mt-1">{form.shortDesc.length}/120 characters</p>
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block font-medium">Full Description *</label>
            <textarea value={form.description} onChange={set('description')} rows={5}
              placeholder="Detailed description including geological characteristics, quality markers..." className="input-field resize-none" />
          </div>
        </Section>

        {/* Images */}
        <Section title="Gem Images">
          {/* Info banner */}
          <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 text-sm text-blue-700 dark:text-blue-300">
            <FiAlertCircle className="flex-shrink-0 mt-0.5" size={16} />
            <p>Images are saved on the server and appear <strong>live on the website immediately</strong> after you save.</p>
          </div>

          {/* Drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200
              ${dragging
                ? 'border-gold-500 bg-gold-50 dark:bg-gold-900/20 scale-[1.01]'
                : 'border-gray-300 dark:border-gray-700 hover:border-gold-500 bg-gray-50 dark:bg-gray-800'
              }`}
          >
            <FiUpload size={32} className={`mb-3 transition-colors ${dragging ? 'text-gold-500' : 'text-gray-400'}`} />
            <p className="font-semibold text-gray-700 dark:text-gray-300 text-sm">
              {dragging ? 'Drop images here!' : 'Click to upload or drag & drop'}
            </p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP · Up to 10 MB each · Multiple files OK</p>
            <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleImages} className="hidden" />
          </div>

          {/* Previews */}
          {previews.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">{previews.length} image{previews.length > 1 ? 's' : ''} selected · First image = main card image</p>
              <div className="flex gap-3 flex-wrap">
                {previews.map((src, i) => (
                  <div key={i} className="relative group/img">
                    <div className={`w-24 h-24 rounded-xl overflow-hidden border-2 ${i === 0 ? 'border-gold-500' : 'border-gray-200 dark:border-gray-700'}`}>
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                    {i === 0 && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] bg-gold-500 text-white px-1.5 py-0.5 rounded-full whitespace-nowrap">
                        Main
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center shadow opacity-0 group-hover/img:opacity-100 transition-opacity"
                    >
                      <FiX size={10} />
                    </button>
                  </div>
                ))}
                {/* Add more button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center text-gray-400 hover:border-gold-500 hover:text-gold-500 transition-colors"
                >
                  <FiImage size={18} />
                  <span className="text-[10px] mt-1">Add more</span>
                </button>
              </div>
            </div>
          )}
        </Section>

        <button type="submit" disabled={uploading} className="btn-gold flex items-center gap-2">
          {uploading ? 'Saving...' : <><FiCheck /> Save Gemstone</>}
        </button>
      </form>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6"
    >
      <h2 className="font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </motion.div>
  )
}
