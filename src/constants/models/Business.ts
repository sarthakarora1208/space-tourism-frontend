import { User } from './User'

export interface Business {
  id: string
  businessName: string
  address: string
  state: string
  city: string
  country: string
  postalCode: string
  createdAt: Date
  updatedAt: Date
  users: User[]
}
