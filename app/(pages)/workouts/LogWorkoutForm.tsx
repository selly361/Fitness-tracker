'use client'

import { useForm } from 'react-hook-form'
import { Input, Button } from '@/components/ui'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui'
import { useState } from 'react'
import { insertWorkout } from '@/actions'
import { Workout } from '@/types'
import { toast } from 'sonner'

const WORKOUT_TYPES = ['Running', 'Cycling', 'Weight Lifting']

interface LogWorkoutFormProps {
  onSuccess: () => void
}

function LogWorkoutForm({ onSuccess }: LogWorkoutFormProps) {
  const [selectedType, setSelectedType] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Workout>()

  const type = watch('type')

  const onSubmit = async (data: Workout) => {
    try {
      await insertWorkout(data)
      onSuccess()

      toast.success('Workout successfully logged!')
    } catch (error) {
      console.error('Failed to log workout:', error)

      toast.error('Failed to log workout. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-6 min-h-96 w-full'
    >
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-gray-700'>
          Workout Type
        </label>
        <Select
          onValueChange={(value) => {
            setValue('type', value)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select Workout Type' />
          </SelectTrigger>
          <SelectContent>
            {WORKOUT_TYPES.map((workout) => (
              <SelectItem key={workout} value={workout}>
                {workout}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.type && (
          <p className='text-red-500 text-sm'>{errors.type.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <label className='block text-sm font-medium text-gray-700'>
          Duration (minutes)
        </label>
        <Input
          {...register('duration', {
            required: 'Duration is required',
            min: 1,
          })}
          type='number'
          placeholder='Duration in minutes'
          className='border-2 rounded-md p-2 w-full'
        />
        {errors.duration && (
          <p className='text-red-500 text-sm'>{errors.duration.message}</p>
        )}
      </div>

      <div className='space-y-2'>
        <label className='block text-sm font-medium text-gray-700'>
          Calories Burned
        </label>
        <Input
          {...register('calories', {
            required: 'Calories are required',
            min: 0,
          })}
          type='number'
          placeholder='Calories burned'
          className='border-2 rounded-md p-2 w-full'
        />
        {errors.calories && (
          <p className='text-red-500 text-sm'>{errors.calories.message}</p>
        )}
      </div>

      {/* Conditional Fields */}
      {type === 'Weight Lifting' && (
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>
            Weight Lifted (kg)
          </label>
          <Input
            {...register('weight_lifted', { min: 0 })}
            type='number'
            placeholder='Weight lifted in kg'
            className='border-2 rounded-md p-2 w-full'
          />
        </div>
      )}

      {type === 'Running' && (
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>
            Distance (km)
          </label>
          <Input
            {...register('distance', { min: 0 })}
            type='number'
            placeholder='Distance in km'
            className='border-2 rounded-md p-2 w-full'
          />
        </div>
      )}

      <Button
        type='submit'
        disabled={isSubmitting}
        className='w-full h-12 py-3 text-white bg-[#842C7E] rounded-lg hover:bg-[#9b4d9b] transition-colors'
      >
        {isSubmitting ? 'Logging...' : 'Log Workout'}
      </Button>
    </form>
  )
}

export default LogWorkoutForm
