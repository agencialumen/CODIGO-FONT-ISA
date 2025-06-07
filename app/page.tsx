import ProfileHeader from "@/components/profile-header"
import ProfileContent from "@/components/profile-content"
import SocialLinksFloating from "@/components/social-links-floating"
import PurchaseNotifications from "@/components/purchase-notifications"
import type { Metadata } from "next"

// Metadata específica da página inicial
export const metadata: Metadata = {
  title: "Isabelle Lua 🔥 Conteúdo Exclusivo VIP | Fotos e Vídeos Premium",
  description:
    "💋 Entre no meu mundo VIP! Acesse fotos sensuais exclusivas, vídeos em 4K e chat privado comigo. Planos a partir de R$19,90. Mais de 68K likes! Assine agora! 🌟",

  openGraph: {
    title: "Isabelle Lua 🔥 Conteúdo Exclusivo VIP",
    description:
      "💋 Acesse meu conteúdo mais íntimo e exclusivo! Fotos sensuais, vídeos em 4K e chat privado comigo. Planos a partir de R$19,90/mês. Entre para o meu mundo VIP! 🌟",
    url: "https://isa-privadinho.netlify.app/",
    images: [
      {
        url: "https://isa-privadinho.netlify.app/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Isabelle Lua - Conteúdo Exclusivo VIP",
      },
    ],
  },

  twitter: {
    title: "Isabelle Lua 🔥 Conteúdo Exclusivo VIP",
    description:
      "💋 Acesse meu conteúdo mais íntimo! Fotos sensuais, vídeos 4K e chat privado. Planos VIP a partir de R$19,90. Entre para o meu mundo exclusivo! 🌟",
    images: "https://isa-privadinho.netlify.app/images/og-image.jpg",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-900 text-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <ProfileHeader />
        <ProfileContent />
      </div>

      {/* Botão flutuante das redes sociais */}
      <SocialLinksFloating />

      {/* Notificações de compras falsas */}
      <PurchaseNotifications />
    </main>
  )
}
