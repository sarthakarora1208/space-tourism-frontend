import React, { useState } from 'react'
import {} from '@mui/material'
import EnhancedCancellationForm from './EnhancedCancellationForm'
import Dialog from '../../Dialog/Dialog'

interface ICancellationDialogProps {
  handleConfirm: any
  handleClose: any
  isOpen: boolean
}

export const CancellationDialog: React.FC<ICancellationDialogProps> = ({
  handleConfirm,
  handleClose,
  isOpen,
}) => {
  return (
    <Dialog
      open={isOpen}
      handleClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      title='Cancel Flight'
    >
      <EnhancedCancellationForm handleClose={handleClose} />
    </Dialog>
  )
}
