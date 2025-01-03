import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/sidebar'
import { MobileNav } from '@/components/layout/mobile-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Effector Board',
  description: 'Share your effector board setup with other musicians',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-white">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <MobileNav />
          <main className="flex-1 lg:pl-64">
            <div className="container mx-auto p-6 pt-20 lg:pt-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
