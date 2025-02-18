'use client'

import {
  HomeIcon,
  MinimizeMenuIcon,
  // LogWorkoutNavIcon,
  // ProgressNavIcon,
  // GoalsNavIcon,
  // ProfileNavIcon,
} from '@/components/icons' // Update with relevant icons

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_ITEMS = [
  { name: 'Dashboard', icon: <HomeIcon />, href: '/' },
  { name: 'Log Workout', icon: null, href: '/log-workout' },
  { name: 'Progress', icon: null, href: '/progress' },
  { name: 'Goals', icon: null, href: '/goals' },
]

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false)
  const pathname = usePathname()

  return (
    <motion.aside
      className='h-screen bg-[#3A2559] text-gray-300 pt-10 flex flex-col w-64 space-y-6 overflow-hidden pb-20 rounded-r-lg'
      animate={{ width: isMinimized ? 80 : 256 }}
    >
      {/* Logo Section */}
      <div className='flex items-center pl-8 text-lg font-bold'>
        {isMinimized ? (
          <span className='text-white text-xl'>L</span>
        ) : (
          <span className='text-white whitespace-nowrap'>
            LSBU <span className='text-[#842C7E]'>Active</span>
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className='flex-1'>
        <ul className='space-y-4'>
          {NAV_ITEMS.map(({ name, icon, href }) => (
            <Link className='hover:bg-[#842C7E]' key={name} href={href}>
              <motion.li
                className={cn(
                  'flex items-center space-x-4 p-2 rounded-r-lg cursor-pointer pl-8 w-[90%] h-14 max-h-14 border-l-4 border-transparent box-border',
                  pathname === href ? 'border-[#842C7E] bg-[#842C7E]/20' : ''
                )}
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {/* Icon (if available) */}
                {icon && (
                  <motion.div
                    initial={false}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {icon}
                  </motion.div>
                )}
                <motion.span
                  className='text-sm whitespace-nowrap'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isMinimized ? 0 : 1 }}
                  transition={{ duration: 0.2, delay: isMinimized ? 0 : 0.1 }}
                >
                  {name}
                </motion.span>
              </motion.li>
            </Link>
          ))}
        </ul>
      </nav>

      {/* Minimize Button */}
      <button
        className='flex items-center space-x-4 p-2 pl-8 cursor-pointer h-14 max-h-14'
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <motion.div
          initial={false}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <MinimizeMenuIcon
            className={cn(
              'transition-transform ease-in-out duration-500',
              isMinimized ? 'transform rotate-180' : ''
            )}
          />
        </motion.div>
        <motion.span
          className='text-sm whitespace-nowrap'
          initial={{ opacity: 0 }}
          animate={{ opacity: isMinimized ? 0 : 1 }}
          transition={{ duration: 0.2, delay: isMinimized ? 0 : 0.1 }}
        >
          Minimize Menu
        </motion.span>
      </button>
    </motion.aside>
  )
}
