export interface IUser {
  id: number
  clerkId: string
  name: string
  email: string
  profilePicture?: string
  trainedModelCount: number
  coins: number
  // outputImages!: OutputImages[]

  // models!: Model[]
}
