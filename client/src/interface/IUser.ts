export interface IUser {
  id: string
  name: string
  hourlyRate: number
}

export interface UserState {
  user: IUser | null
}
