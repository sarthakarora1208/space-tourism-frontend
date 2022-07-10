import React, { useEffect } from 'react'
import { Box, Stack, Tabs, Tab, Button, Typography } from '@mui/material'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { PageHeading } from '../../../components/Dashboard/PageHeading'

import { RootState } from '../../../app/rootReducer'

import styles from '../../../assets/jss/pages/Customer/CustomerServiceStyles'
import { getSpaceServices } from '../../../slices/spaceServiceSlice'
import { SpaceServiceSearch } from './SpaceServiceSearch/SpaceServiceSearch'

interface TabPanelProps {
  children: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ px: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const CustomerServices = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSpaceServices())
  }, [])

  return (
    <div>
      <PageHeading
        heading='What are you looking for?'
        subHeading='Find a flight'
      />
      <SpaceServiceSearch />
    </div>
  )
}

export default CustomerServices
