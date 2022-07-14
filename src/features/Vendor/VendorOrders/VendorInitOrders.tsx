import React, { useEffect, useState } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  IconButton,
  Button,
  Stack,
  Card,
  Avatar,
  Collapse,
  CardHeader,
} from '@mui/material'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { FcCancel, FcCheckmark } from 'react-icons/fc'
import { format, getHours } from 'date-fns'
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Info as InfoIcon,
} from '@mui/icons-material'

import { RootState } from '../../../app/rootReducer'
import theme from '../../../app/theme'
import tableStyles from '../../../assets/jss/components/TableStyles/tableStyles'
import {
  ACTION,
  DATE,
  PRICE,
  SERVICE_NAME,
  STATUS,
  TIMING,
} from '../../../constants/table'
import { CUSTOMER, VENDOR } from '../../../constants/userRoles'
import { StyledTableRow } from '../../../components/StyledTableRow'
import { ORDER_STATUS } from '../../../constants/orderStatus'

import { Business } from '../../../constants/models/Business'

import Status from '../../../components/OrderTable/Status'

import {
  completeOrder,
  markOrderAsOngoing,
  setOrder,
} from '../../../slices/orderSlice'
import collapsibleStyles from '../../../assets/jss/components/TableStyles/collapsibleStyles'
import { VendorDetailDialogMobile } from '../../../components/OrderTable/VendorDetailDialogMobile'
import { User } from '../../../constants/models/User'

import { CustomerDetailDialogMobile } from '../../../components/OrderTable/CustomerDetailDialogMobile'
import { CancellationDialog } from '../../../components/OrderTable/CancelForm/CancellationDialog'
import { CustomerDetailDialog } from '../../../components/OrderTable/CustomerDetailDialog'
import { MarkOrderAsOngoingDialog } from '../../../components/MarkOrderAsOngoingDialog'

interface IVendorInitOrdersProps {}

interface IContactModelForCustomer {
  user: User
}

export const VendorInitOrders: React.FC<IVendorInitOrdersProps> = () => {
  const { initOrders, loading } = useSelector(
    (state: RootState) => state.order,
    shallowEqual
  )
  const dispatch = useDispatch()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {}, [initOrders.length])

  const [contactModalDetailsCustomer, setContactModalDetailsForCustomer] =
    useState<IContactModelForCustomer>()

  const [isContactDialogOpenForCustomer, setIsContactDialogOpenForCustomer] =
    useState(false)
  const [
    isContactDialogOpenForCustomerMobile,
    setIsContactDialogOpenForCustomerMobile,
  ] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)

  const [isOngoingModalOpen, setIsOngoingModalOpen] = useState(false)

  const [open, setOpen] = useState(false)

  let renderedOrders

  if (initOrders.length > 0) {
    renderedOrders = (
      <TableContainer>
        <Table stickyHeader aria-label='simple table'>
          <TableHead sx={tableStyles.tableHead}>
            <TableCell sx={tableStyles.tableCellForHead}>
              Customer Name
            </TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>Flight name</TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>
              Time of booking
            </TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>Amount</TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>Status</TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>Action</TableCell>
          </TableHead>
          <TableBody>
            {initOrders.map((order) => {
              const {
                id,
                createdAt,
                serviceName,
                currency,
                startTime,
                endTime,
                amount,
                status,
                user,
                business,
                spaceService,
              } = order
              const service = spaceService
              return (
                <StyledTableRow key={id}>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    <Typography variant='body2'>
                      {user?.name}
                      <IconButton
                        size='small'
                        onClick={() => {
                          setIsContactDialogOpenForCustomer(true)
                          setContactModalDetailsForCustomer({
                            user,
                          })
                        }}
                      >
                        <InfoIcon sx={tableStyles.infoIcon} fontSize='small' />
                      </IconButton>
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    <Typography variant='body2'>{service.name}</Typography>
                  </TableCell>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    <Typography variant='body2'>
                      {format(new Date(createdAt), 'hh:mm a, dd MMMM yyyy ')}
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    {amount} {currency}
                  </TableCell>

                  <TableCell sx={tableStyles.tableCellForBody}>
                    <Box display='flex' justifyContent='center' gap='0rem'>
                      <IconButton
                        onClick={() => {
                          dispatch(setOrder(order))
                          setIsOngoingModalOpen(true)
                        }}
                      >
                        <FcCheckmark />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          dispatch(setOrder(order))
                          setIsCancelModalOpen(true)
                        }}
                      >
                        <FcCancel />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    <Status status={'Pending Approval'} />
                  </TableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  } else if (initOrders.length === 0) {
    renderedOrders = (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='body1' fontWeight='500'>
          No bookings yet
        </Typography>
      </Box>
    )
  } else if (loading) {
    renderedOrders = (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='body1' fontWeight='500'>
          Loading...
        </Typography>
      </Box>
    )
  } else {
    renderedOrders = (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='body1' fontWeight='500'>
          No orders
        </Typography>
      </Box>
    )
  }
  return (
    <div>
      {renderedOrders}
      {contactModalDetailsCustomer !== undefined && (
        <CustomerDetailDialog
          user={contactModalDetailsCustomer!.user}
          handleClose={() => {
            setIsContactDialogOpenForCustomer(false)
          }}
          isOpen={isContactDialogOpenForCustomer}
        />
      )}
      <MarkOrderAsOngoingDialog
        isOpen={isOngoingModalOpen}
        handleConfirm={() => {
          setIsOngoingModalOpen(false)
          dispatch(markOrderAsOngoing())
        }}
        handleClose={() => {
          setIsOngoingModalOpen(false)
        }}
      />
      <CancellationDialog
        isOpen={isCancelModalOpen}
        handleConfirm={() => {
          setIsCancelModalOpen(false)
        }}
        handleClose={() => setIsCancelModalOpen(false)}
      />
    </div>
  )
}
