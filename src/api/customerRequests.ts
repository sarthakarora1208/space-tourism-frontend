import API from './api'
import { User } from '../constants/models/User'
import { CUSTOMER_ROUTE } from '../constants/routes'
import { GENDER } from '../constants/gender'

export async function createCustomer(
  id: string,
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
  country: string
) {
  try {
    const res = await API.post<{ data: User; success: boolean }>(
      `${CUSTOMER_ROUTE}`,
      {
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
        country,
      }
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}

export async function getCustomerById(customerId: string) {
  try {
    const res = await API.get<{ data: User; success: boolean }>(
      `${CUSTOMER_ROUTE}/${customerId}`
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}

export async function updateCustomer(
  id: string,
  name: string,
  phone: string,
  gender: GENDER,
  address: string,
  state: string,
  city: string,
  profileImageUrl: string,
  postalCode: string,
  dob: Date
) {
  try {
    const res = await API.put<{ data: User; success: boolean }>(
      `${CUSTOMER_ROUTE}/${id}`,
      {
        id,
        name,
        phone,
        gender,
        profileImageUrl,
        address,
        state,
        city,
        postalCode,
        dob,
      }
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}
