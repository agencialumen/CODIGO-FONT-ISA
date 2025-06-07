"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Loader2, X, Volume2, VolumeX } from "lucide-react"
import Image from "next/image"

interface VideoPlayerProps {
  videoUrl: string
  thumbnail: string
  title: string
  duration?: string
}

// Função para converter link do Google Drive para embed
const convertGoogleDriveUrl = (url: string): string => {
  try {
    const googleDriveRegex = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/
    const match = url.match(googleDriveRegex)

    if (match) {
      const fileId = match[1]
      return `https://drive.google.com/file/d/${fileId}/preview`
    }

    return url
  } catch (error) {
    console.error("Error converting Google Drive URL:", error)
    return url
  }
}

export function VideoPlayer({ videoUrl, thumbnail, title, duration }: VideoPlayerProps) {
  const [showVideo, setShowVideo] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const handlePlayClick = () => {
    setIsLoading(true)
    setShowVideo(true)

    // Simular carregamento
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleClose = () => {
    setShowVideo(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const embedUrl = convertGoogleDriveUrl(videoUrl)

  return (
    <div className="relative aspect-[9/16] w-full bg-black rounded-xl overflow-hidden group">
      {!showVideo ? (
        // Thumbnail com botão de play
        <motion.div
          className="relative w-full h-full cursor-pointer"
          onClick={handlePlayClick}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image src={thumbnail || "/placeholder.svg?height=600&width=400"} alt={title} fill className="object-cover" />

          {/* Overlay escuro */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 rounded-xl" />

          {/* Duração */}
          {duration && (
            <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm font-medium">
              {duration}
            </div>
          )}

          {/* Botão de play central */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="bg-black/70 backdrop-blur-sm p-6 rounded-full group-hover:bg-black/80 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="h-12 w-12 text-white fill-white" />
            </motion.div>
          </div>

          {/* Indicador de qualidade */}
          <div className="absolute bottom-2 right-2">
            <div className="bg-gradient-to-r from-rose-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
              HD
            </div>
          </div>
        </motion.div>
      ) : (
        // Player de vídeo
        <div className="relative w-full h-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          )}

          <iframe
            src={embedUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            title={title}
          />

          {/* Controles de vídeo */}
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-3 bg-gradient-to-b from-black/80 to-transparent">
            <button
              onClick={handleClose}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-black/50 text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              onClick={toggleMute}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-black/50 text-white"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
