import React, { useEffect, useState } from 'react'
// components
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

// Material UI Components
import {
  Box,
  Tab,
  TableContainer,
  Typography,
  Table,
  useTheme,
  useMediaQuery,
} from '@mui/material'

// Material UI Lab
import { TabPanel, TabContext, TabList } from '@mui/lab'

import OrderTable from '../../../components/OrderTable/OrderTable'
import styles from '../../../assets/jss/pages/Customer/CustomerOrderStyles'

// Material UI Components
import { PageHeading } from '../../../components/Dashboard/PageHeading'
import { RootState } from '../../../app/rootReducer'
import { ORDER_STATUS } from '../../../constants/orderStatus'
import {
  getCancelledOrdersForCustomer,
  getCompletedOrdersForCustomer,
  getOngoingOrdersForCustomer,
} from '../../../slices/orderSlice'
import theme from '../../../app/theme'
import { CustomerOngoingOrders } from './CustomerOngoingOrders'
import { CustomerCompletedOrders } from './CustomerCompletedOrders'
import { CustomerCancelledOrders } from './CustomerCancelledOrders'

const CustomerOrder: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCompletedOrdersForCustomer())
    dispatch(getOngoingOrdersForCustomer())
    dispatch(getCancelledOrdersForCustomer())
    return () => {}
  }, [])

  const [value, setValue] = useState('1')

  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  return (
    <>
      <PageHeading heading='Your Orders' subHeading='Details of your orders' />
      <Box sx={styles.container}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='Orders Tab'>
                <Tab label='Ongoing' value={ORDER_STATUS.ONGOING.toString()} />
                <Tab
                  label='Completed'
                  value={ORDER_STATUS.COMPLETED.toString()}
                />
                <Tab
                  label='Cancelled'
                  value={ORDER_STATUS.CANCELLED.toString()}
                />
              </TabList>
            </Box>
            <TabPanel
              value={ORDER_STATUS.ONGOING.toString()}
              sx={{ paddingX: 0 }}
            >
              <CustomerOngoingOrders />
            </TabPanel>
            <TabPanel
              value={ORDER_STATUS.COMPLETED.toString()}
              sx={{ paddingX: 0 }}
            >
              <CustomerCompletedOrders />
            </TabPanel>
            <TabPanel
              value={ORDER_STATUS.CANCELLED.toString()}
              sx={{ paddingX: 0 }}
            >
              <CustomerCancelledOrders />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </>
  )
}

export default CustomerOrder
