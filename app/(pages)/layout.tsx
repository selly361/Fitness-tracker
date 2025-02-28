import { PropsWithChildren } from 'react'
import { Sidebar } from '@/components'
import { Toaster } from '@/components/ui'

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className='w-screen flex gap-12 items-start relative'>
      <Sidebar />
      <main className='px-10 pt-8 pb-8 w-full h-screen flex flex-col gap-8 overflow-y-auto'>
        {children}
        <Toaster />
      </main>
    </div>
  )
}
