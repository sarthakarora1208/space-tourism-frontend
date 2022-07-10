import React from 'react'
import { IoSend } from 'react-icons/io5'
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
import { useNavigate } from 'react-router-dom'

import Dialog from '../Dialog/Dialog'
import { Business } from '../../constants/models/Business'
import { SpaceService } from '../../constants/models/SpaceService'

interface IVendorProps {
  service: SpaceService
  business: Business
  handleClose: any
  isOpen: boolean
}

export const VendorDetailDialogMobile: React.FC<IVendorProps> = ({
  service,
  business,
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
            backgroundColor: '#ffffff',
            padding: '1rem',
            borderRadius: '0.5rem',
          }}
        >
          <Avatar
            alt={service?.name}
            src={service?.imageUrl}
            sx={{ width: 48, height: 48, marginTop: '0.5rem' }}
          />
          <Box>
            <Stack direction='row' spacing={1} alignItems='center'>
              {/* <BsPersonCircle /> */}
              <Typography variant='body2'>
                <b>Name:</b> {service?.name}
              </Typography>
            </Stack>

            <Stack direction='row' spacing={1} alignItems='center'>
              {/* <IoMdCall /> */}
              <Typography variant='body2'>
                <b>Contact:</b>No contact information
                {/* <Link href={`tel:${user?.phone}`}>{user?.phone}</Link> */}
              </Typography>
            </Stack>
            <Stack direction='row' spacing={1} alignItems='baseline'>
              {/* <BsFillHouseFill /> */}
              <Typography variant='body2'>
                <b>Email:</b>No email information
                {/* <Link href={`mailto:${user?.email}`}>{user?.email}</Link> */}
              </Typography>
            </Stack>

            <Stack direction='row' spacing={1} alignItems='baseline'>
              {/* <BsFillHouseFill /> */}
              <Typography variant='body2'>
                <b>Address:</b> {business?.address}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  )
}
