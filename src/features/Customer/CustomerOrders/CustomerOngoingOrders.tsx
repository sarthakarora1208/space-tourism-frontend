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
import MobileView from '../../../components/OrderTable/MobileView'
import OrderTableBody from '../../../components/OrderTable/OrderTableBody'
import OrderTableHead from '../../../components/OrderTable/OrderTableHead'
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
import { completeOrder, setOrder } from '../../../slices/orderSlice'
import { VendorDetailDialog } from '../../../components/OrderTable/VendorDetailDialog'
import { CancellationDialog } from '../../../components/OrderTable/CancelForm/CancellationDialog'
import { CompleteDialog } from '../../../components/OrderTable/CompleteDialog'
import { AddReviewDialog } from '../../../components/OrderTable/AddReviewForm/AddReviewDialog'
import collapsibleStyles from '../../../assets/jss/components/TableStyles/collapsibleStyles'
import { VendorDetailDialogMobile } from '../../../components/OrderTable/VendorDetailDialogMobile'
import { SpaceService } from '../../../constants/models/SpaceService'

interface ICustomerOngoingOrdersProps {}

export interface IContactModelForVendor {
  service: SpaceService
  business: Business
}

export const CustomerOngoingOrders: React.FC<
  ICustomerOngoingOrdersProps
> = () => {
  const { ongoingOrders, loading } = useSelector(
    (state: RootState) => state.order,
    shallowEqual
  )
  const dispatch = useDispatch()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {}, [ongoingOrders.length])
  const [isContactDialogOpenForVendor, setIsContactDialogOpenForVendor] =
    useState(false)
  const [
    isContactDialogOpenForVendorMobile,
    setIsContactDialogOpenForVendorMobile,
  ] = useState(false)
  const [contactModalDetailsVendor, setContactModalDetailsForVendor] =
    useState<IContactModelForVendor>()
  const [isAddReviewDialogOpen, setIsAddReviewDialogOpen] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false)
  const [open, setOpen] = useState(false)

  let renderedOrders
  if (ongoingOrders.length > 0) {
    renderedOrders = (
      <TableContainer>
        <Table stickyHeader aria-label='simple table'>
          <TableHead sx={tableStyles.tableHead}>
            <TableCell sx={tableStyles.tableCellForHead}>
              {'Flight Name'}
            </TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>
              {'Space Vendor'}
            </TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>
              {'Take Off time'}
            </TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>
              {'Landing time'}
            </TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>
              {'Amount paid'}
            </TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>
              Ticket Status
            </TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>Action</TableCell>
          </TableHead>
          <TableBody>
            {ongoingOrders.map((order) => {
              const {
                id,
                createdAt,
                serviceName,
                startTime,
                endTime,
                amount,
                status,
                currency,
                user,
                business,
                spaceService,
              } = order
              const service = spaceService
              return (
                <StyledTableRow key={id}>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    <CardHeader
                      avatar={
                        <Avatar alt={service.name} src={service.imageUrl} />
                      }
                      title={service.name}
                    />
                  </TableCell>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    <Typography variant='body2'>
                      <>
                        {business?.businessName}
                        {status === ORDER_STATUS.ONGOING && (
                          <IconButton
                            size='small'
                            onClick={() => {
                              setIsContactDialogOpenForVendor(true)
                              setContactModalDetailsForVendor({
                                service,
                                business,
                              })
                            }}
                          >
                            <InfoIcon
                              sx={tableStyles.infoIcon}
                              fontSize='small'
                            />
                          </IconButton>
                        )}
                      </>
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    <Typography variant='body2'>
                      {format(new Date(startTime), 'hh:mm a, dd MMM yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    <Typography variant='body2'>
                      {format(new Date(endTime), 'hh:mm a, dd MMM yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    {amount} {currency}
                  </TableCell>

                  <TableCell sx={tableStyles.tableCellForBody}>
                    <Status status={ORDER_STATUS[status]} />
                  </TableCell>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    <Box display='flex' justifyContent='center' gap='0rem'>
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
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  } else if (ongoingOrders.length === 0 && !loading) {
    renderedOrders = (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='body1' fontWeight='500'>
          No bookings found
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
          No bookings yet
        </Typography>
      </Box>
    )
  }

  return (
    <div>
      {renderedOrders}
      {contactModalDetailsVendor !== undefined && (
        <VendorDetailDialog
          service={contactModalDetailsVendor!.service}
          business={contactModalDetailsVendor!.business}
          handleClose={() => {
            setIsContactDialogOpenForVendor(false)
          }}
          isOpen={isContactDialogOpenForVendor}
        />
      )}

      <CancellationDialog
        isOpen={isCancelModalOpen}
        handleConfirm={() => {
          setIsCancelModalOpen(false)
        }}
        handleClose={() => setIsCancelModalOpen(false)}
      />
      <CompleteDialog
        isOpen={isCompleteModalOpen}
        handleConfirm={() => {
          dispatch(completeOrder())
          setIsCompleteModalOpen(false)
        }}
        handleClose={() => setIsCompleteModalOpen(false)}
      />
    </div>
  )
}
