import type { Metadata, Viewport } from 'next'
import { Inter, MedievalSharp } from 'next/font/google'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _medieval = MedievalSharp({ weight: '400', subsets: ['latin'], variable: '--font-medieval' })

export const metadata: Metadata = {
  title: 'StudyRPG - Transforme tes etudes en aventure',
  description: 'Gagne de l\'XP, monte de niveau, equipe-toi et combats des mobs. Transforme ta productivite en quete heroique.',
}

export const viewport: Viewport = {
  themeColor: '#1a1510',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${_inter.variable} ${_medieval.variable} font-sans antialiased rpg-parchment`} suppressHydrationWarning>{children}</body>
    </html>
  )
}
