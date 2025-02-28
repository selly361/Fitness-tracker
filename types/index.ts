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
