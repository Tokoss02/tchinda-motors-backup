// components/animations/SuccessCheckmark.tsx
'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export default function SuccessCheckmark({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="fixed top-4 right-4 z-50 bg-white border border-green-500 rounded-xl shadow-lg px-4 py-3 flex items-center space-x-3"
    >
      <CheckCircle2 className="text-green-600 w-6 h-6" />
      <span className="text-green-700 font-semibold">{message}</span>
    </motion.div>
  )
}
