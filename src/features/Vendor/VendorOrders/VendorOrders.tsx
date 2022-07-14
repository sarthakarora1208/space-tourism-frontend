// React
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

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

import { TabPanel, TabContext, TabList } from '@mui/lab'

import { RootState } from '../../../app/rootReducer'

// Custom Components
import { PageHeading } from '../../../components/Dashboard/PageHeading'

import styles from '../../../assets/jss/pages/Vendor/VendorOrderStyles'

import {
  getCancelledOrdersForVendor,
  getCompletedOrdersForVendor,
  getInitOrdersForVendor,
  getOngoingOrdersForVendor,
  setTabIndex,
} from '../../../slices/orderSlice'

import { ORDER_STATUS } from '../../../constants/orderStatus'
import { VendorOngoingOrders } from './VendorOngoingOrders'
import { VendorCompletedOrders } from './VendorCompletedOrders'
import { VendorCancelledOrders } from './VendorCancelledOrders'
import { VendorInitOrders } from './VendorInitOrders'

const VendorOrders: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getInitOrdersForVendor())
    dispatch(getOngoingOrdersForVendor())
    dispatch(getCompletedOrdersForVendor())
    dispatch(getCancelledOrdersForVendor())
    return () => {}
  }, [])

  const { tabIndex } = useSelector(
    (state: RootState) => state.order,
    shallowEqual
  )

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    dispatch(setTabIndex(newValue))
  }

  return (
    <>
      <PageHeading
        heading='Flight Bookings'
        subHeading='View your flight bookings'
      />
      <Box sx={styles.container}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={tabIndex}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label='Orders Tab'>
                <Tab
                  label='Pending Approval'
                  value={ORDER_STATUS.INIT.toString()}
                />
                <Tab
                  label='Approved Bookings'
                  value={ORDER_STATUS.ONGOING.toString()}
                />
                <Tab
                  label='Completed Flights'
                  value={ORDER_STATUS.COMPLETED.toString()}
                />
                <Tab
                  label='Cancelled Bookings'
                  value={ORDER_STATUS.CANCELLED.toString()}
                />
              </TabList>
            </Box>
            <TabPanel value={ORDER_STATUS.INIT.toString()} sx={{ paddingX: 0 }}>
              <VendorInitOrders />
            </TabPanel>
            <TabPanel
              value={ORDER_STATUS.ONGOING.toString()}
              sx={{ paddingX: 0 }}
            >
              <VendorOngoingOrders />
            </TabPanel>
            <TabPanel
              value={ORDER_STATUS.COMPLETED.toString()}
              sx={{ paddingX: 0 }}
            >
              <VendorCompletedOrders />
            </TabPanel>
            <TabPanel
              value={ORDER_STATUS.CANCELLED.toString()}
              sx={{ paddingX: 0 }}
            >
              <VendorCancelledOrders />
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </>
  )
}

export default VendorOrders
