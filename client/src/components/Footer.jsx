import { Link } from 'react-router-dom'
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const QUICK_LINKS = ['Home', 'Collection', 'Categories', 'Gallery', 'About', 'Contact']
const CATEGORIES  = ['Ruby', 'Emerald', 'Sapphire', 'Diamond', 'Opal', 'Amethyst', 'Tanzanite', 'Pearl']

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Top band */}
      <div className="border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold">
                  <span className="text-white font-bold text-sm">RG</span>
                </div>
                <span className="font-serif text-xl font-bold text-white">Raj Gems</span>
              </div>
              <p className="text-sm leading-relaxed mb-5">
                Premium natural gemstone trading company. Sourcing the world's finest rubies, emeralds, sapphires and rare collector stones since 2005.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: <FiInstagram />, href: '#' },
                  { icon: <FiFacebook  />, href: '#' },
                  { icon: <FiTwitter   />, href: '#' },
                  { icon: <FaWhatsapp  />, href: 'https://wa.me/919999999999' },
                ].map(({ icon, href }, i) => (
                  <a key={i} href={href} target="_blank" rel="noreferrer"
                     className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center
                                hover:border-gold-500 hover:text-gold-500 transition-all">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {QUICK_LINKS.map(link => (
                  <li key={link}>
                    <Link
                      to={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                      className="text-sm hover:text-gold-500 transition-colors flex items-center gap-1"
                    >
                      <span className="text-gold-500">›</span> {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-white font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <Link
                      to={`/categories/${cat.toLowerCase()}`}
                      className="text-sm hover:text-gold-500 transition-colors flex items-center gap-1"
                    >
                      <span className="text-gold-500">›</span> {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <FiMapPin className="text-gold-500 flex-shrink-0 mt-0.5" />
                  <span>Zaveri Bazaar, Mumbai, Maharashtra 400002, India</span>
                </li>
                <li className="flex gap-3">
                  <FiPhone className="text-gold-500 flex-shrink-0 mt-0.5" />
                  <a href="tel:+919999999999" className="hover:text-gold-500 transition-colors">+91 99999 99999</a>
                </li>
                <li className="flex gap-3">
                  <FiMail className="text-gold-500 flex-shrink-0 mt-0.5" />
                  <a href="mailto:info@rajgems.com" className="hover:text-gold-500 transition-colors">info@rajgems.com</a>
                </li>
                <li className="flex gap-3">
                  <FaWhatsapp className="text-gold-500 flex-shrink-0 mt-0.5" />
                  <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer"
                     className="hover:text-gold-500 transition-colors">WhatsApp Us</a>
                </li>
              </ul>
              <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                <p className="text-white font-medium mb-1">Business Hours</p>
                <p>Mon – Sat: 10:00 AM – 7:00 PM</p>
                <p>Sunday: By Appointment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
          <p>© {new Date().getFullYear()} Raj Gems. All rights reserved.</p>
          <p>Crafted with ❤️ for premium gemstone lovers</p>
        </div>
      </div>
    </footer>
  )
}
