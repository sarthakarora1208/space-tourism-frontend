import { Business } from './Business'
import { Order } from './Order'
import { SpaceService } from './SpaceService'
import { User } from './User'

export interface Review {
  id: string
  serviceType: number
  stars: number
  content: string
  reply: string
  createdAt: Date
  updatedAt: Date
  order: Order
  business: Business
  spaceService: SpaceService
  user: User | null
}
