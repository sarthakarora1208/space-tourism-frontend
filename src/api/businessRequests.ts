import API from './api'
import { Business } from '../constants/models/Business'
import { BUSINESS_ROUTE } from '../constants/routes'

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
