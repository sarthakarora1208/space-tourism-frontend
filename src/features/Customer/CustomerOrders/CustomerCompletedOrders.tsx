import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Card,
  Collapse,
  IconButton,
  Stack,
  Typography,
  Button,
  useMediaQuery,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  CardHeader,
} from '@mui/material'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Info as InfoIcon,
} from '@mui/icons-material'
import { format, getHours } from 'date-fns'

import { RootState } from '../../../app/rootReducer'
import theme from '../../../app/theme'
import collapsibleStyles from '../../../assets/jss/components/TableStyles/collapsibleStyles'
import { ORDER_STATUS } from '../../../constants/orderStatus'
import Status from '../../../components/OrderTable/Status'
import tableStyles from '../../../assets/jss/components/TableStyles/tableStyles'
import { setOrder } from '../../../slices/orderSlice'
import { IContactModelForVendor } from './CustomerOngoingOrders'
import { VendorDetailDialogMobile } from '../../../components/OrderTable/VendorDetailDialogMobile'
import {
  ACTION,
  DATE,
  PRICE,
  SERVICE_NAME,
  STATUS,
  TIMING,
  VENDOR,
} from '../../../constants/table'
import { StyledTableRow } from '../../../components/StyledTableRow'
import { AddReviewDialog } from '../../../components/OrderTable/AddReviewForm/AddReviewDialog'
import { VendorDetailDialog } from '../../../components/OrderTable/VendorDetailDialog'

interface ICustomerCompletedOrdersProps {}

export const CustomerCompletedOrders: React.FC<
  ICustomerCompletedOrdersProps
> = () => {
  const { completedOrders, loading } = useSelector(
    (state: RootState) => state.order,
    shallowEqual
  )
  const dispatch = useDispatch()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const [isContactDialogOpenForVendor, setIsContactDialogOpenForVendor] =
    useState(false)

  const [
    isContactDialogOpenForVendorMobile,
    setIsContactDialogOpenForVendorMobile,
  ] = useState(false)

  const [contactModalDetailsVendor, setContactModalDetailsForVendor] =
    useState<IContactModelForVendor>()

  const [open, setOpen] = useState(false)

  const [isAddReviewDialogOpen, setIsAddReviewDialogOpen] = useState(false)

  useEffect(() => {}, [completedOrders.length])

  let renderedOrders
  if (completedOrders.length > 0) {
    renderedOrders = (
      <TableContainer>
        <Table stickyHeader aria-label='simple table'>
          <TableHead sx={tableStyles.tableHead}>
            <TableCell sx={tableStyles.tableCellForHead}>Flight name</TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>
              Space Vendor
            </TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>
              Take Off time
            </TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>
              Landing time
            </TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>Amount paid</TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>Action</TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>Status</TableCell>
          </TableHead>
          <TableBody>
            {completedOrders.map((order) => {
              const {
                id,
                createdAt,
                currency,
                serviceName,
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
                    {!order.review ? (
                      <Button
                        onClick={() => {
                          dispatch(setOrder(order))
                          setIsAddReviewDialogOpen(true)
                        }}
                        color='success'
                        size='small'
                      >
                        Review
                      </Button>
                    ) : (
                      <Button color='success' size='small' disabled>
                        Reviewed
                      </Button>
                    )}
                  </TableCell>
                  <TableCell sx={tableStyles.tableCellForBody}>
                    <Status status={ORDER_STATUS[status]} />
                  </TableCell>
                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  } else if (completedOrders.length === 0) {
    renderedOrders = (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='body1' fontWeight='500'>
          No Completed Orders
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
          No Completed Orders
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
          showMessage={false}
        />
      )}

      <AddReviewDialog
        isOpen={isAddReviewDialogOpen}
        handleConfirm={() => {
          setIsAddReviewDialogOpen(false)
        }}
        handleClose={() => setIsAddReviewDialogOpen(false)}
      />
    </div>
  )
}
