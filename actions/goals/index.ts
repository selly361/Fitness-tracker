'use server'

import { createServer } from '@/lib/supabase'
import { Goal } from '@/types'
import { revalidatePath } from 'next/cache'

export async function insertGoal(goalData: Goal) {
  const supabase = await createServer()

  const { error } = await supabase.from('goals').insert([goalData])

  if (error) throw new Error(error.message)

  revalidatePath('/')
  revalidatePath('/goals')
}

export async function updateGoal(goalData: Goal) {
  const supabase = await createServer()

  const { error } = await supabase
    .from('goals')
    .update({
      goal_name: goalData.goal_name,
      type: goalData.type,
      target_value: goalData.target_value,
      deadline: goalData.deadline,
    })
    .eq('id', goalData.id)

  if (error) throw new Error(error.message)

  revalidatePath('/')
  revalidatePath('/goals')
}

export async function getGoals(): Promise<Goal[]> {
  const supabase = await createServer()

  const { data, error } = await supabase.from('goals').select('*')

  if (error) throw new Error(error.message)

  const goals: Goal[] = data

  return goals
}

export async function deleteGoal(id: string) {
  const supabase = await createServer()

  const { error } = await supabase.from('goals').delete().eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/')
  revalidatePath('/goals')
}
