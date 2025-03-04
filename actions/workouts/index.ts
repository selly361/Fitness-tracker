'use server'

import { createServer } from '@/lib/supabase'
import { Workout } from '@/types'
import { revalidatePath } from 'next/cache'

export async function insertWorkout(workoutData: Workout) {
  const supabase = await createServer()

  const { error } = await supabase.from('workouts').insert([workoutData])

  if (error) throw new Error(error.message)

  revalidatePath('/')
  revalidatePath('/workouts')
}

export async function updateWorkout(workoutData: Workout) {
  const supabase = await createServer()

  const { error } = await supabase
    .from('workouts')
    .update({
      type: workoutData.type,
      duration: workoutData.duration,
      calories: workoutData.calories,
      weight_lifted: workoutData.weight_lifted,
      distance: workoutData.distance,
    })
    .eq('id', workoutData.id)

  if (error) throw new Error(error.message)

  revalidatePath('/')
  revalidatePath('/workouts')
}

export async function getWorkouts(): Promise<Workout[]> {
  const supabase = await createServer()

  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .order('date', { ascending: true })

  if (error) throw new Error(error.message)

  const workouts: Workout[] = data

  return workouts
}

export async function deleteWorkout(id: string) {
  const supabase = await createServer()

  const { error } = await supabase.from('workouts').delete().eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/')
  revalidatePath('/workouts')
}
