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
        <Grid
          item
          sx={{
            width: '100%',
          }}
        ></Grid>
        <Grid
          item
          mt={2}
          sx={{
            width: '100%',
          }}
        ></Grid>
      </Grid>
      <FormControl sx={{ marginY: 2, float: 'right' }}>
        <Button
          variant='text'
          color='success'
          onClick={() => {
            dispatch(simulateBankTransfer(navigate))
          }}
        >
          Confirm
        </Button>
      </FormControl>
    </Dialog>
  )
}
