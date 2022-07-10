// React
import React, { useState } from 'react'
import { useAlert } from 'react-alert'

// Material UI Components
import {
  TableBody as MuiTableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
  Box,
  Stack,
  IconButton,
  TableContainer,
  TableHead,
  Table,
  TableBody,
  Paper,
  Avatar,
  Link,
} from '@mui/material'

import { format, getHours } from 'date-fns'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

// React icons
import { FcCancel, FcCheckmark } from 'react-icons/fc'
import InfoIcon from '@mui/icons-material/Info'
import { IoMail, IoSend } from 'react-icons/io5'
import { BsFillHouseFill, BsPersonCircle } from 'react-icons/bs'
import { IoMdCall } from 'react-icons/io'

// Styles
import tableStyles from '../../assets/jss/components/TableStyles/tableStyles'

// Components
import Status from './Status'
import Dialog from '../Dialog/Dialog'
import { StyledTableRow } from '../StyledTableRow'

import { CancellationDialog } from './CancelForm/CancellationDialog'
import { CompleteDialog } from './CompleteDialog'
import { AddReviewDialog } from './AddReviewForm/AddReviewDialog'
import { ReplyReviewDialog } from './ReplyReviewForm/ReplyReviewDialog'
import { CustomerDetailDialog } from './CustomerDetailDialog'

import { ORDER_STATUS } from '../../constants/orderStatus'
import { Order } from '../../constants/models/Order'
import { User } from '../../constants/models/User'
import { setOrder, completeOrder, cancelOrder } from '../../slices/orderSlice'
import { RootState } from '../../app/rootReducer'

import { Business } from '../../constants/models/Business'
import { VendorDetailDialog } from './VendorDetailDialog'
import { SpaceService } from '../../constants/models/SpaceService'

interface ITableBodyComponentProps {
  orders: Order[]
  tableFor: string
}

const OrderTableBody: React.FC<ITableBodyComponentProps> = ({
  orders,
  tableFor,
}) => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const [isContactDialogOpenForCustomer, setIsContactDialogOpenForCustomer] =
    useState(false)

  const [isContactDialogOpenForVendor, setIsContactDialogOpenForVendor] =
    useState(false)
  const [isAddReviewDialogOpen, setIsAddReviewDialogOpen] = useState(false)
  const [isReplyReviewDialogOpen, setIsReplyReviewDialogOpen] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false)

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

  return (
    <>
      <MuiTableBody>
        {orders.map((order) => {
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
                <Typography variant='body2'>{serviceName}</Typography>
              </TableCell>
              <TableCell sx={tableStyles.tableCellForBody}>
                <Typography variant='body2'>
                  {tableFor === 'VENDOR' ? (
                    <>
                      {user?.name}
                      {status === ORDER_STATUS.ONGOING && (
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
                      )}
                    </>
                  ) : (
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
                  )}
                </Typography>
              </TableCell>

              <TableCell sx={tableStyles.tableCellForBody}>
                <Typography variant='body2'>
                  {format(new Date(createdAt), 'dd MMM yyyy')}
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
              {status !== ORDER_STATUS.ONGOING ? (
                <TableCell sx={tableStyles.tableCellForBody}>
                  <Button
                    onClick={() => {
                      dispatch(setOrder(order))
                      if (tableFor === 'VENDOR')
                        return setIsReplyReviewDialogOpen(true)
                      return setIsAddReviewDialogOpen(true)
                    }}
                    color='success'
                    size='small'
                  >
                    Review
                  </Button>
                </TableCell>
              ) : (
                <TableCell sx={tableStyles.tableCellForBody}>
                  <Box display='flex' justifyContent='center' gap='0rem'>
                    <IconButton
                      disabled={
                        getHours(new Date(startTime)) - getHours(new Date()) ===
                        1
                      }
                      sx={tableFor === 'VENDOR' ? { display: 'none' } : {}}
                      onClick={() => {
                        dispatch(setOrder(order))
                        setIsCompleteModalOpen(true)
                      }}
                    >
                      <FcCheckmark />
                    </IconButton>
                    <IconButton
                      disabled={
                        getHours(new Date(startTime)) - getHours(new Date()) ===
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
              )}
            </StyledTableRow>
          )
        })}
      </MuiTableBody>

      {contactModalDetailsCustomer !== undefined && (
        <CustomerDetailDialog
          user={contactModalDetailsCustomer!.user}
          handleClose={() => {
            setIsContactDialogOpenForCustomer(false)
          }}
          isOpen={isContactDialogOpenForCustomer}
        />
      )}

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
    </>
  )
}

export default OrderTableBody
