import './globals.css'

import { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { Public_Sans } from 'next/font/google'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: {
    template: '%s | LSBU Fitness Tracker',
    default: 'LSBU Fitness Tracker',
  },
  description:
    'Track your workouts, monitor progress, and achieve your fitness goals with LSBU Fitness Tracker.',
}

const public_sans = Public_Sans({ subsets: ['latin'] })

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(public_sans.className, 'overflow-x-hidden')}>
        {children}
      </body>
    </html>
  )
}
