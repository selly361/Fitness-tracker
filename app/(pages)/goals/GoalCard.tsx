'use client'

import React from 'react'
import { Dumbbell, Bike, Footprints, MoreHorizontal } from 'lucide-react'
import { deleteGoal } from '@/actions'
import { Goal } from '@/types'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Progress,
} from '@/components/ui'
import { toast } from 'sonner'

const ICONS: Record<string, React.JSX.Element> = {
  Running: <Footprints className='text-[#A833FF]' size={30} />,
  Cycling: <Bike className='text-[#A833FF]' size={30} />,
  'Weight Lifting': <Dumbbell className='text-[#A833FF]' size={30} />,
}

interface GoalCardProps extends Goal {}

export default function GoalCard({
  id,
  type,
  goal_name,
  target_value,
  current_value,
  deadline,
  status,
}: GoalCardProps) {
  const handleDelete = async (goalId: string) => {
    try {
      await deleteGoal(goalId)
      toast.success('Goal deleted successfully')
    } catch (error) {
      toast.error('Failed to delete goal')
    }
  }

  const progressPercentage = Math.min((current_value / target_value) * 100, 100)

  return (
    <Card className='shadow-lg bg-white rounded-xl p-5 border border-[#3A2559] flex flex-col'>
      <CardHeader className='w-full flex justify-between items-center flex-row'>
        <CardTitle className='text-lg font-bold text-[#3A2559] flex items-center gap-2'>
          {ICONS[type]} {goal_name}
        </CardTitle>
        <Popover>
          <PopoverTrigger asChild>
            <MoreHorizontal className='text-gray-400 cursor-pointer' />
          </PopoverTrigger>
          <PopoverContent className='space-y-2 w-20 p-2'>
            <button className='text-gray-500 text-sm outline-none'>Edit</button>
            <hr />
            <button
              onClick={() => handleDelete(id as string)}
              className='text-red-500 text-sm outline-none'
            >
              Delete
            </button>
          </PopoverContent>
        </Popover>
      </CardHeader>

      <CardContent className='space-y-2 flex-1'>
        <p className='text-gray-700'>
          <span className='font-semibold'>Type:</span> {type}
        </p>
        <p className='text-gray-700'>
          <span className='font-semibold'>Target:</span> {target_value}
        </p>
        <p className='text-gray-700'>
          <span className='font-semibold'>Current Progress:</span>{' '}
          {current_value}
        </p>
        <p className='text-gray-700'>
          <span className='font-semibold'>Deadline:</span>{' '}
          {new Date(deadline).toDateString()}
        </p>
        <p className='text-gray-700'>
          <span className='font-semibold'>Status:</span>{' '}
          <span
            className={`px-3 py-1 rounded-md font-medium ${
              status === 'in-progress'
                ? 'text-yellow-800 bg-yellow-300'
                : 'text-green-800 bg-green-300'
            }`}
          >
            {status === 'in-progress' ? 'In Progress' : 'Completed'}
          </span>
        </p>

        {/* Progress Bar */}
        <div className='mt-4'>
          <Progress value={progressPercentage} className='h-3 bg-gray-300' />
          <p className='text-center text-sm mt-1'>
            {progressPercentage.toFixed(1)}%
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
