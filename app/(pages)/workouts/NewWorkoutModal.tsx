'use client'

import LogWorkoutForm from './LogWorkoutForm'
import { ModalDialog } from '@/components'
import { useState } from 'react'

function NewWorkoutModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ModalDialog
      title='Log a New Workout'
      description='Track your fitness progress by logging your workouts. Choose a workout type and enter the details to keep yourself accountable.'
      triggerLabel='+ Log Workout'
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      <LogWorkoutForm onSuccess={() => setIsOpen(false)} />
    </ModalDialog>
  )
}

export default NewWorkoutModal
