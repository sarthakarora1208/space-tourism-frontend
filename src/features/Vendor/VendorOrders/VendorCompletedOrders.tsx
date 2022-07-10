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
    if (!matches) {
      renderedOrders = (
        <Stack spacing={2}>
          {completedOrders.map((order) => {
            const {
              id,
              createdAt,
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
              <Card sx={collapsibleStyles.root}>
                <Stack spacing={1}>
                  <Stack
                    direction='row'
                    alignItems='start'
                    mb={1}
                    justifyContent='space-between'
                  >
                    <Stack direction='row' alignItems='start' spacing={1.5}>
                      <Avatar
                        alt={service.name}
                        src={service.imageUrl}
                        sx={{ width: 32, height: 32 }}
                      />
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem',
                        }}
                      >
                        <Typography variant='body1' fontWeight='500'>
                          {serviceName}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction='row' alignItems='center' spacing={1}>
                      <IconButton
                        sx={{ padding: '0' }}
                        onClick={() => setOpen(!open)}
                      >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                      </IconButton>
                    </Stack>
                  </Stack>

                  <Stack
                    direction='row'
                    alignItems='center'
                    spacing={2}
                    justifyContent='space-between'
                  >
                    <Typography variant='body2' fontWeight='500'>
                      Status
                    </Typography>
                    <Status status={ORDER_STATUS[status]} />
                  </Stack>
                  <Stack
                    direction='row'
                    alignItems='center'
                    spacing={2}
                    justifyContent='space-between'
                  >
                    <Typography variant='body2' fontWeight='500'>
                      Date
                    </Typography>
                    <Typography variant='body2'>{`${format(
                      new Date(endTime),
                      'dd MMM yyyy'
                    )}`}</Typography>
                  </Stack>
                  <Stack
                    direction='row'
                    alignItems='center'
                    spacing={2}
                    justifyContent='space-between'
                  >
                    <Typography variant='body2' fontWeight='500'>
                      Time
                    </Typography>
                    <Typography variant='body2'>{`${format(
                      new Date(startTime),
                      'KK:mm a'
                    )} - ${format(new Date(endTime), 'KK:mm a')}`}</Typography>
                  </Stack>
                </Stack>
                <Collapse in={open} timeout='auto' unmountOnExit>
                  <Stack spacing={1} mt={2}>
                    <Stack
                      direction='row'
                      alignItems='center'
                      spacing={2}
                      justifyContent='space-between'
                    >
                      <Typography variant='body2' fontWeight='500'>
                        Customer Info
                      </Typography>
                      <Stack direction='row' spacing={1}>
                        <Button
                          onClick={() => {
                            setIsContactDialogOpenForCustomer(true)
                            setContactModalDetailsForCustomer({
                              user,
                            })
                          }}
                          size='small'
                          variant='text'
                          sx={tableStyles.infoIcon}
                          endIcon={<InfoIcon />}
                        >
                          <Typography variant='body2'>{user?.name}</Typography>
                        </Button>
                      </Stack>
                    </Stack>

                    <Stack
                      direction='row'
                      alignItems='center'
                      spacing={2}
                      justifyContent='space-between'
                    >
                      <Typography variant='body2' fontWeight='500'>
                        Price
                      </Typography>
                      <Typography variant='body2'>
                        ${(0.807 * amount).toFixed(2)}
                      </Typography>
                    </Stack>
                    <Stack
                      direction='row'
                      alignItems='center'
                      spacing={2}
                      justifyContent='space-between'
                    >
                      <Typography variant='body2' fontWeight='500'>
                        Completion Date
                      </Typography>
                      {format(
                        new Date(order.updatedAt),
                        `hh:mm a - eeee, dd MMM yyyy`
                      )}
                    </Stack>
                  </Stack>
                </Collapse>
                {contactModalDetailsCustomer !== undefined && (
                  <CustomerDetailDialogMobile
                    user={contactModalDetailsCustomer!.user}
                    handleClose={() => {
                      setIsContactDialogOpenForCustomer(false)
                    }}
                    isOpen={isContactDialogOpenForCustomer}
                  />
                )}
              </Card>
            )
          })}
        </Stack>
      )
    } else {
      renderedOrders = (
        <TableContainer>
          <Table stickyHeader aria-label='simple table'>
            <TableHead sx={tableStyles.tableHead}>
              <TableCell sx={tableStyles.tableCellForHead}>
                {SERVICE_NAME}
              </TableCell>
              <TableCell sx={tableStyles.tableCellForHead}>
                {CUSTOMER}
              </TableCell>
              <TableCell sx={tableStyles.tableCellForHead}>{DATE}</TableCell>
              <TableCell sx={tableStyles.tableCellForHead}>{TIMING}</TableCell>
              <TableCell sx={tableStyles.tableCellForHead}>{PRICE}</TableCell>
              <TableCell sx={tableStyles.tableCellForHead}>
                Completion Date
              </TableCell>
              <TableCell sx={tableStyles.tableCellForHead}>{STATUS}</TableCell>
              <TableCell sx={tableStyles.tableCellForHead}>ACTION</TableCell>
            </TableHead>
            <TableBody>
              {completedOrders.map((order) => {
                const {
                  id,
                  createdAt,
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
                      <Typography variant='body2'>
                        <CardHeader
                          avatar={
                            <Avatar alt={service.name} src={service.imageUrl} />
                          }
                          title={service.name}
                        />
                      </Typography>
                    </TableCell>
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
                          <InfoIcon
                            sx={tableStyles.infoIcon}
                            fontSize='small'
                          />
                        </IconButton>
                      </Typography>
                    </TableCell>
                    <TableCell sx={tableStyles.tableCellForBody}>
                      <Typography variant='body2'>
                        {format(new Date(endTime), 'eeee, dd MMM yyyy')}
                      </Typography>
                    </TableCell>
                    <TableCell sx={tableStyles.tableCellForBody}>
                      <Typography variant='body2'>
                        {format(new Date(startTime), 'kk:mm')} -{' '}
                        {format(new Date(endTime), 'kk:mm')}
                      </Typography>
                    </TableCell>

                    <TableCell sx={tableStyles.tableCellForBody}>
                      $ {(0.807 * amount).toFixed(2)}
                    </TableCell>
                    <TableCell sx={tableStyles.tableCellForBody}>
                      {format(
                        new Date(order.updatedAt),
                        `hh:mm a - eeee, dd MMM yyyy`
                      )}
                    </TableCell>
                    <TableCell sx={tableStyles.tableCellForBody}>
                      <Status status={ORDER_STATUS[status]} />
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
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )
    }
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
