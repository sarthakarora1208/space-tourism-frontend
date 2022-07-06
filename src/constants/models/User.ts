import { GENDER } from '../gender'
import { Business } from './Business'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  username: string
  dob: Date
  gender: GENDER
  role: number
  profileImageUrl: string
  address: string
  state: string
  city: string
  country: string
  postalCode: string
  createdAt?: Date
  updatedAt?: Date
  business?: Business
}
