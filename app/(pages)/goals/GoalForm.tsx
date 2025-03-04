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
import { insertGoal, updateGoal } from '@/actions'
import { Goal } from '@/types'
import { toast } from 'sonner'

const GOAL_TYPES = ['Running', 'Cycling', 'Weight Lifting']

interface GoalFormProps {
  onSuccess: () => void
  goalData?: Goal
}

function GoalForm({ onSuccess, goalData }: GoalFormProps) {
  const [selectedType, setSelectedType] = useState(goalData?.type || '')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Goal>({
    defaultValues: goalData || {
      current_value: 0,
      target_value: 0,
      type: '',
      goal_name: '',
    },
  })

  const type = watch('type')

  const onSubmit = async (data: Goal) => {
    try {
      if (goalData?.id) {
        await updateGoal({
          ...goalData,
          goal_name: data.goal_name,
          type: data.type,
          target_value: data.target_value,
          deadline: data.deadline,
        })
        toast.success('Goal successfully updated!')
      } else {
        await insertGoal({
          ...data,
          current_value: 0,
          status: 'in-progress',
        })
        toast.success('Goal successfully added!')
      }

      onSuccess()
    } catch (error) {
      console.error('Failed to process goal:', error)
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-6 min-h-96 w-full'
    >
      {/* Goal Name */}
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-gray-700'>
          Goal Name
        </label>
        <Input
          {...register('goal_name', { required: 'Goal name is required' })}
          type='text'
          placeholder='E.g., Run 10km in a month'
          className='border-2 rounded-md p-2 w-full'
        />
        {errors.goal_name && (
          <p className='text-red-500 text-sm'>{errors.goal_name.message}</p>
        )}
      </div>

      {/* Goal Type */}
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-gray-700'>
          Goal Type
        </label>
        <Select
          onValueChange={(value) => setValue('type', value)}
          defaultValue={goalData?.type}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select Goal Type' />
          </SelectTrigger>
          <SelectContent>
            {GOAL_TYPES.map((goalType) => (
              <SelectItem key={goalType} value={goalType}>
                {goalType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.type && (
          <p className='text-red-500 text-sm'>{errors.type.message}</p>
        )}
      </div>

      {/* Target Value */}
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-gray-700'>
          Target Value
        </label>
        <Input
          {...register('target_value', {
            required: 'Target value is required',
            min: 1,
          })}
          type='number'
          placeholder={
            type === 'Weight Lifting'
              ? 'Target weight (kg)'
              : 'Target distance (km)'
          }
          className='border-2 rounded-md p-2 w-full'
        />
        {errors.target_value && (
          <p className='text-red-500 text-sm'>{errors.target_value.message}</p>
        )}
      </div>

      {/* Deadline */}
      <div className='space-y-2'>
        <label className='block text-sm font-medium text-gray-700'>
          Deadline
        </label>
        <Input
          {...register('deadline', { required: 'Deadline is required' })}
          type='date'
          className='border-2 rounded-md p-2 w-full'
        />
        {errors.deadline && (
          <p className='text-red-500 text-sm'>{errors.deadline.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type='submit'
        disabled={isSubmitting}
        className='w-full h-12 py-3 text-white bg-[#842C7E] rounded-lg hover:bg-[#9b4d9b] transition-colors'
      >
        {isSubmitting ? 'Processing...' : goalData ? 'Update Goal' : 'Add Goal'}
      </Button>
    </form>
  )
}

export default GoalForm
