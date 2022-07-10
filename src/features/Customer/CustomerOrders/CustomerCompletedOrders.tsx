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
                            setIsContactDialogOpenForVendor(true)
                            setContactModalDetailsForVendor({
                              service,
                              business,
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
                      <Typography variant='body2'>${amount}</Typography>
                    </Stack>

                    <Stack
                      direction='row'
                      alignItems='center'
                      spacing={2}
                      justifyContent='space-between'
                    >
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
                    </Stack>
                  </Stack>
                </Collapse>

                {contactModalDetailsVendor !== undefined && (
                  <VendorDetailDialogMobile
                    service={contactModalDetailsVendor!.service}
                    business={contactModalDetailsVendor!.business}
                    handleClose={() => {
                      setIsContactDialogOpenForVendorMobile(false)
                    }}
                    isOpen={isContactDialogOpenForVendorMobile}
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
              <TableCell sx={tableStyles.tableCellForHead}>{VENDOR}</TableCell>
              <TableCell sx={tableStyles.tableCellForHead}>{DATE}</TableCell>
              <TableCell sx={tableStyles.tableCellForHead}>{TIMING}</TableCell>
              <TableCell sx={tableStyles.tableCellForHead}>{STATUS}</TableCell>
              <TableCell sx={tableStyles.tableCellForHead}>{PRICE}</TableCell>
              <TableCell sx={tableStyles.tableCellForHead}>{ACTION}</TableCell>
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
                        </>
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
                      <Status status={ORDER_STATUS[status]} />
                    </TableCell>
                    <TableCell sx={tableStyles.tableCellForBody}>
                      $ {amount}
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
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )
    }
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
