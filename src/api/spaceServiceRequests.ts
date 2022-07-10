import API from './api'

import { BUSINESS_ROUTE, SPACE_SERVICE_ROUTE } from '../constants/routes'
import { SpaceService } from '../constants/models/SpaceService'
import { Rate } from '../constants/models/Rate'

export async function getSpaceServices() {
  try {
    const res = await API.get<{ data: SpaceService[]; success: boolean }>(
      `${SPACE_SERVICE_ROUTE}`
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}

export async function getSpaceServiceById(id: string) {
  try {
    const res = await API.get<{ data: SpaceService; success: boolean }>(
      `${SPACE_SERVICE_ROUTE}/${id}`
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}

export async function getSpaceServicesForBusiness(businessId: string) {
  try {
    const res = await API.get<{ data: SpaceService[]; success: boolean }>(
      `${BUSINESS_ROUTE}/${businessId}${SPACE_SERVICE_ROUTE}`
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}

export async function createSpaceService(
  name: string,
  description: string,
  seats: number,
  startTime: Date,
  endTime: Date,
  imageUrl: string,
  businessId: string,
  rates: Rate[]
) {
  try {
    const res = await API.post<{ data: SpaceService; success: boolean }>(
      `${SPACE_SERVICE_ROUTE}`,
      {
        name,
        description,
        seats,
        startTime,
        endTime,
        imageUrl,
        businessId,
        rates,
      }
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}

export async function updateSpaceService(
  id: string,
  name: string,
  description: string,
  seats: number,
  startTime: Date,
  endTime: Date,
  imageUrl: string
) {
  try {
    const res = await API.put<{ data: SpaceService; success: boolean }>(
      `${SPACE_SERVICE_ROUTE}/${id}`,
      {
        name,
        description,
        seats,
        startTime,
        endTime,
        imageUrl,
      }
    )
    return res.data.data
  } catch (err) {
    throw err
  }
}

export async function changeSpaceServiceStatus(id: string, status: boolean) {
  try {
    const res = await API.put<{ success: boolean; data: SpaceService }>(
      `${SPACE_SERVICE_ROUTE}/${id}/available`,
      {
        status,
      }
    )
    return res.data.success
  } catch (err) {
    throw err
  }
}
