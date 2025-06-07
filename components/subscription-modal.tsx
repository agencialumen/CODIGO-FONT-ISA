"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import NextImage from "next/image"
import { motion } from "framer-motion"
import { Check, Crown } from "lucide-react"

// Configuração do plano VIP único
const VIP_PLAN = {
  id: "vip",
  title: "Plano VIP",
  price: "R$49,90",
  popular: true,
  imageSrc: "/images/plan-vip.jpg", // Atualize para uma imagem adequada
  icon: <Crown className="h-5 w-5 text-amber-400" />,
  color: "from-purple-500 to-pink-500",
  features: [
    "Acesso a TODO conteúdo exclusivo",
    "Fotos e vídeos em alta resolução",
    "Chat privado desbloqueado",
    "Atualizações diárias de conteúdo",
    "Prioridade no atendimento",
    "Acesso antecipado a novidades",
    "Possibilidade de encontros",
    "Conteúdo personalizado",
    "Suporte prioritário 24/7",
  ],
  buttonText: "ASSINAR PLANO VIP",
  buttonColor: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
  paymentLink: "https://pay.kirvano.com/dce77bbb-23cd-4105-82b4-0f37e13fa618", // Atualize com o link correto
}

// Componente de card de assinatura para dispositivos móveis
const MobileSubscriptionCard = ({ plan, onSelect }) => {
  const { id, title, price, popular, icon, color, features, buttonText, buttonColor, paymentLink } = plan

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-zinc-900 border-2 border-purple-500 rounded-xl overflow-hidden relative mb-4`}
    >
      {popular && (
        <div
          className={`absolute top-0 right-0 bg-gradient-to-r ${color} text-white text-xs px-3 py-1 rounded-bl-lg font-medium z-10`}
        >
          EXCLUSIVO
        </div>
      )}

      <div className="flex justify-between items-center p-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-full bg-gradient-to-r ${color}`}>{icon}</div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{price}</p>
          <p className="text-zinc-400 text-xs">por mês</p>
        </div>
      </div>

      <div className="p-4">
        <ul className="mb-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 mb-2">
              <Check className="h-5 w-5 text-purple-500" />
              <span className="text-zinc-300 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={paymentLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-3 rounded-lg ${buttonColor} text-white font-medium transition-all duration-300 text-sm text-center block`}
        >
          {buttonText}
        </a>
      </div>
    </motion.div>
  )
}

// Componente de card de assinatura para desktop
const DesktopSubscriptionCard = ({ plan }) => {
  const { id, title, price, popular, imageSrc, icon, color, features, buttonText, buttonColor, paymentLink } = plan

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className={`bg-zinc-900 border-2 border-purple-500 rounded-xl overflow-hidden flex flex-col relative cursor-pointer mx-auto max-w-lg w-full`}
    >
      {popular && (
        <div
          className={`absolute top-0 right-0 bg-gradient-to-r ${color} text-white text-xs px-3 py-1 rounded-bl-lg font-medium z-10`}
        >
          EXCLUSIVO
        </div>
      )}

      <div className="relative">
        <div className="aspect-[16/9] w-full relative overflow-hidden">
          <NextImage
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/70 to-transparent"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2">
          <div className={`p-2 rounded-full bg-gradient-to-r ${color}`}>{icon}</div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-3 text-center">
          <p className="text-3xl font-bold text-white leading-tight">{price}</p>
          <p className="text-zinc-400 text-xs leading-tight">por mês</p>
        </div>

        <ul className="mb-4 flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="h-5 w-5 text-purple-500 shrink-0" />
              <span className="text-zinc-300">{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={paymentLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-4 rounded-lg ${buttonColor} text-white font-bold transition-all duration-300 text-center block text-lg`}
        >
          {buttonText}
        </a>
      </div>
    </motion.div>
  )
}

interface SubscriptionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SubscriptionModal({ open, onOpenChange }: SubscriptionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 p-0 sm:max-w-md md:max-w-3xl w-[95%] mx-auto overflow-y-auto max-h-[90vh]">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent text-center">
            Acesso VIP Exclusivo
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-center text-sm mb-4">
            Desbloqueie todo o meu conteúdo exclusivo e tenha acesso a benefícios que ninguém mais tem.
          </p>

          {/* Layout para dispositivos móveis - visível apenas em telas pequenas */}
          <div className="md:hidden">
            <MobileSubscriptionCard plan={VIP_PLAN} onSelect={() => {}} />
          </div>

          {/* Layout para desktop - visível apenas em telas médias e grandes */}
          <div className="hidden md:block">
            <DesktopSubscriptionCard plan={VIP_PLAN} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
