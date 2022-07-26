import {
  Box,
  Button,
  FormControl,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { simulateBankTransfer } from '../slices/businessSlice'
import { createOrder } from '../slices/orderSlice'
import Dialog from './Dialog/Dialog'

interface IConfirmOrderDialogProps {
  handleClose: any
  isOpen: boolean
}

export const ConfirmOrderDialog: React.FC<IConfirmOrderDialogProps> = ({
  handleClose,
  isOpen,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <Dialog
      open={isOpen}
      handleClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      title='Confirm order'
    >
      <Grid
        sx={{
          minWidth: ['auto', 'auto', 'auto', '500px'],
        }}
        container
        direction='column'
        justifyContent='center'
        alignItems='start'
      >
        <Typography component='legend' variant='body2' fontWeight='500'>
          Are you sure you want to book this service?
        </Typography>
      </Grid>
      <FormControl sx={{ marginY: 2, float: 'right', flexDirection: 'row' }}>
        <Button
          variant='text'
          color='success'
          onClick={() => {
            dispatch(simulateBankTransfer(navigate))
            dispatch(createOrder())
            handleClose()
          }}
        >
          Confirm
        </Button>
        <Button
          variant='text'
          color='error'
          onClick={() => {
            handleClose()
          }}
        >
          Cancel
        </Button>
      </FormControl>
    </Dialog>
  )
}
