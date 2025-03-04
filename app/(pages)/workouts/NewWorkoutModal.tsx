'use client'

import LogWorkoutForm from './LogWorkoutForm'
import { ModalDialog } from '@/components'
import { useState } from 'react'

function NewWorkoutModal() {
  const [isOpen, setOpen] = useState(false)

  return (
    <ModalDialog
      title='Log a New Workout'
      description='Track your fitness progress by logging your workouts. Choose a workout type and enter the details to keep yourself accountable.'
      triggerLabel='+ Log Workout'
      isOpen={isOpen}
      setOpen={setOpen}
    >
      <LogWorkoutForm onSuccess={() => setOpen(false)} />
    </ModalDialog>
  )
}

export default NewWorkoutModal
