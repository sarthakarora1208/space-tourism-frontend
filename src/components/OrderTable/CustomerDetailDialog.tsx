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

export const CustomerDetailDialog: React.FC<ICustomerProps> = ({
  user,
  children,
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
            src={user.profileImageUrl}
            sx={{ width: 75, height: 75 }}
          />
          <Box>
            <Stack direction='row' spacing={1} alignItems='center'>
              {/* <BsPersonCircle /> */}
              <Typography>
                <b>Name:</b> {user.name}
              </Typography>
            </Stack>

            <Stack direction='row' spacing={2} alignItems='center'>
              <Stack direction='row' spacing={1} alignItems='center'>
                {/* <IoMdCall /> */}
                <Typography fontWeight='700'>Contact:</Typography>
                <Link color='info.main'>
                  <a href={`tel:${user.phone}`}>{user.phone}</a>
                </Link>
              </Stack>
            </Stack>
            <Stack direction='row' spacing={2} alignItems='center'>
              <Stack direction='row' spacing={1} alignItems='center'>
                {/* <IoMail /> */}
                <Typography fontWeight='700'>Email:</Typography>

                <Link color='info.main'>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </Link>
              </Stack>
            </Stack>

            <Stack direction='row' spacing={1} alignItems='baseline'>
              {/* <BsFillHouseFill /> */}
              <Typography>
                <b>Address:</b> {user.address}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  )
}
