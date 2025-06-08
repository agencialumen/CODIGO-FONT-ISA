"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Instagram, Facebook, X, Plus, Send } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Configuração centralizada com os links reais
const SOCIAL_LINKS = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/belaofc.021",
    color: "from-purple-500 to-pink-500",
    glowColor: "rgba(236, 72, 153, 0.6)",
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: Send,
    url: "https://t.me/+h6JxPBU61oo2N2Mx",
    color: "from-blue-400 to-cyan-400",
    glowColor: "rgba(56, 189, 248, 0.6)",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    url: "https://m.facebook.com/isabelle.martinsii.98/",
    color: "from-blue-600 to-indigo-600",
    glowColor: "rgba(59, 130, 246, 0.6)",
  },
]

export default function SocialLinksFloating() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        {/* Social Icons */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-16 right-0 flex flex-col-reverse gap-3"
            >
              {SOCIAL_LINKS.map((social, index) => (
                <motion.div
                  key={social.id}
                  initial={{ opacity: 0, x: 20, scale: 0.5 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: { delay: index * 0.1 },
                  }}
                  exit={{
                    opacity: 0,
                    x: 20,
                    scale: 0.5,
                    transition: { delay: (SOCIAL_LINKS.length - index - 1) * 0.05 },
                  }}
                  className="relative group"
                >
                  <Link href={social.url} target="_blank" rel="noopener noreferrer">
                    <motion.div
                      className={`flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br ${social.color} shadow-lg`}
                      whileHover={{
                        scale: 1.1,
                        boxShadow: `0 0 20px 3px ${social.glowColor}`,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="h-6 w-6 text-white" />

                      {/* Shine overlay */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 to-transparent opacity-50" />
                    </motion.div>
                  </Link>

                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none"
                  >
                    {social.name}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-rose-500 to-red-500 shadow-lg shadow-rose-500/30 text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}

          {/* Pulse animation quando fechado */}
          {!isExpanded && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-rose-400"
              animate={{
                scale: [1, 1.5],
                opacity: [0.7, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "easeOut",
              }}
            />
          )}
        </motion.button>
      </div>
    </div>
  )
}
