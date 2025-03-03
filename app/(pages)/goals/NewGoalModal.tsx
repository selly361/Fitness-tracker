'use client'

import GoalForm from './GoalForm'
import { ModalDialog } from '@/components'
import { useState } from 'react'

function NewGoalModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ModalDialog
      title='Set a New Goal'
      description='Stay motivated by setting fitness goals. Choose a goal type, define your target, and track your progress.'
      triggerLabel='+ Add Goal'
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      <GoalForm onSuccess={() => setIsOpen(false)} />
    </ModalDialog>
  )
}

export default NewGoalModal
