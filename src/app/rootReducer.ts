import { combineReducers } from '@reduxjs/toolkit'
import alertReducer from '../slices/alertSlice'
import authReducer from '../slices/authSlice'
import vendorReducer from '../slices/vendorSlice'
import customerReducer from '../slices/customerSlice'

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  customer: customerReducer,
  vendor: vendorReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
