import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'

import * as REQUESTS from '../api/vendorRequests'
import { setErrorMsg, setSuccessMsg, setInfoMsg } from './alertSlice'
import { User } from '../constants/models/User'
import { authFailure, setUserId } from './authSlice'

import { GENDER } from '../constants/gender'
import store, { AppThunk } from '../app/store'
import { VENDOR_PROFILE, VENDOR_REGISTER } from '../constants/routes'
import { uploadImageToS3 } from '../api/s3requests'

export interface vendorState {
  loading: boolean
  error: string | null
  vendorName: string
  vendor: User | null
  businessId: string
  profileImageUrl: string
}

export const initialState: vendorState = {
  loading: false,
  error: null,
  vendorName: '',
  businessId: '',
  vendor: null,
  profileImageUrl: '',
}

const vendorSlice = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
    vendorStart(state) {
      state.loading = true
      state.error = null
    },
    setVendorName(state, action: PayloadAction<string>) {
      state.vendorName = action.payload
    },
    setVendor(state, action: PayloadAction<User | null>) {
      state.vendor = action.payload
    },

    setBusinessId(state, action: PayloadAction<string>) {
      state.businessId = action.payload
    },
    setProfileImage(state, action: PayloadAction<string>) {
      state.profileImageUrl = action.payload
    },

    vendorFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload ? action.payload : 'There is some error'
    },
    vendorComplete(state) {
      state.loading = false
    },
  },
})

export const {
  vendorStart,
  setVendorName,
  setBusinessId,
  setProfileImage,
  setVendor,
  vendorFailure,
  vendorComplete,
} = vendorSlice.actions

export default vendorSlice.reducer

export const getVendorById =
  (vendorId: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(vendorStart())
      const vendor = await REQUESTS.getVendorById(vendorId)
      dispatch(setVendor(vendor))
      dispatch(setUserId(vendor.id))
      dispatch(setBusinessId(vendor.business!.id))
      dispatch(vendorComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(vendorFailure(error))
      dispatch(setErrorMsg(error))
    }
  }

// export const getVendorReviews = (): AppThunk => async (dispatch) => {
//   try {
//     dispatch(vendorStart())
//     const businessId = store.getState().vendor.businessId
//     const reviews = await REQUESTS.getVendorReviews(businessId)
//     dispatch(setVendorReviews(reviews))
//     dispatch(vendorComplete())
//   } catch (err: any) {
//     const { error } = err.response.data
//     dispatch(vendorFailure(error))
//     dispatch(setErrorMsg(error))
//   }
// }

export const updateVendor =
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
      dispatch(vendorStart())
      const profileImageUrl = store.getState().vendor.vendor!.profileImageUrl
      const dob = store.getState().vendor.vendor!.dob
      const id = store.getState().vendor.vendor!.id
      // update request
      await REQUESTS.updateVendor(
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
      dispatch(getVendorById(id))
      dispatch(vendorComplete())
      dispatch(setSuccessMsg('Updated Successfully'))

      navigate(VENDOR_PROFILE)
    } catch (err: any) {
      dispatch(authFailure(err.message))
      navigate(VENDOR_REGISTER)
      dispatch(setErrorMsg(err.message))
    }
  }

export const uploadVendorProfileImageUrl =
  (formData: FormData, navigate: NavigateFunction): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(vendorStart())
      const profileImageUrl = await uploadImageToS3(formData)
      dispatch(setProfileImage(profileImageUrl))
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
      } = store.getState().vendor.vendor!

      await REQUESTS.updateVendor(
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
      dispatch(getVendorById(id))
      navigate(VENDOR_PROFILE)
      dispatch(vendorComplete())
      dispatch(setSuccessMsg('Profile image updated!'))
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(vendorFailure(error))
      dispatch(setErrorMsg(error))
    }
  }
