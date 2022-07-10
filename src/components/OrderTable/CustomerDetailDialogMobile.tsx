import React from 'react'
import { IoSend } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import Dialog from '../Dialog/Dialog'
import { User } from '../../constants/models/User'

interface ICustomerProps {
  user: User
  handleClose: any
  isOpen: boolean
}

export const CustomerDetailDialogMobile: React.FC<ICustomerProps> = ({
  user,
  handleClose,
  isOpen,
}) => {
  const navigate = useNavigate()

  return (
    <Dialog
      open={isOpen}
      handleClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      title='Open customer details'
    >
      <Stack spacing={2}>
        <Stack
          spacing={2}
          direction='row'
          sx={{
            backgroundColor: '#fafafa',
            padding: '1rem',
            borderRadius: '0.5rem',
          }}
        >
          <Avatar
            alt={user.name}
            src={user?.profileImageUrl}
            sx={{ width: 48, height: 48, marginTop: '0.5rem' }}
          />
          <Box>
            <Stack direction='row' spacing={1} alignItems='center'>
              {/* <BsPersonCircle /> */}
              <Typography variant='body2'>
                <b>Name:</b> {user?.name}
              </Typography>
            </Stack>

            <Stack direction='row' spacing={1} alignItems='center'>
              {/* <IoMdCall /> */}
              <Typography variant='body2'>
                <b>Contact:</b>{' '}
                <Link href={`tel:${user?.phone}`}>{user?.phone}</Link>
              </Typography>
            </Stack>
            <Stack direction='row' spacing={1} alignItems='baseline'>
              {/* <BsFillHouseFill /> */}
              <Typography variant='body2'>
                <b>Email:</b>{' '}
                <Link href={`mailto:${user?.email}`}>{user?.email}</Link>
              </Typography>
            </Stack>

            <Stack direction='row' spacing={1} alignItems='baseline'>
              {/* <BsFillHouseFill /> */}
              <Typography variant='body2'>
                <b>Address:</b> {user?.address}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  )
}
