import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../app/store'
import { SpaceService } from '../constants/models/SpaceService'
import { setErrorMsg, setSuccessMsg } from './alertSlice'
import * as REQUESTS from '../api/spaceServiceRequests'
import { NavigateFunction } from 'react-router-dom'
import { Rate } from '../constants/models/Rate'
import { uploadImageToS3 } from '../api/s3requests'
import {
  CUSTOMER_DASHBOARD,
  editService,
  VENDOR_ORDERS,
} from '../constants/routes'
import { getBusinessById } from './businessSlice'

export interface SpaceServiceState {
  loading: boolean
  error: string | null
  spaceService: SpaceService | null
  spaceServices: SpaceService[]
  rates: Rate[]
  imageUrl: string
  filename: string
}

export const initialState: SpaceServiceState = {
  loading: false,
  error: null,
  spaceService: null,
  spaceServices: [],
  rates: [],
  imageUrl: 'no-url',
  filename: '',
}

const spaceServiceSlice = createSlice({
  name: 'SpaceService',
  initialState,
  reducers: {
    spaceServiceStart(state) {
      state.loading = true
      state.error = null
    },
    setSpaceService(state, action: PayloadAction<SpaceService>) {
      state.spaceService = action.payload
    },
    setSpaceServiceImageUrl(state, action: PayloadAction<string>) {
      state.imageUrl = action.payload
    },
    setSpaceServiceImageFileName(state, action: PayloadAction<string>) {
      state.filename = action.payload
    },
    setSpaceServices(state, action: PayloadAction<SpaceService[]>) {
      state.spaceServices = action.payload
    },
    setRates(state, action: PayloadAction<Rate[]>) {
      state.rates = action.payload
    },
    addRateToSpaceService(state, action: PayloadAction<Rate>) {
      state.rates = [...state.rates, action.payload]
    },
    removeRateFromSpaceService(state) {
      state.rates = [...state.rates.slice(0, -1)]
    },
    changeRate(state, action: PayloadAction<Rate>) {
      let filterRate = state.rates.filter(
        (rate) => rate.id === action.payload.id
      )
      //update the rate in the state
      filterRate[0].amount = action.payload.amount
      filterRate[0].currency = action.payload.currency
      filterRate[0].country = action.payload.country

      state.rates = [...state.rates]
    },
    spaceServiceFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload ? action.payload : 'There is some error'
    },
    spaceServiceComplete(state) {
      state.loading = false
    },
  },
})

export const {
  spaceServiceStart,
  setSpaceService,
  setSpaceServices,
  setSpaceServiceImageFileName,
  setSpaceServiceImageUrl,
  setRates,
  addRateToSpaceService,
  removeRateFromSpaceService,
  changeRate,
  spaceServiceFailure,
  spaceServiceComplete,
} = spaceServiceSlice.actions

export default spaceServiceSlice.reducer

export const getSpaceServices = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(spaceServiceStart())
    const store = getState()
    const spaceServices = await REQUESTS.getSpaceServices()
    dispatch(setSpaceServices(spaceServices))
    dispatch(spaceServiceComplete())
  } catch (err: any) {
    const { error } = err.response.data
    dispatch(spaceServiceFailure(error))
    dispatch(setErrorMsg(error))
  }
}

export const getSpaceServiceById =
  (id: string, navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(spaceServiceStart())
      const spaceService = await REQUESTS.getSpaceServiceById(id)
      dispatch(setSpaceService(spaceService))
      dispatch(setSpaceServiceImageUrl(spaceService.imageUrl))
      dispatch(setRates(spaceService.rates))
      dispatch(spaceServiceComplete())
      navigate(editService(id))
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(spaceServiceFailure(error))
      dispatch(setErrorMsg(error))
    }
  }

export const getSpaceServicesForBusiness =
  (): AppThunk => async (dispatch, getState) => {
    try {
      dispatch(spaceServiceStart())
      const store = getState()
      const businessId = store.vendor.businessId
      const spaceServices = await REQUESTS.getSpaceServicesForBusiness(
        businessId
      )
      dispatch(setSpaceServices(spaceServices))
      dispatch(spaceServiceComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(spaceServiceFailure(error))
      dispatch(setErrorMsg(error))
    }
  }

export const createSpaceService =
  (
    name: string,
    description: string,
    seats: number,
    startTime: Date,
    endTime: Date,
    navigate: NavigateFunction
  ): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(spaceServiceStart())
      const store = getState()
      const businessId = store.vendor.businessId
      const imageUrl = store.spaceService.imageUrl
      const rates = store.spaceService.rates

      const spaceService = await REQUESTS.createSpaceService(
        name,
        description,
        seats,
        startTime,
        endTime,
        imageUrl,
        businessId,
        rates
      )
      dispatch(setSpaceService(spaceService))
      dispatch(setSuccessMsg('Space Service created successfully'))
      navigate(VENDOR_ORDERS)
      dispatch(spaceServiceComplete())
    } catch (err: any) {
      console.log(err)
      const { error } = err.response.data
      dispatch(spaceServiceFailure(error))
      dispatch(setErrorMsg(error))
    }
  }

export const updateSpaceService =
  (
    id: string,
    name: string,
    description: string,
    seats: number,
    startTime: Date,
    endTime: Date,
    navigate: NavigateFunction
  ): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(spaceServiceStart())
      const store = getState()
      const imageUrl = store.spaceService.imageUrl
      const spaceService = await REQUESTS.updateSpaceService(
        id,
        name,
        description,
        seats,
        startTime,
        endTime,
        imageUrl
      )
      dispatch(setSpaceService(spaceService))
      navigate(-1)
      dispatch(spaceServiceComplete())
    } catch (err: any) {
      console.log(err)
      const { error } = err.response.data
      dispatch(spaceServiceFailure(error))
      dispatch(setErrorMsg(error))
    }
  }

export const changeSpaceServiceStatus =
  (id: string, status: boolean): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(spaceServiceStart())
      const resultStatus = await REQUESTS.changeSpaceServiceStatus(id, status)
      console.log(resultStatus)
      dispatch(setSuccessMsg('Service status updated successfully'))
      dispatch(getSpaceServicesForBusiness())
      dispatch(spaceServiceStart())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(spaceServiceFailure(error))
      dispatch(setErrorMsg(error))
    }
  }

export const uploadSpaceServiceImageToS3 =
  (formData: FormData): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(spaceServiceStart())
      const data = await uploadImageToS3(formData)
      dispatch(setSpaceServiceImageUrl(data))
      dispatch(spaceServiceComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(spaceServiceFailure(error))
      dispatch(setErrorMsg(error))
    }
  }

export const getSpaceServiceByIdForOrder =
  (id: string, navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(spaceServiceStart())
      const spaceService = await REQUESTS.getSpaceServiceById(id)
      dispatch(setSpaceService(spaceService))
      dispatch(setSpaceServiceImageUrl(spaceService.imageUrl))
      dispatch(getBusinessById(spaceService!.business!.id))
      dispatch(spaceServiceComplete())
      navigate(`${CUSTOMER_DASHBOARD}/book-service/${id}`)
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(spaceServiceFailure(error))
      dispatch(setErrorMsg(error))
    }
  }
