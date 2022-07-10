import { Auth } from 'aws-amplify'
import React, { useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { RootState } from '../../app/rootReducer'

import { LOGIN } from '../../constants/routes'
import { USER_ROLE } from '../../constants/userRoles'

interface IVendorRouteProps {}

const VendorRoute: React.FC<IVendorRouteProps> = ({ children }) => {
  useEffect(() => {
    ;(async () => {
      const user = await Auth.currentAuthenticatedUser({ bypassCache: false })
    })()
  }, [])

  const { isAuthenticated, role } = useSelector((state: RootState) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      role: state.auth.role,
    }
  }, shallowEqual)
  let renderedRoute
  if (isAuthenticated && role === USER_ROLE.VENDOR) {
    renderedRoute = children ? <>children</> : <Outlet />
  } else {
    renderedRoute = <Navigate to={LOGIN} />
  }
  return renderedRoute
}

export default VendorRoute
