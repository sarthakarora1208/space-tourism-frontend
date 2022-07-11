import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'
import { AppThunk } from '../app/store'
import { setErrorMsg, setSuccessMsg } from './alertSlice'
import * as REQUESTS from '../api/businessRequests'
import { Business } from '../constants/models/Business'
import { getVendorById } from './vendorSlice'
import { IBankAccount } from '../constants/models/IBankAccount'

export interface businessState {
  loading: boolean
  error: string | null
  business: Business | null
  bankAccounts: IBankAccount[]
}

export const initialState: businessState = {
  loading: false,
  error: null,
  business: null,
  bankAccounts: [],
}

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    businessStart(state) {
      state.loading = true
      state.error = null
    },
    setBusiness(state, action: PayloadAction<Business>) {
      state.business = action.payload
    },
    setBankAccounts(state, action: PayloadAction<IBankAccount[]>) {
      state.bankAccounts = action.payload
    },
    businessFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload ? action.payload : 'There is some error'
    },
    businessComplete(state) {
      state.loading = false
    },
  },
})

export const {
  businessStart,
  setBusiness,
  setBankAccounts,
  businessFailure,
  businessComplete,
} = businessSlice.actions

export default businessSlice.reducer

export const getBusinessById =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(businessStart())
      const business = await REQUESTS.getBusinessById(id)
      dispatch(setBusiness(business))
      dispatch(businessComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(businessFailure(error))
      dispatch(setErrorMsg(error))
    }
  }

export const verifyIdentity =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(businessStart())
      const url = await REQUESTS.verifyIdentity(id)
      window.location.replace(url)
      dispatch(businessComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(businessFailure(error))
      dispatch(setErrorMsg(error))
    }
  }

export const getVirtualAccounts =
  (): AppThunk => async (dispatch, getState) => {
    try {
      dispatch(businessStart())
      const store = getState()
      const bankAccounts = await REQUESTS.getVirtualAccounts(
        store.spaceService.spaceService!.business!.id
      )
      dispatch(setBankAccounts(bankAccounts))
      dispatch(businessComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(businessFailure(error))
      dispatch(setErrorMsg(error))
    }
  }
