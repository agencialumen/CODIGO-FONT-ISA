"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Play, Heart } from "lucide-react"

interface PreviewImageProps {
  src: string
  alt: string
  showPlayIcon?: boolean
}

export function BlurredImage({ src, alt, showPlayIcon = false }: PreviewImageProps) {
  return (
    <motion.div className="relative overflow-hidden group" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
      <div className="relative aspect-[4/5] w-full">
        <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" />
      </div>

      {/* Overlay sutil com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Ícone de play para vídeos */}
      {showPlayIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="bg-black/60 backdrop-blur-sm p-3 rounded-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Play className="h-8 w-8 text-white fill-white" />
          </motion.div>
        </div>
      )}

      {/* Indicador de curtidas no hover */}
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          <span className="text-white text-xs font-medium">VIP</span>
        </div>
      </div>
    </motion.div>
  )
}
