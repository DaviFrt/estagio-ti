import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import { Poppins } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const poppins = Poppins({ subsets: ['latin'], weight: ['500', '700'] })

export const metadata: Metadata = {
  title: 'myCashier',
  description:
    'Site de sistema de caixa de supermercado para uma vaga de estágio de TI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <header className="px-6 py-8 border-b">
          <Link href="/">
            <h1>myCashier - Seu controle de caixa</h1>
          </Link>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
