import { getGoals, getWorkouts } from '@/actions'
import { createServer } from '@/lib/supabase'
import DashboardClient from './DashboardClient'
import { WorkoutAverages, Goal, Workout } from '@/types'

export const metadata = {
  title: 'Dashboard',
  description: 'Track your workouts, monitor progress, and stay motivated.',
}

export default async function DashboardPage() {
  const supabase = await createServer()

  const { data } = await supabase.rpc('get_workout_averages').single()

  const workoutAverages = data as WorkoutAverages

  console.log(workoutAverages)

  const goals: Goal[] = (await getGoals()).slice(0, 3)

  const workouts: Workout[] = await getWorkouts()

  return (
    <DashboardClient
      workoutAverages={workoutAverages}
      goals={goals}
      workouts={workouts}
    />
  )
}
