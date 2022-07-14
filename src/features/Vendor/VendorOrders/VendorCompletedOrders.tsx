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

import Status from '../../../components/OrderTable/Status'
import { ReplyReviewDialog } from '../../../components/OrderTable/ReplyReviewForm/ReplyReviewDialog'
import collapsibleStyles from '../../../assets/jss/components/TableStyles/collapsibleStyles'
import { getOrderById, setOrder } from '../../../slices/orderSlice'
import { CustomerDetailDialogMobile } from '../../../components/OrderTable/CustomerDetailDialogMobile'
import { User } from '../../../constants/models/User'
import { CustomerDetailDialog } from '../../../components/OrderTable/CustomerDetailDialog'

interface IVendorCompletedOrdersProps {}

interface IContactModelForCustomer {
  user: User
}

export const VendorCompletedOrders: React.FC<
  IVendorCompletedOrdersProps
> = () => {
  const { completedOrders, loading } = useSelector(
    (state: RootState) => state.order,
    shallowEqual
  )
  const dispatch = useDispatch()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  useEffect(() => {}, [completedOrders.length])

  const [isReplyReviewDialogOpen, setIsReplyReviewDialogOpen] = useState(false)
  const [contactModalDetailsCustomer, setContactModalDetailsForCustomer] =
    useState<IContactModelForCustomer>()

  const [isContactDialogOpenForCustomer, setIsContactDialogOpenForCustomer] =
    useState(false)
  const [
    isContactDialogOpenForCustomerMobile,
    setIsContactDialogOpenForCustomerMobile,
  ] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)

  const [open, setOpen] = useState(false)

  let renderedOrders
  if (completedOrders.length > 0) {
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
            <TableCell sx={tableStyles.tableCellForHead}>Action</TableCell>
            <TableCell sx={tableStyles.tableCellForHead}>Status</TableCell>
          </TableHead>
          <TableBody>
            {completedOrders.map((order) => {
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
                    {order.review ? (
                      <Button
                        onClick={() => {
                          dispatch(getOrderById(order.id))
                          setIsReplyReviewDialogOpen(true)
                        }}
                        color='success'
                        size='small'
                      >
                        Add Reply
                      </Button>
                    ) : (
                      <div>No Review yet!</div>
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
  } else if (completedOrders.length === 0 && !loading) {
    renderedOrders = (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='body1' fontWeight='500'>
          No completed orders
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
          No completed orders
        </Typography>
      </Box>
    )
  }

  return (
    <div>
      {renderedOrders}
      <ReplyReviewDialog
        isOpen={isReplyReviewDialogOpen}
        handleConfirm={() => {
          setIsReplyReviewDialogOpen(false)
        }}
        handleClose={() => setIsReplyReviewDialogOpen(false)}
      />
      {contactModalDetailsCustomer !== undefined && (
        <CustomerDetailDialog
          user={contactModalDetailsCustomer!.user}
          handleClose={() => {
            setIsContactDialogOpenForCustomer(false)
          }}
          isOpen={isContactDialogOpenForCustomer}
        />
      )}
      <ReplyReviewDialog
        isOpen={isReplyReviewDialogOpen}
        handleConfirm={() => {
          setIsReplyReviewDialogOpen(false)
        }}
        handleClose={() => setIsReplyReviewDialogOpen(false)}
      />
    </div>
  )
}
