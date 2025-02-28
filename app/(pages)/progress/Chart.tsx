'use client'

import React, { useState } from 'react'
import * as Recharts from 'recharts'
import { Workout } from '@/types'
import { format } from 'date-fns'

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

  return (
    <Recharts.ResponsiveContainer width='100%' height={300}>
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

  return (
    <Recharts.ResponsiveContainer width='100%' height={300}>
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

  return (
    <Recharts.ResponsiveContainer width='100%' height={300}>
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
    <div className='w-full bg-gray-100 h-full py-8 px-4'>
      <div className='flex justify-center mb-6'>
        <button
          onClick={() => setSelectedType('Running')}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors ${selectedType === 'Running' ? 'bg-black' : 'bg-gray-600 hover:bg-gray-700'}`}
        >
          Running
        </button>
        <button
          onClick={() => setSelectedType('Cycling')}
          className={`mx-4 px-6 py-3 rounded-lg text-white font-semibold transition-colors ${selectedType === 'Cycling' ? 'bg-black' : 'bg-gray-600 hover:bg-gray-700'}`}
        >
          Cycling
        </button>
        <button
          onClick={() => setSelectedType('Weight Lifting')}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition-colors ${selectedType === 'Weight Lifting' ? 'bg-black' : 'bg-gray-600 hover:bg-gray-700'}`}
        >
          Weight Lifting
        </button>
      </div>
      <div className='flex justify-center'>
        <div className='w-[70%] p-6 bg-white shadow-lg rounded-lg'>
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
