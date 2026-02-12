import type { Metadata, Viewport } from 'next'
import { Inter, Space_Mono } from 'next/font/google'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-space-mono' })

export const metadata: Metadata = {
  title: 'QuestWork - Gamified Productivity',
  description: 'Transforme ton travail en aventure. Gagne de l\'XP, monte de niveau, et deviens le boss de ta productivite.',
}

export const viewport: Viewport = {
  themeColor: '#1a1f2e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${_inter.variable} ${_spaceMono.variable} font-sans antialiased`} suppressHydrationWarning>{children}</body>
    </html>
  )
}
