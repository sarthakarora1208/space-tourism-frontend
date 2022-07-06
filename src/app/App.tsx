import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Provider as AlertProvider } from 'react-alert'
import theme from './theme'
import { AlertTemplate } from '../components/Alert/AlertTemplate'

import store from './store'
import DashboardMenu from '../components/Dashboard/DashboardMenu'
import { Alerts } from '../components/Alert/Alert'

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
                  <Route path={'/'} element={<>Hello</>} />
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
