import { Business } from './Business'
import { Rate } from './Rate'

export interface SpaceService {
  id: string
  name: string
  description: string
  seats: number
  seatsLeft: number
  averageRating: number
  reviewCount: number
  isAvailable: boolean
  imageUrl: string
  startTime: Date
  endTime: Date
  createdAt: Date
  updatedAt: Date
  business?: Business
  rates: Rate[]
}
