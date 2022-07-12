import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'
import { AppThunk } from '../app/store'
import { setErrorMsg, setSuccessMsg } from './alertSlice'
import * as REQUESTS from '../api/businessRequests'
import { Business } from '../constants/models/Business'
import { getVendorById } from './vendorSlice'
import { IBankAccount } from '../constants/models/IBankAccount'
import { BankResponse } from '../constants/models/BankResponse'
import { Transaction } from '../constants/models/Transaction'
import { viewVirtualAccountTransactions } from '../constants/routes'

export interface businessState {
  loading: boolean
  error: string | null
  business: Business | null
  bankAccounts: IBankAccount[]
  bankAccount: BankResponse | null
  transactions: Transaction[]
  currency: string
}

export const initialState: businessState = {
  loading: false,
  error: null,
  business: null,
  bankAccounts: [],
  bankAccount: null,
  transactions: [],
  currency: '',
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
    setBankAccount(state, action: PayloadAction<BankResponse>) {
      state.bankAccount = action.payload
    },
    setCurrency(state, action: PayloadAction<string>) {
      state.currency = action.payload
    },
    setTransactions(state, action: PayloadAction<Transaction[]>) {
      state.transactions = action.payload
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
  setCurrency,
  setBankAccount,
  setTransactions,
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
        store.vendor.vendor!.business!.id
      )
      dispatch(setBankAccounts(bankAccounts))
      dispatch(businessComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(businessFailure(error))
      dispatch(setErrorMsg(error))
    }
  }

export const getTransactionsForBankAccount =
  (id: string, navigate: NavigateFunction): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(businessStart())
      let { bank_account, transactions, currency } =
        await REQUESTS.getTransactionsForBankAccount(id)
      dispatch(setBankAccount(bank_account))
      dispatch(setTransactions(transactions))
      dispatch(setCurrency(currency))
      navigate(viewVirtualAccountTransactions(id))

      dispatch(businessComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(businessFailure(error))
      dispatch(setErrorMsg(error))
    }
  }
