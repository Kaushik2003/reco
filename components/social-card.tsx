import { Instagram, Linkedin, Youtube, Twitter } from "lucide-react"
import type { Social } from "@/lib/types"

interface SocialCardProps {
  social: Social
}

const iconMap = {
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  twitter: Twitter,
  behance: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M22 7h-7v2h7V7zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3c3.055 0 2.897 4-.391 4H3v-4h3.391z" />
    </svg>
  ),
}

const colorMap = {
  instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
  linkedin: "bg-blue-600",
  youtube: "bg-red-600",
  twitter: "bg-sky-500",
  behance: "bg-blue-500",
}

export function SocialCard({ social }: SocialCardProps) {
  const Icon = iconMap[social.icon as keyof typeof iconMap]
  const colorClass = colorMap[social.icon as keyof typeof colorMap]

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${colorClass} text-white`}>
            <Icon />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{social.platform}</p>
            <p className="text-sm text-gray-600">{social.handle}</p>
          </div>
        </div>
        <div className="text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  )
}
