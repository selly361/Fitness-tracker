import { Metadata } from 'next/types'
import Image from 'next/image'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  description: 'Sign in to track workouts and monitor progress.',
}

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <main className='relative w-screen h-screen flex items-center justify-center'>
      {/* Full-Page Background Image */}
      <Image
        src='/background-img.png'
        alt='LSBU Gym'
        layout='fill'
        objectFit='cover'
        className='absolute top-0 left-0 w-full h-full z-0 bacground-center'
      />

      {/* Overlay for better contrast */}
      <div className='absolute top-0 left-0 w-full h-full bg-[#3A2559]/70 z-0'></div>

      {/* Centered Form Container */}
      <div className='relative z-10 bg-white/90 backdrop-blur-lg p-10 rounded-xl shadow-lg max-w-md w-full border-t-8 border-[#842C7E]'>
        <div className='mt-6'>{children}</div>
      </div>
    </main>
  )
}
