import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Navigate, NavigateFunction } from 'react-router-dom'
import { Auth } from 'aws-amplify'

import store, { AppThunk } from '../app/store'

import { Order } from '../constants/models/Order'
import * as REQUESTS from '../api/orderRequests'
import { setErrorMsg, setSuccessMsg } from './alertSlice'
import { ORDER_STATUS } from '../constants/orderStatus'
import { USER_ROLE } from '../constants/userRoles'
import {} from '../constants/routes'
import { getBusinessById } from './businessSlice'
//import { getReviewById } from '../api/reviewRequests'

export interface orderState {
  loading: boolean
  error: string | null
  order: Order | null
  orders: Order[]
  initOrders: Order[]
  completedOrders: Order[]
  cancelledOrders: Order[]
  ongoingOrders: Order[]
  duration: number
  amount: number
  tabIndex: string
}

export const initialState: orderState = {
  loading: false,
  error: null,
  order: null,
  orders: [],
  initOrders: [],
  completedOrders: [],
  cancelledOrders: [],
  ongoingOrders: [],
  duration: 0,
  amount: 0,
  tabIndex: ORDER_STATUS.INIT.toString(),
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderStart(state) {
      state.loading = true
      state.error = null
    },
    setOrder(state, action: PayloadAction<Order | null>) {
      state.order = action.payload
    },
    setOrders(state, action: PayloadAction<Order[]>) {
      state.orders = action.payload
    },
    setInitOrders(state, action: PayloadAction<Order[]>) {
      state.initOrders = action.payload
    },
    setCompletedOrders(state, action: PayloadAction<Order[]>) {
      state.completedOrders = action.payload
    },
    setCancelledOrders(state, action: PayloadAction<Order[]>) {
      state.cancelledOrders = action.payload
    },
    setOngoingOrders(state, action: PayloadAction<Order[]>) {
      state.ongoingOrders = action.payload
    },

    setAmount(state, action: PayloadAction<number>) {
      state.amount = action.payload
    },
    setTabIndex(state, action: PayloadAction<string>) {
      state.tabIndex = action.payload
    },
    orderFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload ? action.payload : 'There is some error'
    },
    orderComplete(state) {
      state.loading = false
    },
  },
})

export const {
  orderStart,
  setOrder,
  orderComplete,
  setTabIndex,
  orderFailure,
  setOrders,
  setInitOrders,
  setCompletedOrders,
  setOngoingOrders,
  setCancelledOrders,
  setAmount,
} = orderSlice.actions

export default orderSlice.reducer

export const getOrderById =
  (orderId: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(orderStart())
      const store = getState()
      const order = await REQUESTS.getOrderById(orderId)
      dispatch(setOrder(order))
      dispatch(orderComplete())
    } catch (err) {
      console.log(err)
    }
  }

export const getCompletedOrdersForVendor =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const store = getState()
      const { businessId } = store.vendor

      dispatch(orderStart())
      const completedOrders = await REQUESTS.getOrdersForBusiness(
        businessId,
        ORDER_STATUS.COMPLETED
      )
      dispatch(setCompletedOrders(completedOrders))
      dispatch(orderComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(orderFailure(error))
      dispatch(setErrorMsg(error))
      console.log(err)
    }
  }

export const getInitOrdersForVendor =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const store = getState()
      const { businessId } = store.vendor

      dispatch(orderStart())
      const initOrders = await REQUESTS.getOrdersForBusiness(
        businessId,
        ORDER_STATUS.INIT
      )
      dispatch(setInitOrders(initOrders))
      dispatch(orderComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(orderFailure(error))
      dispatch(setErrorMsg(error))
      console.log(err)
    }
  }

export const getOngoingOrdersForVendor =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const store = getState()
      const { businessId } = store.vendor

      dispatch(orderStart())
      const ongoingOrders = await REQUESTS.getOrdersForBusiness(
        businessId,
        ORDER_STATUS.ONGOING
      )
      dispatch(setOngoingOrders(ongoingOrders))
      dispatch(orderComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(orderFailure(error))
      dispatch(setErrorMsg(error))
      console.log(err)
    }
  }

export const getCancelledOrdersForVendor =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const store = getState()
      const { businessId } = store.vendor

      dispatch(orderStart())
      const cancelledOrders = await REQUESTS.getOrdersForBusiness(
        businessId,
        ORDER_STATUS.CANCELLED
      )
      dispatch(setCancelledOrders(cancelledOrders))
      dispatch(orderComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(orderFailure(error))
      dispatch(setErrorMsg(error))
      console.log(err)
    }
  }

export const getCompletedOrdersForCustomer =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const store = getState()
      const { userId } = store.auth

      dispatch(orderStart())
      const completedOrders = await REQUESTS.getOrdersForCustomer(
        userId,
        ORDER_STATUS.COMPLETED
      )
      dispatch(setCompletedOrders(completedOrders))
      dispatch(orderComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(orderFailure(error))
      dispatch(setErrorMsg(error))
      console.log(err)
    }
  }

export const getOngoingOrdersForCustomer =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const store = getState()
      const { userId } = store.auth

      dispatch(orderStart())
      const ongoingOrders = await REQUESTS.getOrdersForCustomer(
        userId,
        ORDER_STATUS.ONGOING
      )
      dispatch(setOngoingOrders(ongoingOrders))
      dispatch(orderComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(orderFailure(error))
      dispatch(setErrorMsg(error))
      console.log(err)
    }
  }

export const getCancelledOrdersForCustomer =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const store = getState()
      const { userId } = store.auth

      dispatch(orderStart())
      const cancelledOrders = await REQUESTS.getOrdersForCustomer(
        userId,
        ORDER_STATUS.CANCELLED
      )
      console.log(cancelledOrders)
      dispatch(setCancelledOrders(cancelledOrders))
      dispatch(orderComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(orderFailure(error))
      dispatch(setErrorMsg(error))
      console.log(err)
    }
  }

export const cancelOrder =
  (cancellationReason: string, cancellationComment: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(orderStart())
      const orderId = store.getState().order.order?.id
      const cancelledOrder = await REQUESTS.cancelOrder(
        orderId!,
        cancellationReason,
        cancellationComment
      )

      dispatch(setOrder(null))
      const user = await Auth.currentAuthenticatedUser()
      console.log(user)

      if (
        user.attributes['custom:userRole'] === USER_ROLE.CUSTOMER.toString()
      ) {
        dispatch(getOngoingOrdersForCustomer())
        dispatch(getCancelledOrdersForCustomer())
      } else {
        dispatch(getOngoingOrdersForVendor())
        dispatch(getCancelledOrdersForVendor())
      }

      dispatch(setSuccessMsg('Flight cancelled successfully!'))
      dispatch(orderComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(orderFailure(error))
      dispatch(setErrorMsg(error))
      console.log(err)
    }
  }

export const addReview =
  (stars: number, content: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(orderStart())
      const store = getState()
      const orderId = store.order.order!.id
      const userId = store.order.order!.user.id
      const serviceId = store.order.order!.spaceService.id

      const data = await REQUESTS.addReview(
        stars,
        content,
        orderId,
        userId,
        serviceId
      )
      dispatch(setOrder(null))
      dispatch(getCompletedOrdersForCustomer())
      dispatch(setSuccessMsg('Review added successfully!'))
      dispatch(orderComplete())
    } catch (err: any) {
      console.log(err)
    }
  }

export const addReply =
  (reply: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(orderStart())
      const reviewId = store.getState().order.order?.review.id
      // const review = await getReviewById(reviewId!)
      // if (review.reply === '') {
      //   await REQUESTS.addReply(reply, reviewId!)
      //   dispatch(setSuccessMsg('Reply added successfully'))
      // } else {
      //   dispatch(setErrorMsg('You have already replied to this review'))
      // }
      dispatch(orderComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(orderFailure(error))
      dispatch(setErrorMsg(error))
      console.log(err)
    }
  }

export const completeOrder = (): AppThunk => async (dispatch) => {
  try {
    dispatch(orderStart())
    const orderId = store.getState().order.order?.id
    const completedOrder = await REQUESTS.completeOrder(orderId!)
    dispatch(getCompletedOrdersForVendor())
    dispatch(getOngoingOrdersForVendor())
    dispatch(setTabIndex(ORDER_STATUS.COMPLETED.toString()))
    dispatch(setOrder(null))
    dispatch(setSuccessMsg('Marked flight as complete!'))
    dispatch(orderComplete())
  } catch (err: any) {
    const { error } = err.response.data
    dispatch(orderFailure(error))
    dispatch(setErrorMsg(error))
  }
}

export const createOrder = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(orderStart())
    const store = getState()
    let userId = store.customer.customer!.id
    let amount = store.business.amount
    let currency = store.business.currency
    let serviceId = store.spaceService.spaceService!.id
    let serviceName = store.spaceService.spaceService!.name
    let startTime = store.spaceService.spaceService!.startTime
    let endTime = store.spaceService.spaceService!.endTime

    const order = await REQUESTS.createOrder(
      amount,
      currency,
      serviceName,
      startTime,
      endTime,
      serviceId,
      userId
    )
    dispatch(setOrder(order))
    dispatch(orderComplete())
  } catch (err: any) {
    const { error } = err.response.data
    dispatch(orderFailure(error))
    dispatch(setErrorMsg(error))
  }
}

export const markOrderAsOngoing =
  (): AppThunk => async (dispatch, getState) => {
    try {
      dispatch(orderStart())
      const store = getState()
      let orderId = store.order.order!.id

      const order = await REQUESTS.markOrderAsOngoing(orderId)
      dispatch(setOrder(order))
      dispatch(getInitOrdersForVendor())
      dispatch(getOngoingOrdersForVendor())
      dispatch(setTabIndex(ORDER_STATUS.ONGOING.toString()))
      dispatch(setSuccessMsg('Ticket confirmed'))
      dispatch(orderComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(orderFailure(error))
      dispatch(setErrorMsg(error))
    }
  }
