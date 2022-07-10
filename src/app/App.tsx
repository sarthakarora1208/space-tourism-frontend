import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Provider as AlertProvider } from 'react-alert'
import theme from './theme'
import { AlertTemplate } from '../components/Alert/AlertTemplate'
import * as ROUTES from '../constants/routes'
import { Amplify } from 'aws-amplify'

import store from './store'
import DashboardMenu from '../components/Dashboard/DashboardMenu'
import { Alerts } from '../components/Alert/Alert'
import Register from '../features/Auth/Register/Register'
import VendorRegister from '../features/Auth/VendorRegister/VendorRegister'
import Login from '../features/Auth/Login/Login'
import ForgotPassword from '../features/Auth/ForgotPassword/ForgotPassword'
import awsConfig from '../aws-exports'
import VendorRoute from '../components/Routes/VendorRoute'
import VendorDashboard from '../features/Vendor/VendorDashboard/VendorDashboard'
import VendorServices from '../features/Vendor/VendorServices/VendorServices'
import AddOrEditSpaceService from '../features/Vendor/AddOrEditSpaceService/AddOrEditSpaceService'
import EditSpaceService from '../features/Vendor/AddOrEditSpaceService/EditSpaceService'
import EditVendorProfile from '../features/Vendor/EditVendorProfile/EditVendorProfile'
import VendorProfile from '../features/Vendor/VendorProfile/VendorProfile'
import VendorOrders from '../features/Vendor/VendorOrders/VendorOrders'
import CustomerRoute from '../components/Routes/CustomerRoute'
import CustomerDashboard from '../features/Customer/CustomerDashboard/CustomerDashboard'
import CustomerOrder from '../features/Customer/CustomerOrders/CustomerOrder'
import CustomerProfile from '../features/Customer/CustomerProfile/CustomerProfile'
import EditCustomerProfile from '../features/Customer/EditCustomerProfile/EditCustomerProfile'
import CustomerServices from '../features/Customer/CustomerServices/CustomerServices'

Amplify.configure(awsConfig)

interface IAppProps {}

const App: React.FC<IAppProps> = ({}) => {
  return (
    <div>
      <Provider store={store}>
        <AlertProvider template={AlertTemplate}>
          <ThemeProvider theme={theme}>
            <Router>
              <CssBaseline />
              <DashboardMenu>
                <Alerts />
                <Routes>
                  <Route path={ROUTES.HOME} element={<>Hello</>} />
                  <Route
                    path={ROUTES.CUSTOMER_REGISTER}
                    element={<Register />}
                  />
                  <Route
                    path={ROUTES.VENDOR_REGISTER}
                    element={<VendorRegister />}
                  />
                  <Route path={ROUTES.LOGIN} element={<Login />} />
                  <Route
                    path={ROUTES.FORGOT_PASSWORD}
                    element={<ForgotPassword />}
                  />
                  <Route element={<VendorRoute />}>
                    <Route
                      path={ROUTES.VENDOR_DASHBOARD}
                      element={<VendorDashboard />}
                    />
                    <Route
                      path={ROUTES.VENDOR_SERVICES}
                      element={<VendorServices />}
                    />
                    <Route
                      path={ROUTES.ADD_SERVICE}
                      element={<AddOrEditSpaceService />}
                    />
                    <Route
                      path={ROUTES.EDIT_VENDOR_PROFILE}
                      element={<EditVendorProfile />}
                    />
                    <Route
                      path={ROUTES.VENDOR_PROFILE}
                      element={<VendorProfile />}
                    />
                    <Route
                      path={ROUTES.VENDOR_ORDERS}
                      element={<VendorOrders />}
                    />
                    <Route
                      path={ROUTES.editService()}
                      element={<EditSpaceService />}
                    />
                  </Route>
                  {/* Customer Dashboard */}
                  <Route element={<CustomerRoute />}>
                    <Route
                      path={ROUTES.CUSTOMER_DASHBOARD}
                      element={<CustomerDashboard />}
                    />
                    <Route
                      path={ROUTES.CUSTOMER_ORDERS}
                      element={<CustomerOrder />}
                    />
                    <Route
                      path={ROUTES.CUSTOMER_PROFILE}
                      element={<CustomerProfile />}
                    />
                    <Route
                      path={ROUTES.CUSTOMER_SERVICES}
                      element={<CustomerServices />}
                    />
                    <Route
                      path={ROUTES.EDIT_CUSTOMER_PROFILE}
                      element={<EditCustomerProfile />}
                    />
                  </Route>
                </Routes>
              </DashboardMenu>
            </Router>
          </ThemeProvider>
        </AlertProvider>
      </Provider>
    </div>
  )
}

export default App
