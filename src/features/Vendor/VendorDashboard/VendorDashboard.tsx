import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../../../app/rootReducer'
import { getSpaceServicesForBusiness } from '../../../slices/spaceServiceSlice'

interface IVendorDashboardProps {}

const VendorDashboard: React.FC<IVendorDashboardProps> = ({}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { spaceServices } = useSelector(
    (state: RootState) => state.spaceService,
    shallowEqual
  )
  const { businessId, vendor } = useSelector(
    (state: RootState) => state.vendor,
    shallowEqual
  )
  useEffect(() => {
    if (businessId) {
      dispatch(getSpaceServicesForBusiness())
    }
  }, [businessId, spaceServices.length])

  let renderedPage
  if (spaceServices.length === 0) {
  } else {
  }

  return <></>
}

export default VendorDashboard
