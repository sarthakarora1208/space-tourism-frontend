import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/rootReducer'
import { CUSTOMER_ORDERS } from '../../../constants/routes'
import { setLongLoading } from '../../../slices/authSlice'

interface ICustomerDashboardProps {}

const CustomerDashboard: React.FC<ICustomerDashboardProps> = (props) => {
  const dispatch = useDispatch()

  const { loading } = useSelector(
    (state: RootState) => state.vendor,
    shallowEqual
  )

  useEffect(() => {
    dispatch(setLongLoading(false))
  }, [])

  let renderedPage = <Navigate to={CUSTOMER_ORDERS} />

  return renderedPage
}

export default CustomerDashboard
