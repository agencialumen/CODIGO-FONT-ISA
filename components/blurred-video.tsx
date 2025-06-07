"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Play, Eye } from "lucide-react"

interface PreviewVideoProps {
  thumbnail: string
  duration: string
  title: string
  views?: string
}

export function BlurredVideo({ thumbnail, duration, title, views }: PreviewVideoProps) {
  return (
    <motion.div
      className="relative overflow-hidden group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Mudamos para aspect-[9/16] para formato de story */}
      <div className="relative aspect-[9/16] w-full rounded-xl">
        <Image src={thumbnail || "/placeholder.svg"} alt={title} fill className="object-cover" />

        {/* Overlay escuro sutil */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 rounded-xl"></div>

        {/* Duração do vídeo */}
        <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm font-medium">
          {duration}
        </div>

        {/* Views count */}
        {views && (
          <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm font-medium flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {views}
          </div>
        )}

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="bg-black/70 backdrop-blur-sm p-4 rounded-full group-hover:bg-black/80 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Play className="h-10 w-10 text-white fill-white" />
          </motion.div>
        </div>

        {/* Indicador de qualidade */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-gradient-to-r from-rose-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
            HD
          </div>
        </div>
      </div>
    </motion.div>
  )
}
