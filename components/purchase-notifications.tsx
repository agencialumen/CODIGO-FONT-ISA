"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, User, Clock, Crown } from "lucide-react"

// Configuração centralizada - fácil de editar
const NOTIFICATION_CONFIG = {
  // Nomes masculinos brasileiros realistas
  maleNames: [
    "Carlos Silva",
    "João Santos",
    "Pedro Oliveira",
    "Lucas Costa",
    "Rafael Lima",
    "Bruno Ferreira",
    "Gustavo Almeida",
    "Felipe Rodrigues",
    "Thiago Martins",
    "Diego Pereira",
    "André Souza",
    "Marcelo Ribeiro",
    "Rodrigo Carvalho",
    "Fernando Gomes",
    "Eduardo Barbosa",
    "Renato Dias",
    "Fabio Nascimento",
    "Leandro Moreira",
    "Vinicius Araújo",
    "Mateus Cardoso",
    "Gabriel Rocha",
    "Daniel Castro",
    "Ricardo Monteiro",
    "Alexandre Ramos",
    "Julio Correia",
    "Roberto Teixeira",
    "Sergio Lopes",
    "Paulo Mendes",
    "Marcos Vieira",
    "Antonio Freitas",
    "Leonardo Campos",
    "Henrique Nunes",
    "Caio Pinto",
    "Igor Machado",
    "Wesley Cunha",
    "Renan Farias",
    "Guilherme Moura",
    "Victor Hugo",
    "Murilo Azevedo",
    "Otavio Reis",
  ],

  // Plano VIP único
  vipPlan: {
    name: "Plano VIP",
    price: "R$49,90",
    color: "from-purple-500 to-pink-500",
  },

  // Cidades brasileiras para dar mais realismo
  cities: [
    "São Paulo",
    "Rio de Janeiro",
    "Belo Horizonte",
    "Salvador",
    "Brasília",
    "Fortaleza",
    "Curitiba",
    "Recife",
    "Porto Alegre",
    "Manaus",
    "Belém",
    "Goiânia",
    "Guarulhos",
    "Campinas",
    "São Luís",
    "Maceió",
    "Duque de Caxias",
    "Natal",
    "Teresina",
    "São Bernardo",
  ],

  // Mensagens variadas
  messages: [
    "acabou de assinar o",
    "comprou acesso ao",
    "se inscreveu no",
    "adquiriu o",
    "ativou o",
    "garantiu acesso ao",
    "entrou no",
    "liberou o",
    "desbloqueou o",
  ],

  // Configurações de timing
  minInterval: 8000, // 8 segundos
  maxInterval: 25000, // 25 segundos
  displayDuration: 6000, // 6 segundos
  maxNotifications: 3, // máximo de notificações simultâneas
}

interface Notification {
  id: string
  name: string
  city: string
  message: string
  timestamp: Date
}

export default function PurchaseNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Função para gerar uma notificação aleatória
  const generateNotification = (): Notification => {
    const { maleNames, cities, messages } = NOTIFICATION_CONFIG

    return {
      id: `notification-${Date.now()}-${Math.random()}`,
      name: maleNames[Math.floor(Math.random() * maleNames.length)],
      city: cities[Math.floor(Math.random() * cities.length)],
      message: messages[Math.floor(Math.random() * messages.length)],
      timestamp: new Date(),
    }
  }

  // Função para adicionar nova notificação
  const addNotification = () => {
    const newNotification = generateNotification()

    setNotifications((prev) => {
      // Limita o número máximo de notificações
      const updated = [newNotification, ...prev].slice(0, NOTIFICATION_CONFIG.maxNotifications)
      return updated
    })

    // Remove a notificação após o tempo de exibição
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id))
    }, NOTIFICATION_CONFIG.displayDuration)
  }

  // Efeito para gerar notificações em intervalos aleatórios
  useEffect(() => {
    const scheduleNextNotification = () => {
      const randomInterval =
        Math.random() * (NOTIFICATION_CONFIG.maxInterval - NOTIFICATION_CONFIG.minInterval) +
        NOTIFICATION_CONFIG.minInterval

      setTimeout(() => {
        addNotification()
        scheduleNextNotification() // Agenda a próxima
      }, randomInterval)
    }

    // Primeira notificação após 3 segundos
    const initialTimeout = setTimeout(() => {
      addNotification()
      scheduleNextNotification()
    }, 3000)

    return () => clearTimeout(initialTimeout)
  }, [])

  // Função para formatar o tempo relativo
  const getTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000)

    if (diffInSeconds < 60) return "agora mesmo"
    if (diffInSeconds < 120) return "1 min atrás"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min atrás`
    return "há pouco tempo"
  }

  const { vipPlan } = NOTIFICATION_CONFIG

  return (
    <div className="fixed top-4 left-4 z-50 space-y-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 30,
                delay: index * 0.1,
              },
            }}
            exit={{
              opacity: 0,
              x: -100,
              scale: 0.8,
              transition: { duration: 0.3 },
            }}
            className="bg-zinc-900/95 backdrop-blur-md border border-zinc-700/50 rounded-xl p-4 shadow-2xl max-w-sm pointer-events-auto"
            style={{ zIndex: 1000 - index }}
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 flex items-center justify-center">
                  <User className="h-5 w-5 text-zinc-300" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-zinc-900 flex items-center justify-center">
                  <CheckCircle className="h-2.5 w-2.5 text-white" />
                </div>
              </div>

              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-white text-sm truncate">{notification.name}</p>
                  <span className="text-zinc-400 text-xs">•</span>
                  <span className="text-zinc-400 text-xs">{notification.city}</span>
                </div>

                <p className="text-zinc-300 text-xs mb-2">
                  {notification.message}{" "}
                  <span className="inline-flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    <span className={`font-bold bg-gradient-to-r ${vipPlan.color} bg-clip-text text-transparent`}>
                      {vipPlan.name}
                    </span>
                  </span>{" "}
                  por {vipPlan.price}
                </p>

                <div className="flex items-center gap-1 text-zinc-500 text-xs">
                  <Clock className="h-3 w-3" />
                  <span>{getTimeAgo(notification.timestamp)}</span>
                </div>
              </div>
            </div>

            {/* Barra de progresso */}
            <motion.div
              className="mt-3 h-1 bg-zinc-800 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className={`h-full bg-gradient-to-r ${vipPlan.color} rounded-full`}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{
                  duration: NOTIFICATION_CONFIG.displayDuration / 1000,
                  ease: "linear",
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
