import { Button } from '@/components/ui/button'
import { Metadata } from 'next/types'
import { logoutAction } from '@/actions'

export const metadata = {
  title: 'Overview',
  description:
    'Track your workouts, monitor progress, and stay motivated with LSBU Fitness Tracker.',
} as Metadata

async function Page() {
  return (
    <main>
      <h1>Welcome to LSBU Fitness Tracker</h1>

      <form>
        <Button formAction={logoutAction}>Sign Out</Button>
      </form>
    </main>
  )
}

export default Page
