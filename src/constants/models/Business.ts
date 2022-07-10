import { Order } from './Order'
import { Review } from './Review'
import { SpaceService } from './SpaceService'
import { User } from './User'

export interface Business {
  id: string
  businessName: string
  eWallet: string
  contact: string
  isVerified: boolean
  country: string
  address: string
  createdAt: Date
  updatedAt: Date
  users: User[]
  order: Order[]
  spaceServices: SpaceService[]
  reviews: Review[]
}
