"use client"
import { MessageCircle, ImageIcon, Film, Heart, MessageSquare, Bookmark, Share, Eye } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlurredImage } from "@/components/blurred-image"
import { VideoPlayer } from "@/components/video-player"
import { InteractiveChat } from "@/components/interactive-chat"
import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"

// Configuração centralizada - fácil de editar
const CONTENT_CONFIG = {
  photos: [
    {
      id: "photo1",
      src: "https://iili.io/FdO7pVt.jpg",
      title: "Dia de praia com as amigas 🏖️",
      likes: "3.2K",
      comments: "128",
      date: "Hoje",
    },
    {
      id: "photo2",
      src: "https://iili.io/F31C7pV.jpg",
      title: "Noite especial 💋",
      likes: "5.7K",
      comments: "243",
      date: "Ontem",
    },
    {
      id: "photo3",
      src: "https://iili.io/F3W8ze2.jpg",
      title: "Ensaio exclusivo 📸",
      likes: "8.1K",
      comments: "312",
      date: "2 dias atrás",
    },
  ],
  videos: [
    {
      id: "video1",
      // Exemplo de link do Google Drive - substitua pelo seu link real
      videoUrl: "https://drive.google.com/file/d/1bkUEMhQKzv_0xHQRXOXEH9o2CJ3vS4_n/view?usp=drivesdk",
      thumbnail: "https://iili.io/F3XgZN4.md.jpg",
      title: "Banho quente 🚿",
      duration: "03:24",
      views: "12.3K",
      date: "Hoje",
    },
    {
      id: "video2",
      // Outro exemplo - substitua pelo seu link real
      videoUrl: "https://drive.google.com/file/d/1Ka7Is_kssWNr1n8TaJtCQtQtTFTFVAYv/view?usp=sharing",
      thumbnail: "https://iili.io/FdO7pVt.jpg",
      title: "Provando lingerie nova 💕",
      duration: "05:12",
      views: "18.7K",
      date: "Ontem",
    },
    {
      id: "video3",
      // Mais um exemplo - substitua pelo seu link real
      videoUrl: "https://drive.google.com/file/d/1JhOibZArw21g9jXuAi-ytS7RktGmGMe8/view?usp=sharing",
      thumbnail: "/placeholder.svg?height=600&width=400",
      title: "Dançando para você 💃",
      duration: "02:45",
      views: "9.5K",
      date: "3 dias atrás",
    },
  ],
}

export default function ProfileContent() {
  const { photos, videos } = CONTENT_CONFIG
  const [activeTab, setActiveTab] = useState("photos")

  return (
    <div className="px-4 md:px-6 py-4">
      <Tabs defaultValue="photos" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-zinc-800/50 rounded-xl overflow-hidden p-0 h-auto sticky top-0 z-10">
          <TabsTrigger
            value="photos"
            className="py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-red-500 rounded-none flex items-center gap-2"
          >
            <ImageIcon className="h-5 w-5" />
            <span className="font-medium">FOTOS</span>
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-red-500 rounded-none flex items-center gap-2"
          >
            <Film className="h-5 w-5" />
            <span className="font-medium">VIDEOS</span>
          </TabsTrigger>
          <TabsTrigger
            value="chat"
            className="py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-red-500 rounded-none flex items-center gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="font-medium">CHAT</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="mt-6">
          <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">
            Prévia do conteúdo exclusivo
          </h2>

          <div className="space-y-6">
            {photos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-800/30 rounded-xl overflow-hidden"
              >
                <div className="p-3 flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image src="https://iili.io/3ZiexRf.jpg" alt="Profile" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Isabelle Lua</p>
                    <p className="text-zinc-400 text-xs">{photo.date}</p>
                  </div>
                </div>

                <BlurredImage src={photo.src} alt={photo.title} />

                <div className="p-4">
                  <p className="text-white mb-3">{photo.title}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                      <motion.div
                        className="flex items-center gap-1 text-zinc-400 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart className="h-5 w-5 hover:text-red-500 transition-colors" />
                        <span className="text-sm">{photo.likes}</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-1 text-zinc-400 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MessageSquare className="h-5 w-5 hover:text-blue-500 transition-colors" />
                        <span className="text-sm">{photo.comments}</span>
                      </motion.div>
                    </div>
                    <div className="flex gap-3">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Bookmark className="h-5 w-5 text-zinc-400 cursor-pointer hover:text-yellow-500 transition-colors" />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Share className="h-5 w-5 text-zinc-400 cursor-pointer hover:text-green-500 transition-colors" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">
            Stories exclusivos
          </h2>

          <div className="space-y-6">
            {videos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-800/30 rounded-xl overflow-hidden"
              >
                <div className="p-3 flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image src="https://iili.io/3ZiexRf.jpg" alt="Profile" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Isabelle Lua</p>
                    <p className="text-zinc-400 text-xs">{video.date}</p>
                  </div>
                </div>

                <VideoPlayer
                  videoUrl={video.videoUrl}
                  thumbnail={video.thumbnail}
                  title={video.title}
                  duration={video.duration}
                />

                <div className="p-4">
                  <p className="text-white mb-3">{video.title}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-4">
                      <motion.div
                        className="flex items-center gap-1 text-zinc-400 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart className="h-5 w-5 hover:text-red-500 transition-colors" />
                        <span className="text-sm">{video.views}</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-1 text-zinc-400 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="h-5 w-5 hover:text-blue-500 transition-colors" />
                        <span className="text-sm">Visualizações</span>
                      </motion.div>
                    </div>
                    <div className="flex gap-3">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Bookmark className="h-5 w-5 text-zinc-400 cursor-pointer hover:text-yellow-500 transition-colors" />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Share className="h-5 w-5 text-zinc-400 cursor-pointer hover:text-green-500 transition-colors" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          <InteractiveChat />
        </TabsContent>
      </Tabs>
    </div>
  )
}
