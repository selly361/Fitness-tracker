'use client'

import React, { useState } from 'react'
import * as Recharts from 'recharts'
import { Workout } from '@/types'
import { format } from 'date-fns'
import { Button } from '@/components/ui'

type ChartProps = {
  workouts: Workout[]
}

const RunningChart = ({ workouts }: { workouts: Workout[] }) => {
  const data = workouts
    .filter((workout) => workout.type === 'Running')
    .map((workout) => ({
      date: workout.date,
      distance: workout.distance,
    }))

  if (data.length === 0) {
    return (
      <p className='text-center text-gray-500'>
        No Running data available. Log a running workout to see progress.
      </p>
    )
  }

  return (
    <Recharts.ResponsiveContainer width='100%' height={500}>
      <Recharts.LineChart data={data}>
        <Recharts.CartesianGrid strokeDasharray='3 3' />
        <Recharts.XAxis
          dataKey='date'
          tickFormatter={(date) => format(new Date(date), 'dd MMM yyyy')}
        />
        <Recharts.YAxis
          label={{ value: 'Distance (km)', angle: -90, position: 'insideLeft' }}
        />
        <Recharts.Tooltip />
        <Recharts.Line type='monotone' dataKey='distance' stroke='#8884d8' />
      </Recharts.LineChart>
    </Recharts.ResponsiveContainer>
  )
}

const CyclingChart = ({ workouts }: { workouts: Workout[] }) => {
  const data = workouts
    .filter((workout) => workout.type === 'Cycling')
    .map((workout) => ({
      date: workout.date,
      distance: workout.distance,
    }))

  if (data.length === 0) {
    return (
      <p className='text-center text-gray-500'>
        No Cycling data available. Log a cycling workout to see progress.
      </p>
    )
  }

  return (
    <Recharts.ResponsiveContainer width='100%' height={500}>
      <Recharts.LineChart data={data}>
        <Recharts.CartesianGrid strokeDasharray='3 3' />
        <Recharts.XAxis
          dataKey='date'
          tickFormatter={(date) => format(new Date(date), 'dd MMM yyyy')}
        />
        <Recharts.YAxis
          label={{ value: 'Distance (km)', angle: -90, position: 'insideLeft' }}
        />
        <Recharts.Tooltip />
        <Recharts.Line type='monotone' dataKey='distance' stroke='#82ca9d' />
      </Recharts.LineChart>
    </Recharts.ResponsiveContainer>
  )
}

const WeightLiftingChart = ({ workouts }: { workouts: Workout[] }) => {
  const data = workouts
    .filter((workout) => workout.type === 'Weight Lifting')
    .map((workout) => ({
      date: workout.date,
      'Weight Lifted': workout.weight_lifted,
    }))

  if (data.length === 0) {
    return (
      <p className='text-center text-gray-500'>
        No Weight Lifting data available. Log a weight lifting workout to see
        progress.
      </p>
    )
  }

  return (
    <Recharts.ResponsiveContainer width='100%' height={500}>
      <Recharts.LineChart data={data}>
        <Recharts.CartesianGrid strokeDasharray='3 3' />
        <Recharts.XAxis
          dataKey='date'
          tickFormatter={(date) => format(new Date(date), 'dd MMM yyyy')}
        />
        <Recharts.YAxis
          label={{
            value: 'Weight Lifted (kg)',
            angle: -90,
            position: 'insideLeft',
          }}
        />
        <Recharts.Tooltip />
        <Recharts.Line
          type='monotone'
          dataKey='Weight Lifted'
          stroke='#ff7300'
        />
      </Recharts.LineChart>
    </Recharts.ResponsiveContainer>
  )
}

export const ChartContainer = ({ workouts }: ChartProps) => {
  const [selectedType, setSelectedType] = useState('Running')

  const filteredWorkouts = workouts.filter(
    (workout) => workout.type === selectedType
  )

  return (
    <div className='w-full h-full py-8 px-4'>
      <div className='flex justify-center mb-6'>
        <Button
          variant='outline'
          onClick={() => setSelectedType('Running')}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors ${selectedType === 'Running' ? 'text-[#842C7E] hover:bg-white hover:text-[#842C7E]' : 'text-grey-900 hover:bg-white hover:text-[#842C7E]'}`}
        >
          Running
        </Button>
        <Button
          variant='outline'
          onClick={() => setSelectedType('Cycling')}
          className={`mx-4 px-6 py-3 rounded-lg text-white font-semibold transition-colors ${selectedType === 'Cycling' ? 'text-[#842C7E] hover:bg-white hover:text-[#842C7E]' : 'text-grey-900 hover:bg-white hover:text-[#842C7E]'}`}
        >
          Cycling
        </Button>
        <Button
          variant='outline'
          onClick={() => setSelectedType('Weight Lifting')}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors ${selectedType === 'Weight Lifting' ? 'text-[#842C7E] hover:bg-white hover:text-[#842C7E]' : 'text-grey-900 hover:bg-white hover:text-[#842C7E]'}`}
        >
          Weight Lifting
        </Button>
      </div>
      <div className='flex justify-center'>
        <div className='w-[80%] h-full p-6 bg-white rounded-lg'>
          <h2 className='text-2xl font-semibold text-center mb-4'>
            {selectedType}
          </h2>
          {selectedType === 'Running' && (
            <RunningChart workouts={filteredWorkouts} />
          )}
          {selectedType === 'Cycling' && (
            <CyclingChart workouts={filteredWorkouts} />
          )}
          {selectedType === 'Weight Lifting' && (
            <WeightLiftingChart workouts={filteredWorkouts} />
          )}
        </div>
      </div>
    </div>
  )
}
