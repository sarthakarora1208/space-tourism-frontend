import { combineReducers } from '@reduxjs/toolkit'
import alertReducer from '../slices/alertSlice'
import authReducer from '../slices/authSlice'
import vendorReducer from '../slices/vendorSlice'
import customerReducer from '../slices/customerSlice'
import spaceServiceReducer from '../slices/spaceServiceSlice'
import orderReducer from '../slices/orderSlice'
import businessReducer from '../slices/businessSlice'

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  customer: customerReducer,
  vendor: vendorReducer,
  spaceService: spaceServiceReducer,
  order: orderReducer,
  business: businessReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
