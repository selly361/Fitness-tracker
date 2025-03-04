'use client'

import GoalForm from './GoalForm'
import { ModalDialog } from '@/components'
import { useState } from 'react'

function NewGoalModal() {
  const [isOpen, setOpen] = useState(false)

  return (
    <ModalDialog
      title='Set a New Goal'
      description='Stay motivated by setting fitness goals. Choose a goal type, define your target, and track your progress.'
      triggerLabel='+ Add Goal'
      isOpen={isOpen}
      setOpen={setOpen}
    >
      <GoalForm onSuccess={() => setOpen(false)} />
    </ModalDialog>
  )
}

export default NewGoalModal
