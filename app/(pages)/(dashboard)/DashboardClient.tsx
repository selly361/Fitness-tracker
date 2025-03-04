'use client'

import { WorkoutAverages, Goal, Workout } from '@/types'
import { logoutAction } from '@/actions'
import GoalCard from '@/app/(pages)/goals/GoalCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Timer, Flame, MapPin, Dumbbell } from 'lucide-react'
import { ChartContainer } from '@/app/(pages)/progress/Chart'
import { JSX } from 'react'

interface DashboardClientProps {
  workoutAverages: WorkoutAverages
  goals: Goal[]
  workouts: Workout[]
}

export default function DashboardClient({
  workoutAverages,
  goals,
  workouts,
}: DashboardClientProps) {
  return (
    <main className='p-6 space-y-6'>
      {/* Header Section */}
      <header className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-[#3A2559]'>Dashboard</h1>
        <form>
          <Button formAction={logoutAction} variant='destructive'>
            Sign Out
          </Button>
        </form>
      </header>

      {/* Workout Stats Summary */}
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatCard
          title='Avg Duration'
          value={`${Math.floor(workoutAverages?.avg_duration) || 0} min`}
          icon={<Timer size={28} className='text-[#842C7E]' />}
        />
        <StatCard
          title='Avg Calories Burned'
          value={`${Math.floor(workoutAverages?.avg_calories) || 0} kcal`}
          icon={<Flame size={28} className='text-[#842C7E]' />}
        />
        <StatCard
          title='Avg Distance'
          value={`${Math.floor(workoutAverages?.avg_distance) || 0} km`}
          icon={<MapPin size={28} className='text-[#842C7E]' />}
        />
        <StatCard
          title='Avg Weight Lifted'
          value={`${Math.floor(workoutAverages?.avg_weight_lifted) || 0} kg`}
          icon={<Dumbbell size={28} className='text-[#842C7E]' />}
        />
      </section>

      {/* Dashboard Grid Layout */}
      <section className='grid grid-cols-1 md:grid-cols-2 gap-6 h-max'>
        {/* Left Side: Smaller Chart */}
        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200'>
          <h2 className='text-2xl font-bold text-[#3A2559] mb-4'>
            Workout Progress
          </h2>
          {workouts.length > 0 ? (
            <ChartContainer workouts={workouts} />
          ) : (
            <p className='text-gray-500'>No workouts logged yet.</p>
          )}
        </div>

        {/* Right Side: Goal Summary */}
        <div className='bg-white p-6 rounded-lg shadow-md border border-gray-200 h-max'>
          <h2 className='text-2xl font-bold text-[#3A2559] mb-4'>
            Recent Goal Progress
          </h2>
          {goals.length > 0 ? (
            <div className='flex flex-col gap-8'>
              <GoalCard key={goals[0].id} {...goals[0]} />
              {goals[1] && <GoalCard key={goals[1]?.id} {...goals[1]} />}
            </div>
          ) : (
            <p className='text-gray-500'>No active goals set.</p>
          )}
        </div>
      </section>
    </main>
  )
}

/* 📌 Stats Card Component */
function StatCard({
  title,
  value,
  icon,
}: {
  title: string
  value: string
  icon: JSX.Element
}) {
  return (
    <Card className='shadow-md bg-white rounded-xl p-5 border border-[#3A2559]'>
      <CardHeader className='flex flex-row justify-between items-center'>
        <CardTitle className='text-lg font-bold text-[#3A2559]'>
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className='text-2xl font-semibold'>{value}</p>
      </CardContent>
    </Card>
  )
}
