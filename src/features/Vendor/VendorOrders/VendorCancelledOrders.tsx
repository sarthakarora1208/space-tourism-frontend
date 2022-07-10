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
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Info as InfoIcon,
} from '@mui/icons-material'
import { format, getHours } from 'date-fns'
import theme from '../../../app/theme'
import { RootState } from '../../../app/rootReducer'
import collapsibleStyles from '../../../assets/jss/components/TableStyles/collapsibleStyles'
import Status from '../../../components/OrderTable/Status'
import { ORDER_STATUS } from '../../../constants/orderStatus'
import tableStyles from '../../../assets/jss/components/TableStyles/tableStyles'
import { setOrder } from '../../../slices/orderSlice'
import { VendorDetailDialogMobile } from '../../../components/OrderTable/VendorDetailDialogMobile'
import {
  DATE,
  PRICE,
  SERVICE_NAME,
  STATUS,
  TIMING,
  VENDOR,
} from '../../../constants/table'
import { StyledTableRow } from '../../../components/StyledTableRow'
//import { IContactModelForVendor } from '../../Customer/CustomerOrders/CustomerOngoingOrders'

interface IVendorCancelledOrdersProps {}

export const VendorCancelledOrders: React.FC<
  IVendorCancelledOrdersProps
> = () => {
  const { cancelledOrders, loading } = useSelector(
    (state: RootState) => state.order,
    shallowEqual
  )
  const dispatch = useDispatch()
  useEffect(() => {}, [cancelledOrders.length])

  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const [isContactDialogOpenForVendor, setIsContactDialogOpenForVendor] =
    useState(false)
  const [
    isContactDialogOpenForVendorMobile,
    setIsContactDialogOpenForVendorMobile,
  ] = useState(false)
  const [contactModalDetailsVendor, setContactModalDetailsForVendor] =
    useState<any>()
  const [open, setOpen] = useState(false)

  let renderedOrders
  if (cancelledOrders.length > 0) {
    if (!matches) {
      renderedOrders = (
        <Stack spacing={2}>
          {cancelledOrders.map((order) => {
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
                      <Typography variant='body2'>
                        ${amount.toFixed(2)}
                      </Typography>
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
              <TableCell sx={tableStyles.tableCellForHead}>{PRICE}</TableCell>
              <TableCell sx={tableStyles.tableCellForHead}>{STATUS}</TableCell>
            </TableHead>
            <TableBody>
              {cancelledOrders.map((order) => {
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
                      $ {amount.toFixed(2)}
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
    }
  } else if (cancelledOrders.length === 0) {
    renderedOrders = (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='body1' fontWeight='500'>
          No cancelled orders
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
          No cancelled orders
        </Typography>
      </Box>
    )
  }

  return <div>{renderedOrders}</div>
}
