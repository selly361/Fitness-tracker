import React, { Fragment } from 'react'
import { getWorkouts } from '@/actions'
import WorkoutCard from './WorkoutCard'
import NewWorkoutModal from './NewWorkoutModal'

export default async function WorkoutsPage() {
  const workouts = await getWorkouts()

  const runningWorkouts = workouts.filter(
    (workout) => workout.type === 'Running'
  )
  const cyclingWorkouts = workouts.filter(
    (workout) => workout.type === 'Cycling'
  )
  const weightLiftingWorkouts = workouts.filter(
    (workout) => workout.type === 'Weight Lifting'
  )

  return (
    <Fragment>
      <section className='w-full flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-[#3A2559]'>Workouts</h1>
        <NewWorkoutModal />
      </section>

      <section className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='flex flex-col'>
          <h2 className='text-2xl font-bold text-[#3A2559] mb-4'>Running</h2>
          <div className='space-y-4'>
            {runningWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} {...workout} />
            ))}
          </div>
        </div>

        <div className='flex flex-col'>
          <h2 className='text-2xl font-bold text-[#3A2559] mb-4'>Cycling</h2>
          <div className='space-y-4'>
            {cyclingWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} {...workout} />
            ))}
          </div>
        </div>

        <div className='flex flex-col'>
          <h2 className='text-2xl font-bold text-[#3A2559] mb-4'>
            Weight Lifting
          </h2>
          <div className='space-y-4'>
            {weightLiftingWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} {...workout} />
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  )
}
