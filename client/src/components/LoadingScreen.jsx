import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-950">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        className="w-16 h-16 rounded-full border-4 border-gold-500/20 border-t-gold-500 mb-6"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="font-serif text-2xl text-white font-bold">Raj Gems</h1>
        <p className="text-gold-500 text-xs tracking-widest uppercase text-center mt-1">
          Premium Gemstones
        </p>
      </motion.div>
    </div>
  )
}
