import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MugglePay Links',
  description: 'Accept crypto on telegram and universal Social Platform'
}

export default function RootLayout({
                                     children
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'gradient-background')}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
