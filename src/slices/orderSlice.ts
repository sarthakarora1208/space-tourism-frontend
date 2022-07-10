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
  completedOrders: Order[]
  cancelledOrders: Order[]
  ongoingOrders: Order[]
  duration: number
  amount: number
}

export const initialState: orderState = {
  loading: false,
  error: null,
  order: null,
  orders: [],
  completedOrders: [],
  cancelledOrders: [],
  ongoingOrders: [],
  duration: 0,
  amount: 0,
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
  orderFailure,
  setOrders,
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
export const getOrders = (): AppThunk => async (dispatch, getState) => {
  try {
    const store = getState()
    const { role, userId } = store.auth
    const { businessId } = store.vendor

    console.log(role)
    console.log(userId)
    console.log(businessId)
    if (role === USER_ROLE.CUSTOMER) {
      dispatch(orderStart())
      const completedOrders = await REQUESTS.getOrdersForCustomer(
        userId,
        ORDER_STATUS.COMPLETED
      )
      console.log('completedOrders', completedOrders)
      const ongoingOrders = await REQUESTS.getOrdersForCustomer(
        userId,
        ORDER_STATUS.ONGOING
      )
      console.log('ongoingOrders', ongoingOrders)
      const cancelledOrders = await REQUESTS.getOrdersForCustomer(
        userId,
        ORDER_STATUS.CANCELLED
      )
      console.log('cancelledOrders', cancelledOrders)
      dispatch(setOngoingOrders(ongoingOrders))
      dispatch(setCompletedOrders(completedOrders))
      dispatch(setCancelledOrders(cancelledOrders))
      dispatch(orderComplete())
    } else if (role === USER_ROLE.VENDOR) {
      dispatch(orderStart())
      const completedOrders = await REQUESTS.getOrdersForBusiness(
        businessId,
        ORDER_STATUS.COMPLETED
      )
      console.log(completedOrders)
      const ongoingOrders = await REQUESTS.getOrdersForBusiness(
        businessId,
        ORDER_STATUS.ONGOING
      )
      const cancelledOrders = await REQUESTS.getOrdersForBusiness(
        businessId,
        ORDER_STATUS.CANCELLED
      )
      dispatch(setOngoingOrders(ongoingOrders))
      dispatch(setCompletedOrders(completedOrders))
      dispatch(setCancelledOrders(cancelledOrders))
      dispatch(orderComplete())
    }
  } catch (err: any) {
    // const { error } = err.response.data;
    // dispatch(orderFailure(error));
    // dispatch(setErrorMsg(error));
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

      dispatch(setSuccessMsg('Order cancelled successfully'))
      dispatch(orderComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(orderFailure(error))
      dispatch(setErrorMsg(error))
      console.log(err)
    }
  }

export const addReview =
  (star: number, review: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(orderStart())
      const store = getState()
      const orderId = store.order.order!.id
      const userId = store.order.order!.user.id

      let serviceId: string = ''

      //const data = await REQUESTS.addReview()
      //console.log(data)
      dispatch(setOrder(null))
      dispatch(getCompletedOrdersForCustomer())
      dispatch(setSuccessMsg('Review added successfully!'))
      dispatch(orderComplete())
    } catch (err: any) {
      console.log(err)
    }
  }

// export const addReply =
//   (reply: string): AppThunk =>
//   async (dispatch) => {
//     try {
//       dispatch(orderStart())
//       const reviewId = store.getState().order.order?.review.id
//       const review = await getReviewById(reviewId!)
//       if (review.reply === '') {
//         await REQUESTS.addReply(reply, reviewId!)
//         dispatch(setSuccessMsg('Reply added successfully'))
//       } else {
//         dispatch(setErrorMsg('You have already replied to this review'))
//       }
//       dispatch(orderComplete())
//     } catch (err: any) {
//       const { error } = err.response.data
//       dispatch(orderFailure(error))
//       dispatch(setErrorMsg(error))
//       console.log(err)
//     }
//   }

export const createBabySitterOrder =
  (
    startTime: Date,
    endTime: Date,
    childrenIds: string[],
    navigate: NavigateFunction
  ): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(orderStart())
      const store = getState()

      const customerId = store.auth.userId
      const customer = store.customer.customer

      const amount = store.order.amount

      // const vendor = store.business.business!.users[0];

      const url = await REQUESTS.createOrder()
      dispatch(orderComplete())
      window.location.replace(url)
      //dispatch(setOrder(order));
      //dispatch(getOngoingOrdersForCustomer());
      //navigate(CUSTOMER_ORDERS);
      //dispatch(setSuccessMsg("Order placed successfully"));
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
    const chatRoomId = store.getState().order.order?.chatRoomId
    const completedOrder = await REQUESTS.completeOrder(orderId!)
    console.log('completedOrder', orderId)
    dispatch(getCompletedOrdersForCustomer())
    dispatch(getOngoingOrdersForCustomer())
    dispatch(setOrder(null))
    dispatch(setSuccessMsg('Marked order as complete!'))
    dispatch(orderComplete())
  } catch (err: any) {
    const { error } = err.response.data
    dispatch(orderFailure(error))
    dispatch(setErrorMsg(error))
  }
}
