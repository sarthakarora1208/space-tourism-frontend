// React
import React, { useState } from 'react'

// Material UI Components
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Typography,
} from '@mui/material'
import { format, getHours } from 'date-fns'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useAlert } from 'react-alert'
// React icons
import {
  KeyboardArrowDown,
  KeyboardArrowRight,
  Info as InfoIcon,
} from '@mui/icons-material'
import { FcCancel, FcCheckmark } from 'react-icons/fc'
import { IoSend } from 'react-icons/io5'
import { BsFillHouseFill, BsPersonCircle } from 'react-icons/bs'
import { IoMdCall } from 'react-icons/io'

// Components
import Status from './Status'
import Dialog from '../Dialog/Dialog'
import { CancellationDialog } from './CancelForm/CancellationDialog'
import { CompleteDialog } from './CompleteDialog'
import { AddReviewDialog } from './AddReviewForm/AddReviewDialog'
import { ReplyReviewDialog } from './ReplyReviewForm/ReplyReviewDialog'

import { setOrder, completeOrder, cancelOrder } from '../../slices/orderSlice'
import { RootState } from '../../app/rootReducer'

// Styles
import tableStyles from '../../assets/jss/components/TableStyles/tableStyles'
import modalStyle from '../../assets/jss/components/modalStyle'
import collapsibleStyles from '../../assets/jss/components/TableStyles/collapsibleStyles'

// Constants
import { ORDER_STATUS } from '../../constants/orderStatus'
import { Order } from '../../constants/models/Order'
import { User } from '../../constants/models/User'
import { CustomerDetailDialogMobile } from './CustomerDetailDialogMobile'

import { Business } from '../../constants/models/Business'
import { VendorDetailDialogMobile } from './VendorDetailDialogMobile'
import { SpaceService } from '../../constants/models/SpaceService'

interface ICollapsibleProps {
  order: Order
  tableFor: string
}

const CollapsibleComponent: React.FC<ICollapsibleProps> = ({
  order,
  tableFor,
}) => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const { role } = useSelector((state: RootState) => {
    return {
      role: state.auth.role,
    }
  }, shallowEqual)
  const [isContactDialogOpenForCustomer, setIsContactDialogOpenForCustomer] =
    useState(false)

  const [isContactDialogOpenForVendor, setIsContactDialogOpenForVendor] =
    useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false)
  const [isAddReviewDialogOpen, setIsAddReviewDialogOpen] = useState(false)
  const [isReplyReviewDialogOpen, setIsReplyReviewDialogOpen] = useState(false)
  // details icon
  const [open, setOpen] = useState(false)

  interface IContactModelForCustomer {
    user: User
  }

  const [contactModalDetailsCustomer, setContactModalDetailsForCustomer] =
    useState<IContactModelForCustomer>()

  interface IContactModelForVendor {
    service: SpaceService
    business: Business
  }

  const [contactModalDetailsVendor, setContactModalDetailsForVendor] =
    useState<IContactModelForVendor>()
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
  const image = 'https://source.unsplash.com/random'
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
              src={image}
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
            <IconButton sx={{ padding: '0' }} onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowRight /> : <KeyboardArrowDown />}
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
            new Date(createdAt),
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
            {status === ORDER_STATUS.ONGOING && (
              <>
                <Typography variant='body2' fontWeight='500'>
                  Customer Info
                </Typography>
                <Stack direction='row' spacing={1}>
                  {tableFor === 'VENDOR' ? (
                    <Button
                      onClick={() => {
                        setIsContactDialogOpenForCustomer(true)
                        setContactModalDetailsForCustomer({ user })
                      }}
                      size='small'
                      variant='text'
                      sx={tableStyles.infoIcon}
                      endIcon={<InfoIcon />}
                    >
                      <Typography variant='body2'>{user?.name}</Typography>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsContactDialogOpenForVendor(true)
                        setContactModalDetailsForVendor({ service, business })
                      }}
                      size='small'
                      variant='text'
                      sx={tableStyles.infoIcon}
                      endIcon={<InfoIcon />}
                    >
                      <Typography variant='body2'>{user?.name}</Typography>
                    </Button>
                  )}
                </Stack>
              </>
            )}
          </Stack>

          <Stack
            direction='row'
            alignItems='center'
            spacing={2}
            justifyContent='space-between'
          >
            <Typography variant='body2' fontWeight='500'>
              Order Type
            </Typography>
          </Stack>

          <Stack
            direction='row'
            alignItems='center'
            spacing={2}
            justifyContent='space-between'
          >
            <Typography variant='body2' fontWeight='500'>
              Service Name
            </Typography>
            <Typography variant='body2'>{serviceName}</Typography>
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
            {status !== ORDER_STATUS.ONGOING ? (
              <>
                <Typography variant='body2' fontWeight='500'>
                  Review
                </Typography>
                <Button
                  color='success'
                  size='small'
                  onClick={() => {
                    dispatch(setOrder(order))
                    if (tableFor === 'VENDOR')
                      return setIsReplyReviewDialogOpen(true)
                    return setIsAddReviewDialogOpen(true)
                  }}
                >
                  Review
                </Button>
              </>
            ) : (
              <>
                <Typography variant='body2' fontWeight='500'>
                  Action
                </Typography>
                <Box display='flex' justifyContent='center' gap='0.5rem'>
                  <IconButton
                    size='small'
                    disabled={
                      getHours(new Date(startTime)) - getHours(new Date()) === 1
                    }
                    sx={tableFor === 'VENDOR' ? { display: 'none' } : {}}
                    onClick={() => {
                      dispatch(setOrder(order))
                      setIsCompleteModalOpen(true)
                    }}
                  >
                    <FcCheckmark fontSize={20} />
                  </IconButton>
                  <IconButton
                    disabled={
                      getHours(new Date(startTime)) - getHours(new Date()) === 1
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
              </>
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

      {contactModalDetailsVendor !== undefined && (
        <VendorDetailDialogMobile
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
      <AddReviewDialog
        isOpen={isAddReviewDialogOpen}
        handleConfirm={() => {
          setIsAddReviewDialogOpen(false)
        }}
        handleClose={() => setIsAddReviewDialogOpen(false)}
      />
      <ReplyReviewDialog
        isOpen={isReplyReviewDialogOpen}
        handleConfirm={() => {
          alert.success('Added Review')
          setIsReplyReviewDialogOpen(false)
        }}
        handleClose={() => setIsReplyReviewDialogOpen(false)}
      />
    </Card>
  )
}
export default CollapsibleComponent
