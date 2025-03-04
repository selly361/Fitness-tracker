import React, { Fragment } from 'react'
import { getWorkouts } from '@/actions'
import { ChartContainer } from './Chart'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Page() {
  const workouts = await getWorkouts()

  return (
    <Fragment>
      <section className='w-full h-full mb-6'>
        <h1 className='text-3xl font-bold text-[#3A2559]'>Progress</h1>

        {workouts.length > 0 ? (
          <ChartContainer workouts={workouts} />
        ) : (
          <div className='flex flex-col items-center justify-center h-full p-10 rounded-lg'>
            <p className='text-lg text-grey-500 mb-4'>
              No workout data available. Start tracking your fitness progress
              now!
            </p>
            <Link href='/workouts'>
              <Button className='bg-[#842C7E] hover:bg-[#9b4d9b] text-white py-5'>
                + Log Your First Workout
              </Button>
            </Link>
          </div>
        )}
      </section>
    </Fragment>
  )
}
