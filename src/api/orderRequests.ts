import {
  ORDER_ROUTE,
  BUSINESS_ROUTE,
  CUSTOMER_ROUTE,
  REVIEW_ROUTE,
  REPLY_ROUTE,
} from '../constants/routes'
import { ORDER_STATUS } from '../constants/orderStatus'
import API from './api'
import { Order } from '../constants/models/Order'
import { Review } from '../constants/models/Review'
import { User } from '../constants/models/User'

export async function getOrderById(orderId: string) {
  try {
    const res = await API.get<{ data: Order; success: boolean }>(
      `${ORDER_ROUTE}/${orderId}`
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}
export async function updateOrder(orderId: string, chatRoomId: string) {
  try {
    const res = await API.put<{ data: Order; success: boolean }>(
      `${ORDER_ROUTE}/${orderId}`,
      {
        chatRoomId,
      }
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}
export async function getOrderBySessionId(sessionId: string) {
  try {
    const res = await API.get<{
      data: { order: Order; customer: User; vendor: User }
      success: boolean
    }>(`${ORDER_ROUTE}/${sessionId}/session`)
    return res.data.data
  } catch (err) {
    throw err
  }
}

export async function getOrdersForBusiness(
  businessId: string,
  status: ORDER_STATUS
) {
  try {
    const res = await API.get<{ data: Order[]; success: boolean }>(
      `${BUSINESS_ROUTE}/${businessId}${ORDER_ROUTE}?status=${status}`
    )

    return res.data.data
  } catch (err) {
    throw err
  }
}

export async function getOrdersForCustomer(
  customerId: string,
  status: ORDER_STATUS
) {
  try {
    const res = await API.get<{ data: Order[]; success: boolean }>(
      `${CUSTOMER_ROUTE}/${customerId}${ORDER_ROUTE}?status=${status}`
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}

export async function completeOrder(orderId: string) {
  try {
    const res = await API.post<{ data: Order[]; success: boolean }>(
      `${ORDER_ROUTE}/${orderId}/complete`
    )
    return res.data.data
    console.log(res.data.data)
  } catch (err) {
    throw err
  }
}

export async function createOrder() {
  try {
    const res = await API.post<{ data: string; success: boolean }>(
      `${ORDER_ROUTE}`,
      {}
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}

export async function cancelOrder(
  orderId: string,
  cancellationComment: string,
  cancellationReason: string
) {
  try {
    const res = await API.post<{ data: Order[]; success: boolean }>(
      `${ORDER_ROUTE}/${orderId}/cancel`,
      { cancellationComment, cancellationReason }
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}

export async function addReview(
  stars: number,
  content: string,
  orderId: string,
  userId: string,
  serviceId: string
) {
  try {
    const res = await API.post<{ data: Review; success: boolean }>(
      `${REVIEW_ROUTE}`,
      { stars, content, orderId, userId, serviceId }
    )
    return res.data.data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export async function addReply(reply: string, reviewId: string) {
  try {
    const res = await API.post<{ data: Review; success: boolean }>(
      `${REVIEW_ROUTE}/${reviewId}${REPLY_ROUTE}`,
      {
        reply,
      }
    )
    return res.data.data
  } catch (err) {
    console.log(err)
    throw err
  }
}
