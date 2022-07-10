import { ORDER_STATUS } from '../orderStatus'
import { Business } from './Business'
import { Review } from './Review'
import { SpaceService } from './SpaceService'
import { User } from './User'

export interface Order {
  id: string
  status: ORDER_STATUS
  amount: number
  currency: string
  serviceName: string
  startTime: Date
  endTime: Date
  cancellationReason: string
  cancellationComment: string
  chatRoomId: string
  createdAt: Date
  updatedAt: Date
  review: Review
  spaceService: SpaceService
  user: User
  business: Business
}
