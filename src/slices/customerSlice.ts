import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'
import store, { AppThunk } from '../app/store'
import { User } from '../constants/models/User'

import * as REQUESTS from '../api/customerRequests'
import { setErrorMsg, setSuccessMsg } from './alertSlice'
import { authFailure, setUserId } from './authSlice'
import { GENDER } from '../constants/gender'

import {
  CUSTOMER_DASHBOARD,
  CUSTOMER_PROFILE,
  CUSTOMER_REGISTER,
} from '../constants/routes'
import { uploadImageToS3 } from '../api/s3requests'

export interface customerState {
  loading: boolean
  error: string | null
  customer: User | null
  customers: User[]
}

export const initialState: customerState = {
  loading: false,
  error: null,
  customer: null,
  customers: [],
}

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    customerStart(state) {
      state.loading = true
      state.error = null
    },
    setCustomer(state, action: PayloadAction<User | null>) {
      state.customer = action.payload
    },
    setCustomers(state, action: PayloadAction<User[]>) {
      state.customers = action.payload
    },
    customerFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload ? action.payload : 'There is some error'
    },
    customerComplete(state) {
      state.loading = false
    },
  },
})

export const {
  customerStart,
  setCustomer,
  setCustomers,
  customerFailure,
  customerComplete,
} = customerSlice.actions

export default customerSlice.reducer

export const getCustomerById =
  (customerId: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(customerStart())
      const customer = await REQUESTS.getCustomerById(customerId)
      dispatch(setCustomer(customer))
      dispatch(setUserId(customer.id))
      dispatch(customerComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(customerFailure(error))
      dispatch(setErrorMsg(error))
    }
  }

export const updateCustomer =
  (
    name: string,
    phone: string,
    gender: GENDER,
    address: string,
    state: string,
    city: string,
    postalCode: string,
    dob: Date,
    navigate: NavigateFunction
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(customerStart())
      const dob = store.getState().customer.customer!.dob
      const id = store.getState().customer.customer!.id
      const profileImageUrl =
        store.getState().customer.customer!.profileImageUrl
      const email = store.getState().customer.customer!.email
      // update request
      await REQUESTS.updateCustomer(
        id,
        name,
        phone,
        gender,
        address,
        state,
        city,
        profileImageUrl,
        postalCode,
        dob
      )
      dispatch(getCustomerById(id))
      dispatch(customerComplete())
      dispatch(setSuccessMsg('Updated Successfully'))

      navigate(CUSTOMER_PROFILE)
    } catch (err: any) {
      dispatch(authFailure(err.message))
      navigate(CUSTOMER_REGISTER)
      dispatch(setErrorMsg(err.message))
    }
  }

export const uploadCustomerProfileImage =
  (formData: FormData, navigate: NavigateFunction): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(customerStart())
      const profileImageUrl = await uploadImageToS3(formData)
      const {
        id,
        name,
        phone,
        gender,
        address,
        state,
        city,
        postalCode,
        dob,
        email,
      } = store.getState().customer.customer!
      await REQUESTS.updateCustomer(
        id,
        name,
        phone,
        gender,
        address,
        state,
        city,
        profileImageUrl,
        postalCode,
        dob
      )

      dispatch(getCustomerById(id))
      navigate(CUSTOMER_PROFILE)
      dispatch(customerComplete())
      dispatch(setSuccessMsg('Profile image updated!'))
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(customerFailure(error))
      dispatch(setErrorMsg(error))
    }
  }
