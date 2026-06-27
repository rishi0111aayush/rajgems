import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiUpload, FiX, FiCheck, FiImage, FiLink,
  FiAlertCircle, FiArrowLeft, FiTrash2
} from 'react-icons/fi'
import axios from 'axios'
import toast from 'react-hot-toast'
import { CATEGORIES, GEMSTONES, getCategoryById } from '../../data/gemstones'
import { CATEGORY_GRADIENTS } from '../../constants/gradients'

export default function EditGem() {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const fileRef    = useRef()

  // Load gem — check DB first, fall back to static data
  const [form,       setForm]       = useState(null)
  const [existingImgs, setExistingImgs] = useState([])  // already-saved image URLs
  const [newFiles,   setNewFiles]   = useState([])      // new File objects to upload
  const [newPreviews, setNewPreviews] = useState([])    // preview URLs for new files
  const [urlInput,   setUrlInput]   = useState('')      // paste-a-URL
  const [dragging,   setDragging]   = useState(false)
  const [saving,     setSaving]     = useState(false)
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    // Try backend first
    axios.get(`/api/gems/${id}`)
      .then(res => {
        const g = res.data
        g.images = typeof g.images === 'string' ? JSON.parse(g.images) : (g.images || [])
        setForm(gemToForm(g))
        setExistingImgs(g.images)
      })
      .catch(() => {
        // Gem not in DB — load from static data
        const g = GEMSTONES.find(gem => gem.id === parseInt(id))
        if (g) {
          setForm(gemToForm(g))
          setExistingImgs(g.images || [])
        } else {
          toast.error('Gem not found')
          navigate('/admin/dashboard/gems')
        }
      })
      .finally(() => setLoading(false))
  }, [id])

  const gemToForm = (g) => ({
    name:          g.name         || '',
    category:      g.category     || '',
    color:         g.color        || '',
    origin:        g.origin       || '',
    shape:         g.shape        || '',
    cut:           g.cut          || '',
    weight:        g.weight       || '',
    price:         g.price        || '',
    availability:  g.availability || 'In Stock',
    certification: g.certification|| 'Uncertified',
    treatment:     g.treatment    || 'None',
    description:   g.description  || '',
    shortDesc:     g.shortDesc    || '',
    featured:      g.featured     || false,
  })

  const set = (k) => (e) =>
    setForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  // ── File uploads ──────────────────────────────────────────────────────────
  const addFiles = (files) => {
    const valid = Array.from(files).filter(f => f.type.startsWith('image/'))
    if (!valid.length) { toast.error('Only image files allowed'); return }
    setNewFiles(prev => [...prev, ...valid])
    setNewPreviews(prev => [...prev, ...valid.map(f => URL.createObjectURL(f))])
  }

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  const removeExisting = (i) => setExistingImgs(prev => prev.filter((_, idx) => idx !== i))
  const removeNew      = (i) => {
    setNewFiles(prev    => prev.filter((_, idx) => idx !== i))
    setNewPreviews(prev => prev.filter((_, idx) => idx !== i))
  }

  // ── Paste URL ─────────────────────────────────────────────────────────────
  const addUrl = () => {
    const url = urlInput.trim()
    if (!url) return
    if (!url.startsWith('http')) { toast.error('Enter a valid http(s) URL'); return }
    setExistingImgs(prev => [...prev, url])
    setUrlInput('')
    toast.success('Image URL added')
  }

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      // Pass existing image URLs so backend keeps them
      fd.append('existingImages', JSON.stringify(existingImgs))
      // Append new files
      newFiles.forEach(f => fd.append('images', f))

      // Try PUT (update existing DB gem) — if 404, promote static gem to DB with same id
      try {
        await axios.put(`/api/gems/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      } catch (putErr) {
        if (putErr?.response?.status === 404) {
          // Static gem not in DB yet — insert it preserving its original id
          fd.append('id', id)
          await axios.post('/api/gems', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        } else throw putErr
      }

      toast.success('Gemstone saved! Images are live on the site.')
      navigate('/admin/dashboard/gems')
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Save failed — is the server running?')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 rounded-full border-2 border-gold-500 border-t-transparent animate-spin" />
    </div>
  )

  if (!form) return null

  const gradient = CATEGORY_GRADIENTS[form.category] || CATEGORY_GRADIENTS.other
  const category = getCategoryById(form.category)
  const totalImages = existingImgs.length + newPreviews.length

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/admin/dashboard/gems')}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors">
          <FiArrowLeft />
        </button>
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-900 dark:text-white">Edit Gemstone</h1>
          <p className="text-sm text-gray-500 mt-0.5">ID #{id} · Changes go live immediately</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">

        {/* ── IMAGE MANAGER ─────────────────────────────────────────────── */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          {/* Colored top bar */}
          <div className="h-1" style={{ background: `linear-gradient(90deg, ${gradient.from}, ${gradient.via}, ${gradient.to})` }} />

          <div className="p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
              <FiImage className="text-gold-500" /> Gem Images
              <span className="text-xs text-gray-400 font-normal ml-1">
                {totalImages} image{totalImages !== 1 ? 's' : ''} · First image = main display
              </span>
            </h2>
            <p className="text-xs text-gray-400 mb-5">
              Upload your own photos <strong>or</strong> paste an image URL from Google Images, Wikipedia, etc.
            </p>

            {/* Current images */}
            {(existingImgs.length > 0 || newPreviews.length > 0) && (
              <div className="mb-5">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                  Current Images
                </p>
                <div className="flex gap-3 flex-wrap">
                  {existingImgs.map((src, i) => (
                    <ImageThumb
                      key={`existing-${i}`}
                      src={src}
                      isMain={i === 0 && newPreviews.length === 0}
                      onRemove={() => removeExisting(i)}
                    />
                  ))}
                  {newPreviews.map((src, i) => (
                    <ImageThumb
                      key={`new-${i}`}
                      src={src}
                      isMain={existingImgs.length === 0 && i === 0}
                      isNew
                      onRemove={() => removeNew(i)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Drop zone */}
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true) }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
              className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 mb-4
                ${dragging
                  ? 'border-gold-500 bg-gold-50 dark:bg-gold-900/20 scale-[1.01]'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gold-500 bg-gray-50 dark:bg-gray-800/50'
                }`}
            >
              <FiUpload size={28} className={`mb-2 transition-colors ${dragging ? 'text-gold-500' : 'text-gray-400'}`} />
              <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                {dragging ? 'Drop here!' : 'Upload Photos'}
              </p>
              <p className="text-xs text-gray-400 mt-1">Drag & drop · Click to browse · JPG, PNG, WEBP</p>
              <input ref={fileRef} type="file" multiple accept="image/*"
                onChange={e => addFiles(e.target.files)} className="hidden" />
            </div>

            {/* Paste URL */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <FiLink className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  value={urlInput}
                  onChange={e => setUrlInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addUrl())}
                  placeholder="Or paste image URL from Google, Wikipedia, etc…"
                  className="input-field pl-9 text-sm"
                />
              </div>
              <button type="button" onClick={addUrl}
                className="px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white text-sm font-semibold transition-colors whitespace-nowrap">
                Add URL
              </button>
            </div>

            <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
              <FiAlertCircle size={11} />
              Tip: Right-click any gem image online → "Copy image address" → paste above
            </p>
          </div>
        </div>

        {/* ── GEM DETAILS ─────────────────────────────────────────────────── */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
            Gem Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name *"       value={form.name}     onChange={set('name')}    placeholder="Burmese Ruby" />
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block font-medium">Category *</label>
              <select required value={form.category} onChange={set('category')} className="input-field">
                <option value="">Select</option>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <Field label="Color"        value={form.color}    onChange={set('color')}   placeholder="Pigeon Blood Red" />
            <Field label="Origin"       value={form.origin}   onChange={set('origin')}  placeholder="Mogok, Myanmar" />
            <Field label="Shape"        value={form.shape}    onChange={set('shape')}   placeholder="Oval" />
            <Field label="Cut"          value={form.cut}      onChange={set('cut')}     placeholder="Brilliant" />
            <Field label="Weight (ct)"  value={form.weight}   onChange={set('weight')}  placeholder="3.12" type="number" />
            <Field label="Price (₹)"    value={form.price}    onChange={set('price')}   placeholder="285000"  type="number" />
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block font-medium">Availability</label>
              <select value={form.availability} onChange={set('availability')} className="input-field">
                {['In Stock', 'Limited', 'Sold'].map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block font-medium">Certification</label>
              <select value={form.certification} onChange={set('certification')} className="input-field">
                {['Uncertified', 'GIA Certified', 'GRS Certified', 'IGI Certified', 'Certified Natural'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <Field label="Treatment"   value={form.treatment} onChange={set('treatment')} placeholder="None / Heat Treated" />
          </div>
          <label className="flex items-center gap-2 mt-4 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={set('featured')} className="w-4 h-4 accent-gold-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Mark as Featured</span>
          </label>
        </div>

        {/* ── DESCRIPTIONS ────────────────────────────────────────────────── */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
            Descriptions
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block font-medium">
                Short Description <span className="text-gray-400 font-normal">(shown on cards)</span>
              </label>
              <input value={form.shortDesc} onChange={set('shortDesc')} maxLength={120}
                placeholder="One-line summary…" className="input-field" />
              <p className="text-xs text-gray-400 mt-1">{(form.shortDesc || '').length}/120</p>
            </div>
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block font-medium">Full Description</label>
              <textarea value={form.description} onChange={set('description')} rows={5}
                placeholder="Detailed description…" className="input-field resize-none" />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex gap-3">
          <button type="submit" disabled={saving}
            className="btn-gold flex items-center gap-2 text-base px-8 py-3">
            {saving
              ? <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Saving…</>
              : <><FiCheck /> Save &amp; Go Live</>
            }
          </button>
          <button type="button" onClick={() => navigate('/admin/dashboard/gems')}
            className="px-6 py-3 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400 transition-colors text-sm font-medium">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

// ── Small reusable components ────────────────────────────────────────────────

function ImageThumb({ src, isMain, isNew, onRemove }) {
  const [err, setErr] = useState(false)
  return (
    <div className="relative group/thumb flex-shrink-0">
      <div className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all
        ${isMain ? 'border-gold-500 ring-2 ring-gold-500/30' : 'border-gray-200 dark:border-gray-700'}`}>
        {err ? (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-xs text-center px-1">
            Image<br/>not found
          </div>
        ) : (
          <img src={src} alt="" className="w-full h-full object-cover" onError={() => setErr(true)} />
        )}
      </div>
      {/* Badges */}
      {isMain && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] bg-gold-500 text-white px-2 py-0.5 rounded-full whitespace-nowrap z-10">
          Main
        </span>
      )}
      {isNew && (
        <span className="absolute -top-1.5 -left-1.5 text-[9px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full">
          New
        </span>
      )}
      {/* Remove */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center shadow
                   opacity-0 group-hover/thumb:opacity-100 transition-opacity z-10"
      >
        <FiX size={10} />
      </button>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block font-medium">{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="input-field" />
    </div>
  )
}
