'use server'

import { LoginValidation } from '@/lib/validations'
import { createServer } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export const loginAction = async ({ email, password }: LoginValidation) => {
  const supabase = await createServer()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  redirect('/')
}
