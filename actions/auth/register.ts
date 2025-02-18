'use server'

import type { RegisterValidation } from '@/lib/validations'
import { createServer } from '@/lib/supabase'

export const registerAction = async ({
  name,
  email,
  password,
}: RegisterValidation) => {
  const supabase = await createServer()

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: '/auth/callback',
      data: { name },
    },
  })

  if (error) {
    console.error(error.code, error.message)
    return { error: error.message }
  }

  return {
    success:
      'Thanks for signing up! Please check your email for a verification link.',
  }
}
