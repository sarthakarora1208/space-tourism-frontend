import API from './api'
import { Business } from '../constants/models/Business'
import { BUSINESS_ROUTE } from '../constants/routes'
import { IBankAccount } from '../constants/models/IBankAccount'
import { BankResponse } from '../constants/models/BankResponse'
import { Transaction } from '../constants/models/Transaction'

export async function getBusinessById(businessId: string) {
  try {
    const res = await API.get<{ data: Business; success: boolean }>(
      `${BUSINESS_ROUTE}/${businessId}`
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}

export async function verifyIdentity(businessId: string) {
  try {
    const res = await API.post<{ data: string; success: boolean }>(
      `${BUSINESS_ROUTE}/${businessId}/verify-identity`
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}

export async function getVirtualAccounts(businessId: string) {
  try {
    const res = await API.get<{ data: IBankAccount[]; success: boolean }>(
      `${BUSINESS_ROUTE}/${businessId}/accounts`
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}

export async function getTransactionsForBankAccount(id: string) {
  try {
    const res = await API.get<{
      data: {
        bank_account: BankResponse
        transactions: Transaction[]
        currency: string
      }
      success: boolean
    }>(`${BUSINESS_ROUTE}/${id}/transactions`)
    return res.data.data
  } catch (err) {
    throw err
  }
}

export async function simulateBankTransfer(
  issued_bank_account: string,
  amount: number,
  currency: string
) {
  try {
    const res = await API.post<{ data: boolean; success: boolean }>(
      `${BUSINESS_ROUTE}/simulate-transfer`,
      {
        issued_bank_account,
        amount,
        currency,
      }
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}

export async function getSupportedCurrencies(country: string) {
  try {
    const res = await API.post<{ data: any; success: boolean }>(
      `${BUSINESS_ROUTE}/supported-currencies`,
      {
        country,
      }
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}

export async function listPayouts(eWallet: string) {
  try {
    const res = await API.post<{ data: any; success: boolean }>(
      `${BUSINESS_ROUTE}/payouts`,
      {
        eWallet,
      }
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}
