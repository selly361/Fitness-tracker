'use server'

import { createServer } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export const logoutAction = async () => {
  const supabase = await createServer()
  await supabase.auth.signOut()
  return redirect('/login')
}
