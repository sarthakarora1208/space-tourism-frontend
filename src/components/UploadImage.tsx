import React from 'react'
import Dialog from './Dialog/Dialog'
import {
  Box,
  Button,
  FormControl,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { RootState } from '../app/rootReducer'
import { uploadVendorProfileImageUrl } from '../slices/vendorSlice'
import { uploadCustomerProfileImage } from '../slices/customerSlice'
import UploadContainer from './UploadContainer/UploadContainer'

interface IUploadImageProps {
  handleClose: any
  isOpen: boolean
}

export const UploadImage: React.FC<IUploadImageProps> = ({
  handleClose,
  isOpen,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const disabled = false
  const { vendor } = useSelector(
    (state: RootState) => state.vendor,
    shallowEqual
  )
  const onDrop = (files: any) => {
    //alert(acceptedFiles[0].name)
    if (files.length > 0) {
      const file = files[0]
      const formData = new FormData()
      formData.append('file', file)
      if (vendor) {
        dispatch(uploadVendorProfileImageUrl(formData, navigate))
      } else {
        dispatch(uploadCustomerProfileImage(formData, navigate))
      }
      handleClose()
    }
  }

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop,
    disabled,
  })

  return (
    <Dialog
      open={isOpen}
      handleClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      title='Upload Image'
    >
      <UploadContainer
        {...getRootProps({
          //+ converts true -> 1, false -> 0
          accepted: +isDragAccept,
          disabled,
        })}
      >
        <input {...getInputProps()} />
        <p>Drag some files here, or click to select files</p>
      </UploadContainer>
      <FormControl sx={{ marginY: 2, float: 'right', flexDirection: 'row' }}>
        <Button
          variant='text'
          color='success'
          onClick={() => {
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
