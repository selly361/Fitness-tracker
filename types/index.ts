// Workout type

export type Workout = {
  id?: string
  type: string
  duration: number
  calories: number
  weight_lifted?: number
  distance?: number
  date?: Date
}

// AverageWorkout

export type WorkoutAverages = {
  avg_duration: number
  avg_calories: number
  avg_distance: number
  avg_weight_lifted: number
}

// Goal type

export type Goal = {
  id?: string
  type: string
  goal_name: string
  target_value: number
  current_value: number
  deadline: Date
  status: string
}
