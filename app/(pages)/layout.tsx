import { PropsWithChildren } from 'react'
import { Sidebar } from '@/components'

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className='w-screen flex gap-12 items-start'>
      <Sidebar />
      {children}
    </div>
  )
}
