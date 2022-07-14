import React from 'react'
import { Box, Typography } from '@mui/material'

import { COMPLETED, ONGOING, CANCELLED } from '../../constants/orderStatus'

import tableStyles from '../../assets/jss/components/TableStyles/tableStyles'

interface IStatus {
  status: String
}
const Status: React.FC<IStatus> = (props) => {
  let { status } = props

  const BG =
    status === CANCELLED
      ? '#F9E7E5'
      : status === COMPLETED
      ? '#FDF5E7'
      : status === ONGOING
      ? '#EBF4F3'
      : '#E9EAE9'

  const COLOR =
    status === CANCELLED
      ? '#D11F14'
      : status === COMPLETED
      ? '#DD8620'
      : status === ONGOING
      ? '#38A9A5'
      : '#A5A9AD'
  if (status === ONGOING) {
    status = 'Confirmed'
  }
  return (
    <Box sx={tableStyles.status} bgcolor={BG} color={COLOR}>
      <Typography fontWeight='500' variant='body2'>
        {status}
      </Typography>
    </Box>
  )
}
export default Status
