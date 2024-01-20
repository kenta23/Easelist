import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from './components/Sidebar'
import SessionProvider from './components/SessionProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = { 
  title: 'Task',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='flex'>
          <SessionProvider>
            <Sidebar />
            {children}
          </SessionProvider>
        </div>
      </body>
    </html>
  )
}
