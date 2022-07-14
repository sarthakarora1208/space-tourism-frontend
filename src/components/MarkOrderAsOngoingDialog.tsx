import React, { useState } from 'react'
import {
  Button,
  Stack,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Rating,
  Typography,
} from '@mui/material'
import Dialog from './Dialog/Dialog'

interface IMarkOrderAsOngoingDialogProps {
  handleConfirm: any
  handleClose: any
  isOpen: boolean
}

export const MarkOrderAsOngoingDialog: React.FC<
  IMarkOrderAsOngoingDialogProps
> = ({ handleConfirm, handleClose, isOpen }) => {
  return (
    <Dialog
      open={isOpen}
      handleClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      title=''
      action={
        <>
          <Button variant='text' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='text' color='success' onClick={handleConfirm}>
            Confirm
          </Button>
        </>
      }
    >
      <Typography variant='body2' mb={2}>
        Are you sure you want to confirm this ticket?
      </Typography>
    </Dialog>
  )
}
