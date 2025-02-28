import React, { Fragment } from 'react'
import { getWorkouts } from '@/actions'
import { ChartContainer } from './Chart'

export default async function page() {
  const workouts = await getWorkouts()

  return (
    <Fragment>
      <section className='w-full mb-6'>
        <h1 className='text-3xl font-bold text-[#3A2559]'>Progress</h1>
        <ChartContainer workouts={workouts} />
      </section>
    </Fragment>
  )
}
