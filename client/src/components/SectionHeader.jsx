import { motion } from 'framer-motion'

export default function SectionHeader({ subtitle, title, description, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-12 ${center ? 'text-center' : ''}`}
    >
      {subtitle && (
        <p className="section-subtitle mb-2">{subtitle}</p>
      )}
      <h2 className="section-title mb-4">{title}</h2>
      {description && (
        <p className={`text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed ${center ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
      {/* Gold divider */}
      <div className={`flex items-center gap-2 mt-4 ${center ? 'justify-center' : ''}`}>
        <div className="h-px w-12 bg-gold-500" />
        <div className="w-2 h-2 rounded-full bg-gold-500" />
        <div className="h-px w-12 bg-gold-500" />
      </div>
    </motion.div>
  )
}
