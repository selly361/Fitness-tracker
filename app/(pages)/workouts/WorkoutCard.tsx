'use client'

import React, { useState } from 'react'
import { Dumbbell, Bike, Footprints, MoreHorizontal } from 'lucide-react'
import { deleteWorkout } from '@/actions'
import { Workout } from '@/types'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui'
import { ModalDialog } from '@/components'
import LogWorkoutForm from './LogWorkoutForm'
import { toast } from 'sonner'

const ICONS: Record<string, React.JSX.Element> = {
  Running: <Footprints className='text-[#A833FF]' size={30} />,
  Cycling: <Bike className='text-[#A833FF]' size={30} />,
  'Weight Lifting': <Dumbbell className='text-[#A833FF]' size={30} />,
}

interface WorkoutCardProps extends Workout {}

export default function WorkoutCard({
  id,
  type,
  duration,
  calories,
  weight_lifted,
  distance,
}: WorkoutCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleDelete = async (workoutId: string) => {
    try {
      await deleteWorkout(workoutId)
      toast.success('Workout deleted successfully')
    } catch (error) {
      toast.error('Failed to delete workout')
    }
  }

  return (
    <Card className='shadow-lg bg-white rounded-xl p-5 border border-[#3A2559] flex flex-col'>
      <CardHeader className='w-full flex justify-between items-center flex-row'>
        <CardTitle className='text-lg font-bold text-[#3A2559] flex items-center gap-2'>
          {ICONS[type]} {type}
        </CardTitle>
        <Popover>
          <PopoverTrigger asChild>
            <MoreHorizontal className='text-gray-400 cursor-pointer' />
          </PopoverTrigger>
          <PopoverContent className='space-y-2 w-20 p-2'>
            <button
              className='text-grey-900 text-sm outline-none'
              onClick={() => setIsEditOpen(true)}
            >
              Edit
            </button>
            <hr />
            <button
              onClick={() => handleDelete(id as string)}
              className='text-red text-sm outline-none'
            >
              Delete
            </button>
          </PopoverContent>
        </Popover>
      </CardHeader>

      <CardContent className='space-y-2 flex-1'>
        <p className='text-gray-700'>
          <span className='font-semibold'>Duration:</span> {duration} mins
        </p>
        <p className='text-gray-700'>
          <span className='font-semibold'>Calories Burned:</span> {calories}{' '}
          kcal
        </p>
        {weight_lifted !== null && weight_lifted !== undefined && (
          <p className='text-gray-700'>
            <span className='font-semibold'>Weight Lifted:</span>{' '}
            {weight_lifted} kg
          </p>
        )}
        {distance !== null && distance !== undefined && (
          <p className='text-gray-700'>
            <span className='font-semibold'>Distance:</span> {distance} km
          </p>
        )}
      </CardContent>

      <ModalDialog
        title='Edit Workout'
        description='Modify your workout details and track your progress accurately.'
        isOpen={isEditOpen}
        setOpen={setIsEditOpen}
      >
        <LogWorkoutForm
          workoutData={{
            id,
            type,
            duration,
            calories,
            weight_lifted,
            distance,
          }}
          onSuccess={() => setIsEditOpen(false)}
        />
      </ModalDialog>
    </Card>
  )
}
