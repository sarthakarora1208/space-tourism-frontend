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
                      path={ROUTES.editService()}
                      element={<EditSpaceService />}
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
