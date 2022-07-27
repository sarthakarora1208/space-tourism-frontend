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
import {
  CUSTOMER_ORDERS,
  viewVirtualAccountTransactions,
} from '../constants/routes'

export interface businessState {
  loading: boolean
  error: string | null
  business: Business | null
  bankAccounts: IBankAccount[]
  bankAccount: BankResponse | null
  transactions: Transaction[]
  issued_bank_account: string
  amount: number
  currency: string
  currencies: string[]
  payouts: any[]
}

export const initialState: businessState = {
  loading: false,
  error: null,
  business: null,
  bankAccounts: [],
  bankAccount: null,
  transactions: [],
  currency: '',
  amount: 0,
  issued_bank_account: '',
  currencies: [],
  payouts: [],
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
    setAmount(state, action: PayloadAction<number>) {
      state.amount = action.payload
    },
    setIssuedBankAccount(state, action: PayloadAction<string>) {
      state.issued_bank_account = action.payload
    },
    setTransactions(state, action: PayloadAction<Transaction[]>) {
      state.transactions = action.payload
    },
    setCurrencies(state, action: PayloadAction<string[]>) {
      state.currencies = action.payload
    },
    setPayouts(state, action: PayloadAction<any[]>) {
      state.payouts = action.payload
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
  setAmount,
  setIssuedBankAccount,
  setCurrencies,
  setPayouts,
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
      let businessId = ''
      if (store.vendor && store.vendor.vendor && store.vendor.vendor.business) {
        businessId = store.vendor.vendor!.business!.id
      } else {
        businessId = store.spaceService.spaceService?.business?.id!
      }

      const bankAccounts = await REQUESTS.getVirtualAccounts(businessId)
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

export const simulateBankTransfer =
  (navigate: NavigateFunction): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(businessStart())
      const store = getState()

      let country = store.order.country

      let amount = store.spaceService.spaceService!.rates.find(
        (rate) => rate.country === country
      )!.amount

      dispatch(setAmount(amount))

      let bankAccount = store.business.bankAccounts.filter((bankAccount) => {
        return bankAccount.country_iso === country
      })[0]

      let issued_bank_account = bankAccount.issuing_id

      dispatch(setIssuedBankAccount(issued_bank_account))

      let currency = bankAccount.currency
      dispatch(setCurrency(currency))

      await REQUESTS.simulateBankTransfer(issued_bank_account, amount, currency)
      navigate(CUSTOMER_ORDERS)
      dispatch(businessComplete())
    } catch (err: any) {
      console.log(err)
      const { error } = err.response.data
      dispatch(businessFailure(error))
      dispatch(setErrorMsg(error))
    }
  }

export const getSupportedCurrencies =
  (): AppThunk => async (dispatch, getState) => {
    try {
      dispatch(businessStart())
      const store = getState()
      let country = store.vendor.vendor!.country
      let data = await REQUESTS.getSupportedCurrencies(country)
      dispatch(setCurrencies(data))
      dispatch(businessComplete())
    } catch (err: any) {
      const { error } = err.response.data
      dispatch(businessFailure(error))
      dispatch(setErrorMsg(error))
    }
  }

export const listPayouts = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(businessStart())
    const store = getState()
    let eWallet = store.vendor.vendor!.business!.eWallet
    let data = await REQUESTS.listPayouts(eWallet)
    dispatch(setPayouts(data))

    dispatch(businessComplete())
  } catch (err: any) {
    const { error } = err.response.data
    dispatch(businessFailure(error))
    dispatch(setErrorMsg(error))
  }
}
