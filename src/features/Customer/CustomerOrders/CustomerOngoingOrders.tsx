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
    if (!matches) {
      renderedOrders = (
        <Stack spacing={2}>
          {ongoingOrders.map((order) => {
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
              <Card sx={collapsibleStyles.root} key={id}>
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
                      <>
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
                            <Typography variant='body2'>
                              {user?.name}
                            </Typography>
                          </Button>
                        </Stack>
                      </>
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
                      <Typography variant='body2' fontWeight='500'>
                        Action
                      </Typography>
                      <Box display='flex' justifyContent='center' gap='0.5rem'>
                        <IconButton
                          size='small'
                          disabled={
                            getHours(new Date(startTime)) -
                              getHours(new Date()) ===
                            1
                          }
                          onClick={() => {
                            dispatch(setOrder(order))
                            setIsCompleteModalOpen(true)
                          }}
                        >
                          <FcCheckmark fontSize={20} />
                        </IconButton>
                        <IconButton
                          disabled={
                            getHours(new Date(startTime)) -
                              getHours(new Date()) ===
                            1
                          }
                          sx={
                            new Date() > new Date(startTime)
                              ? { display: 'none' }
                              : {}
                          }
                          size='small'
                          onClick={() => {
                            dispatch(setOrder(order))
                            setIsCancelModalOpen(true)
                          }}
                        >
                          <FcCancel fontSize={20} />
                        </IconButton>
                      </Box>
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
              {ongoingOrders.map((order) => {
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
                      <Box display='flex' justifyContent='center' gap='0rem'>
                        <IconButton
                          disabled={
                            getHours(new Date(startTime)) -
                              getHours(new Date()) ===
                            1
                          }
                          onClick={() => {
                            dispatch(setOrder(order))
                            setIsCompleteModalOpen(true)
                          }}
                        >
                          <FcCheckmark />
                        </IconButton>
                        <IconButton
                          disabled={
                            getHours(new Date(startTime)) -
                              getHours(new Date()) ===
                            1
                          }
                          sx={
                            new Date() > new Date(startTime)
                              ? { display: 'none' }
                              : {}
                          }
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
    }
  } else if (ongoingOrders.length === 0 && !loading) {
    renderedOrders = (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='body1' fontWeight='500'>
          No ongoing orders
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
          No Ongoing Orders
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
