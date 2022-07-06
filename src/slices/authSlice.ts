import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'
import Amplify, { Auth } from 'aws-amplify'

import { USER_ROLE } from '../constants/userRoles'

import { getCustomerById, setCustomer } from './customerSlice'
import { getVendorById, setVendor } from './vendorSlice'

import { User } from '../constants/models/User'
import { AppThunk } from '../app/store'
import { GENDER } from '../constants/gender'
import {
  CUSTOMER_DASHBOARD,
  LOGIN,
  VENDOR_DASHBOARD,
  VENDOR_REGISTER,
} from '../constants/routes'
import { setErrorMsg, setSuccessMsg } from './alertSlice'
import { createVendor } from '../api/vendorRequests'
import { createCustomer } from '../api/customerRequests'

import { setAuthToken } from '../utils/setAuthToken'

export interface authState {
  loading: boolean
  error: string | null
  user: User | null
  isAuthenticated: boolean
  email: string
  name: string
  userId: string
  address: string
  role: USER_ROLE
  phoneNumber: string
  step: number
  forgotPasswordStep: number
  loginStep: number
  tempPassword: string
  longLoading: boolean
}

export const initialState: authState = {
  loading: false,
  error: null,
  user: null,
  isAuthenticated: false,
  email: '',
  name: '',
  phoneNumber: '',
  address: '', // set in user profile
  role: USER_ROLE.VENDOR,
  userId: '',
  step: 0,
  forgotPasswordStep: 0,
  loginStep: 0,
  tempPassword: '',
  longLoading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart(state) {
      state.loading = true
      state.error = null
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload
    },
    setIsAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setRole(state, action: PayloadAction<USER_ROLE>) {
      state.role = action.payload
    },
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload
    },
    setForgotPasswordStep(state, action: PayloadAction<number>) {
      state.forgotPasswordStep = action.payload
    },
    setLoginStep(state, action: PayloadAction<number>) {
      state.loginStep = action.payload
    },
    setTempPassword(state, action: PayloadAction<string>) {
      state.tempPassword = action.payload
    },
    setLongLoading(state, action: PayloadAction<boolean>) {
      state.longLoading = action.payload
    },
    authFailure(state, action: PayloadAction<string | null>) {
      state.loading = false
      state.error = action.payload ? action.payload : 'some error'
    },
    authComplete(state) {
      state.loading = false
    },
  },
})

export const {
  authStart,
  setIsAuthenticated,
  setUserId,
  setUser,
  setEmail,
  setStep,
  setRole,
  setForgotPasswordStep,
  setTempPassword,
  setLoginStep,
  setLongLoading,
  authFailure,
  authComplete,
} = authSlice.actions

export default authSlice.reducer

export const registerVendor =
  (
    name: string,
    email: string,
    username: string,
    phone: string,
    gender: GENDER,
    address: string,
    state: string,
    city: string,
    postalCode: string,
    dob: Date,
    country: string,
    password: string,
    navigate: NavigateFunction
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(authStart())
      const { user, userSub } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          given_name: name,
          family_name: name,
          address,
          email,
          gender: 'male',
          'custom:userRole': '0',
        },
      })
      const newUser: User = {
        id: userSub,
        name,
        email,
        username,
        phone,
        gender,
        address,
        state,
        city,
        postalCode,
        dob,
        role: USER_ROLE.VENDOR,
        country,
        profileImageUrl: 'no-url',
      }
      dispatch(setUser(newUser))
      dispatch(setEmail(email))
      dispatch(setRole(USER_ROLE.VENDOR))
      dispatch(setStep(1))

      dispatch(authComplete())
    } catch (err: any) {
      dispatch(authFailure(err.message))
      navigate(VENDOR_REGISTER)
      dispatch(setErrorMsg(err.message))
    }
  }

export const registerCustomer =
  (
    name: string,
    email: string,
    username: string,
    phone: string,
    gender: GENDER,
    country: string,
    dob: Date,
    password: string,
    navigate: NavigateFunction
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(authStart())
      const { user, userSub } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          given_name: name,
          family_name: name,
          address: '',
          email,
          gender: gender.toString(),
          'custom:userRole': '1',
        },
      })
      const newUser: User = {
        id: userSub,
        name,
        email,
        username,
        phone,
        gender,
        address: '',
        state: '',
        city: '',
        postalCode: '',
        dob,
        role: USER_ROLE.CUSTOMER,
        country,
        profileImageUrl: 'no-url',
      }
      dispatch(setUser(newUser))
      dispatch(setEmail(email))
      dispatch(setRole(USER_ROLE.CUSTOMER))
      dispatch(setStep(1))
      dispatch(authComplete())
    } catch (err: any) {
      dispatch(authFailure(err.message))
      dispatch(setErrorMsg(err.message))
    }
  }

export const confirmUser =
  (code: string, navigate: NavigateFunction): AppThunk =>
  async (dispatch, getStore) => {
    try {
      dispatch(authStart())
      const store = getStore()
      const { user, role } = store.auth
      if (user) {
        const {
          id,
          name,
          email,
          phone,
          username,
          dob,
          gender,
          role,
          address,
          state,
          city,
          postalCode,
          country,
        } = user
        const data = await Auth.confirmSignUp(email, code)
        console.log(data)
        if (role === USER_ROLE.VENDOR) {
          await createVendor(
            id,
            name,
            email,
            username,
            phone,
            gender,
            address,
            state,
            city,
            postalCode,
            dob,
            country
          )
          dispatch(setSuccessMsg('Registered as a Space Vendor'))
        } else if (role === USER_ROLE.CUSTOMER) {
          await createCustomer(
            id,
            name,
            email,
            username,
            phone,
            gender,
            address,
            state,
            city,
            postalCode,
            dob,
            country
          )
          dispatch(setSuccessMsg('Registered as a customer'))
        }
        dispatch(setStep(0))
        navigate(LOGIN)
        dispatch(authComplete())
      }
    } catch (err: any) {
      dispatch(authFailure(err.message))
      dispatch(setErrorMsg(err.message))
    }
  }

export const resendConfirmationCode =
  (): AppThunk => async (dispatch, getState) => {
    try {
      dispatch(authStart())
      const store = getState()
      const { email } = store.auth
      await Auth.resendSignUp(email)
      console.log('Code resent successfully')
      dispatch(setSuccessMsg(`Code resent to ${email}`))
      dispatch(authComplete())
    } catch (err: any) {
      console.log('error resending code: ', err)
      dispatch(authFailure(err.message))
      dispatch(setErrorMsg(err.message))
    }
  }

export const login =
  (email: string, password: string, navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(authStart())
      const user = await Auth.signIn(email, password)

      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        dispatch(setLoginStep(1))
        dispatch(setEmail(email))
        dispatch(setTempPassword(password))
      } else {
        // other situations
        const data = await Auth.currentSession()
        const accessToken = data.getAccessToken()
        const jwt = accessToken.getJwtToken()

        await setAuthToken(jwt)

        const { attributes, username } = await Auth.currentUserInfo()
        dispatch(setUserId(username))
        dispatch(setLongLoading(true))
        if (attributes['custom:userRole'] === '0') {
          dispatch(setIsAuthenticated(true))
          dispatch(setRole(USER_ROLE.VENDOR))
          dispatch(getVendorById(username))
          dispatch(setSuccessMsg('Logged in as vendor'))
          setTimeout(() => {
            navigate(VENDOR_DASHBOARD)
          }, 4000)
        } else if (attributes['custom:userRole'] === '1') {
          dispatch(setIsAuthenticated(true))
          dispatch(setRole(USER_ROLE.CUSTOMER))
          dispatch(getCustomerById(username))
          dispatch(setSuccessMsg('Logged in as customer'))
          setTimeout(() => navigate(CUSTOMER_DASHBOARD), 4000)
        } else {
          dispatch(setErrorMsg("Can't login!"))
        }
      }
      dispatch(authComplete())
    } catch (err: any) {
      navigate(LOGIN)
      dispatch(authFailure(err.message))
      dispatch(setErrorMsg(err.message))
    }
  }

export const forgotPassword =
  (email: string, navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(authStart())
      const data = await Auth.forgotPassword(email)
      dispatch(setEmail(email))
      dispatch(setSuccessMsg('Code sent to your email!'))
      dispatch(authComplete())
      // navigate to somewhere
      dispatch(setForgotPasswordStep(1))
    } catch (err: any) {
      dispatch(authFailure(err.message))
      dispatch(setErrorMsg(err.message))
    }
  }

export const forgotPasswordSubmit =
  (code: string, newPassword: string, navigate: NavigateFunction): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(authStart())
      const store = getState()
      const { email } = store.auth
      await Auth.forgotPasswordSubmit(email, code, newPassword)
      dispatch(setSuccessMsg('Updated password'))
      navigate(LOGIN)
      dispatch(authComplete())
    } catch (err: any) {
      dispatch(authFailure(err.message))
      dispatch(setErrorMsg(err.message))
    }
  }

export const updatePassword =
  (newPassword: string, navigate: NavigateFunction): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(authStart())
      const store = getState()
      const { email, tempPassword } = store.auth
      let user = await Auth.signIn(email, tempPassword)
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        user = Auth.completeNewPassword(
          user, // the Cognito User Object
          newPassword // the new password
        )
      }

      dispatch(setSuccessMsg('Updated password!'))
      dispatch(setEmail(''))
      dispatch(setTempPassword(''))
      dispatch(setLoginStep(0))
      navigate(LOGIN)
      dispatch(authComplete())
    } catch (err: any) {
      dispatch(authFailure(err.message))
      dispatch(setErrorMsg(err.message))
    }
  }

export const logout =
  (navigate: NavigateFunction): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(authStart())
      await Auth.signOut()
      dispatch(setIsAuthenticated(false))
      localStorage.clear()
      //await setAuthToken({});
      dispatch(setVendor(null))
      dispatch(setCustomer(null))
      navigate(LOGIN)
      dispatch(authComplete())
    } catch (err: any) {
      dispatch(authFailure(err.message))
      dispatch(setErrorMsg(err.message))
    }
  }
