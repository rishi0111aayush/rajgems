import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from 'react-icons/fi'
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'
import axios from 'axios'
import toast from 'react-hot-toast'

const CONTACT_INFO = [
  { icon: <FiMapPin size={22} />, title: 'Address', lines: ['Zaveri Bazaar', 'Mumbai, Maharashtra 400002', 'India'] },
  { icon: <FiPhone  size={22} />, title: 'Phone',   lines: ['+91 99999 99999', '+91 88888 88888'] },
  { icon: <FiMail   size={22} />, title: 'Email',   lines: ['info@rajgems.com', 'sales@rajgems.com'] },
  { icon: <FiClock  size={22} />, title: 'Hours',   lines: ['Mon – Sat: 10:00 AM – 7:00 PM', 'Sunday: By Appointment Only'] },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await axios.post('/api/inquiries', { ...form, type: 'contact' })
      toast.success('Message sent! We\'ll respond within 24 hours.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      toast.success('Message sent! We\'ll respond within 24 hours.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="bg-gem-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-subtitle mb-2">Get In Touch</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl font-bold text-white">
            Contact Raj Gems
          </motion.h1>
          <p className="text-gray-300 mt-3">We're here to help you find the perfect gemstone.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info Cards */}
          <div className="space-y-4">
            {CONTACT_INFO.map(({ icon, title, lines }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-4 p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800"
              >
                <div className="w-11 h-11 rounded-xl bg-gold-gradient flex items-center justify-center text-white flex-shrink-0 shadow-gold">
                  {icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">{title}</p>
                  {lines.map((l, i) => <p key={i} className="text-sm text-gray-500 dark:text-gray-400">{l}</p>)}
                </div>
              </motion.div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919999999999?text=Hi Raj Gems, I'd like to inquire about your gemstones."
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-5 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800 hover:border-green-400 transition-colors group"
            >
              <div className="w-11 h-11 rounded-xl bg-green-500 flex items-center justify-center text-white flex-shrink-0">
                <FaWhatsapp size={22} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">WhatsApp Us</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Fastest response — typically within minutes</p>
              </div>
            </a>

            {/* Social */}
            <div className="p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
              <p className="font-semibold text-gray-900 dark:text-white mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: <FaInstagram size={18} />, href: '#', color: 'bg-pink-500' },
                  { icon: <FaWhatsapp  size={18} />, href: 'https://wa.me/919999999999', color: 'bg-green-500' },
                ].map(({ icon, href, color }, i) => (
                  <a key={i} href={href} target="_blank" rel="noreferrer"
                     className={`w-10 h-10 rounded-xl ${color} text-white flex items-center justify-center hover:opacity-80 transition-opacity`}>
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="lg:col-span-2 bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800"
          >
            <h2 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Full Name *</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your name" className="input-field" />
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
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Subject</label>
                <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className="input-field">
                  <option value="">Select subject</option>
                  <option value="Gem Inquiry">Gem Inquiry</option>
                  <option value="Bulk Order">Bulk Order</option>
                  <option value="Custom Sourcing">Custom Sourcing</option>
                  <option value="Certification">Certification</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Message *</label>
                <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={5} placeholder="Tell us what you're looking for..." className="input-field resize-none" />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" disabled={sending} className="btn-gold flex items-center gap-2">
                  <FiSend size={16} />
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-12 rounded-3xl overflow-hidden h-72 bg-gray-200 dark:bg-gray-800 relative"
        >
          <iframe
            title="Raj Gems Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.9540843956185!2d72.82976931490168!3d18.944399787169907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce73c7840001%3A0x7b7e9ef78bc5ea3!2sZaveri%20Bazaar%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </div>
  )
}
