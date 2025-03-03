import React, { Fragment } from 'react'
import { getGoals } from '@/actions'
import GoalCard from './GoalCard'
import NewGoalModal from './NewGoalModal'

export default async function GoalsPage() {
  const goals = await getGoals()

  const runningGoals = goals.filter((goal) => goal.type === 'Running')
  const cyclingGoals = goals.filter((goal) => goal.type === 'Cycling')
  const weightLiftingGoals = goals.filter(
    (goal) => goal.type === 'Weight Lifting'
  )

  return (
    <Fragment>
      <section className='w-full flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-[#3A2559]'>Goals</h1>
        <NewGoalModal />
      </section>
      <section className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='flex flex-col'>
          <h2 className='text-2xl font-bold text-[#3A2559] mb-4'>Running</h2>
          <div className='space-y-4'>
            {runningGoals.length > 0 ? (
              runningGoals.map((goal) => <GoalCard key={goal.id} {...goal} />)
            ) : (
              <p className='text-gray-500'>No running goals set.</p>
            )}
          </div>
        </div>
        <div className='flex flex-col'>
          <h2 className='text-2xl font-bold text-[#3A2559] mb-4'>Cycling</h2>
          <div className='space-y-4'>
            {cyclingGoals.length > 0 ? (
              cyclingGoals.map((goal) => <GoalCard key={goal.id} {...goal} />)
            ) : (
              <p className='text-gray-500'>No cycling goals set.</p>
            )}
          </div>
        </div>
        <div className='flex flex-col'>
          <h2 className='text-2xl font-bold text-[#3A2559] mb-4'>
            Weight Lifting
          </h2>
          <div className='space-y-4'>
            {weightLiftingGoals.length > 0 ? (
              weightLiftingGoals.map((goal) => (
                <GoalCard key={goal.id} {...goal} />
              ))
            ) : (
              <p className='text-gray-500'>No weight lifting goals set.</p>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  )
}
