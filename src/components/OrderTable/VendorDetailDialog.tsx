import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, Box, Button, Link, Stack, Typography } from '@mui/material'
import { IoSend } from 'react-icons/io5'
import { Business } from '../../constants/models/Business'
import Dialog from '../Dialog/Dialog'
import { SpaceService } from '../../constants/models/SpaceService'

interface IVendorProps {
  service: SpaceService
  business: Business
  handleClose: any
  isOpen: boolean
  showMessage?: boolean
}

export const VendorDetailDialog: React.FC<IVendorProps> = ({
  service,
  business,
  handleClose,
  isOpen,
  showMessage = true,
}) => {
  const navigate = useNavigate()

  return (
    <Dialog
      open={isOpen}
      handleClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      title='Vendor details'
      maxWidth='lg'
    >
      <Stack spacing={2}>
        <Stack
          spacing={2}
          direction='row'
          sx={{
            backgroundColor: '#fffff',
            padding: '1rem',
            borderRadius: '0.5rem',
            minWidth: '10rem',
          }}
        >
          <Avatar
            alt={service?.name}
            src={service?.imageUrl}
            sx={{ width: 48, height: 48, marginTop: '0.5rem' }}
          />
          <Box>
            <Stack direction='row' spacing={1} alignItems='center'>
              <Typography variant='body2'>
                <b>Name: &nbsp;</b> {business?.businessName}
              </Typography>
            </Stack>
            <Stack direction='row' spacing={1} alignItems='baseline'>
              {/* <BsFillHouseFill /> */}
              <Typography variant='body2'>
                <b>Address: &nbsp;</b> {business?.address}
              </Typography>
            </Stack>
            <Stack direction='row' spacing={1} alignItems='baseline'>
              <Typography variant='body2'>
                <b>Country: &nbsp;</b> {business?.country}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Dialog>
  )
}
