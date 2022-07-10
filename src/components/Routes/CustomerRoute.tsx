import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Navigate, Route, Outlet } from 'react-router-dom'
import { RootState } from '../../app/rootReducer'

import { LOGIN } from '../../constants/routes'
import { USER_ROLE } from '../../constants/userRoles'

interface ICustomerRouteProps {}

const CustomerRoute: React.FC<ICustomerRouteProps> = ({ children }) => {
  const { isAuthenticated, role } = useSelector((state: RootState) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      role: state.auth.role,
    }
  }, shallowEqual)
  let renderedRoute
  if (isAuthenticated && role === USER_ROLE.CUSTOMER) {
    renderedRoute = children ? <>children</> : <Outlet />
  } else {
    renderedRoute = <Navigate to={LOGIN} />
  }
  return renderedRoute
}

export default CustomerRoute
