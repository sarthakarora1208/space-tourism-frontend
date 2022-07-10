import React, { useState, useEffect } from 'react'
import { FormikProps } from 'formik'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { EnhancedAddOrEditSpaceServiceFormValues } from './EnhancedAddOrEditSpaceServiceForm'
import { useLocation } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/rootReducer'
import { v4 as uuidv4 } from 'uuid'
import {
  Box,
  Button,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import styles from '../../../assets/jss/components/FormStyles/formStyles'
import { PhotoCamera } from '@mui/icons-material'
import { DateTimePicker } from '@mui/lab'
import { DisplayFormikState } from '../../../components/DisplayFormikState'
import { IoRemoveOutline, IoAdd } from 'react-icons/io5'
import {
  addRateToSpaceService,
  changeRate,
  removeRateFromSpaceService,
  setSpaceServiceImageFileName,
  uploadSpaceServiceImageToS3,
} from '../../../slices/spaceServiceSlice'
import { DropzoneDialog } from 'material-ui-dropzone'
import { Rate } from '../../../constants/models/Rate'
import UploadContainer from '../../../components/UploadContainer/UploadContainer'
import { useDropzone } from 'react-dropzone'

interface IAddOrEditSpaceServiceFormProps {}

export const AddOrEditSpaceServiceForm: React.FC<
  IAddOrEditSpaceServiceFormProps &
    FormikProps<EnhancedAddOrEditSpaceServiceFormValues>
> = (props) => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
  } = props
  const debug = true

  const [open, setOpen] = useState(false)

  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (pathname.split('/').includes('edit')) {
      setIsEdit(true)
    }
  }, [])

  const { imageUrl, filename, loading, rates } = useSelector(
    (state: RootState) => state.spaceService,
    shallowEqual
  )

  const disabled = false

  const onDrop = (files: any) => {
    //alert(acceptedFiles[0].name)
    if (files.length > 0) {
      const file = files[0]
      dispatch(setSpaceServiceImageFileName(file.name))
      const formData = new FormData()
      formData.append('file', file)
      dispatch(uploadSpaceServiceImageToS3(formData))
    }
  }

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    onDrop,
    disabled,
  })

  const handleSpaceServiceSubmit = (e: any) => {
    e.preventDefault()
    handleSubmit()
  }

  return (
    <Box my={3}>
      <Typography variant='h5' sx={styles.welcomeBackText}>
        {isEdit ? 'Edit Space Service' : 'Add Space Service'}
      </Typography>
      <br />
      <form onSubmit={handleSpaceServiceSubmit}>
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='start'
        >
          <Grid item xs={12} width='100%'>
            <FormControl required sx={styles.formControl}>
              <Typography variant='body2' sx={styles.label}>
                Service Name
              </Typography>
              <TextField
                type='text'
                placeholder='Name of the service'
                name='name'
                variant='outlined'
                size='small'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(errors.name && touched.name) as boolean}
                helperText={errors.name && touched.name && errors.name}
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item width='100%'>
            <FormControl required sx={styles.formControl}>
              <Typography variant='body2' sx={styles.label}>
                Description
              </Typography>
              <TextField
                type='text'
                placeholder='Write a short description about the service'
                name='description'
                variant='outlined'
                minRows={5}
                size='small'
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(errors.description && touched.description) as boolean}
                helperText={
                  errors.description &&
                  touched.description &&
                  errors.description
                }
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item width='100%'>
            <FormControl required sx={styles.formControl}>
              <Typography variant='body2' sx={styles.label}>
                Number of Seats on Flight
              </Typography>
              <TextField
                type='number'
                placeholder='How many people can attend the flight at once?'
                name='seats'
                variant='outlined'
                size='small'
                value={values.seats}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(errors.seats && touched.seats) as boolean}
                helperText={errors.seats && touched.seats && errors.seats}
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item width='100%'>
            <FormControl required sx={styles.formControl}>
              <Typography variant='body2' sx={styles.label}>
                Upload Image
              </Typography>
              {imageUrl === 'no-url' ? (
                <UploadContainer
                  {...getRootProps({
                    //+ converts true -> 1, false -> 0
                    accepted: +isDragAccept,
                    disabled,
                  })}
                >
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </UploadContainer>
              ) : (
                <div>
                  <a href={imageUrl} target='_blank' rel='noreferrer'>
                    <img src={imageUrl} alt={imageUrl} width='500' />
                  </a>
                </div>
              )}
            </FormControl>
          </Grid>

          <Grid container>
            <Grid container direction='row' spacing={2} my={0.5}>
              <Grid item md={6} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Typography variant='body2' sx={styles.label}>
                    Flight Start Time
                  </Typography>
                  <DateTimePicker
                    label=''
                    value={values.startTime}
                    onChange={(value) => {
                      setFieldValue('startTime', value)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        type='text'
                        placeholder=''
                        variant='outlined'
                        size='small'
                        error={
                          (errors.startTime && touched.startTime) as boolean
                        }
                        helperText={
                          errors.startTime &&
                          touched.startTime &&
                          errors.startTime
                        }
                        fullWidth
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item md={6} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Typography variant='body2' sx={styles.label}>
                    Flight End Time
                  </Typography>
                  <DateTimePicker
                    label=''
                    value={values.endTime}
                    onChange={(value) => {
                      setFieldValue('endTime', value)
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        type='text'
                        placeholder=''
                        variant='outlined'
                        size='small'
                        error={(errors.endTime && touched.endTime) as boolean}
                        helperText={
                          errors.endTime && touched.endTime && errors.endTime
                        }
                        fullWidth
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Grid item width='100%'>
          <FormControl sx={styles.formControl}>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography variant='body2' sx={styles.label}>
                <strong>Space Rates</strong> - How much will the flight cost?
              </Typography>
              {!isEdit && (
                <Stack direction='row' spacing={2}>
                  <Button
                    type='button'
                    startIcon={<IoAdd fontSize='24' />}
                    onClick={() => {
                      dispatch(
                        addRateToSpaceService({
                          id: uuidv4(),
                          amount: 0,
                          currency: 'USD',
                          country: 'U.S.A',
                        })
                      )
                    }}
                  >
                    Add Rate
                  </Button>
                  <Button
                    color='error'
                    type='button'
                    onClick={() => {
                      dispatch(removeRateFromSpaceService())
                    }}
                    startIcon={<IoRemoveOutline fontSize='24' />}
                  >
                    Remove
                  </Button>
                </Stack>
              )}
            </Stack>
          </FormControl>
          <br />
          <br />
          <Grid item key={uuidv4()}>
            <FormControl required sx={styles.formControl}>
              <Grid
                width='100%'
                container
                spacing={1.5}
                justifyContent='center'
                alignItems='center'
              >
                <Grid item md={4}>
                  <Typography variant='body2' sx={styles.label}>
                    <strong>
                      <em>Country</em>
                    </strong>
                  </Typography>
                </Grid>

                <Grid item md={4}>
                  <Typography variant='body2' sx={styles.label}>
                    <strong>
                      <em>Currency Code</em>
                    </strong>
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography variant='body2' sx={styles.label}>
                    <strong>
                      <em>Amount</em>
                    </strong>
                  </Typography>
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
          {rates.map((rate: Rate, index: number) => {
            return (
              <Grid item key={uuidv4()}>
                <FormControl required sx={styles.formControl}>
                  <Grid
                    width='100%'
                    container
                    spacing={1.5}
                    justifyContent='space-between'
                    alignItems='center'
                  >
                    <Grid item md={4}>
                      <TextField
                        type='string'
                        placeholder=''
                        variant='outlined'
                        size='small'
                        value={rate.country}
                        onChange={(value) => {
                          dispatch(
                            changeRate({ ...rate, country: value.target.value })
                          )
                        }}
                        disabled={isEdit}
                        InputLabelProps={{
                          sx: {
                            root: styles.heading,
                            focused: styles.cssFocused,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <TextField
                        type='string'
                        placeholder=''
                        name='currency'
                        variant='outlined'
                        size='small'
                        value={rate.currency}
                        onChange={(value) => {
                          dispatch(
                            changeRate({
                              ...rate,
                              currency: value.target.value,
                            })
                          )
                        }}
                        disabled={isEdit}
                        InputLabelProps={{
                          sx: {
                            root: styles.heading,
                            focused: styles.cssFocused,
                          },
                        }}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <TextField
                        type='number'
                        placeholder='rate'
                        name='amount'
                        variant='outlined'
                        size='small'
                        value={rate.amount}
                        onChange={(value) => {
                          dispatch(
                            changeRate({
                              ...rate,
                              amount: parseInt(value.target.value, 10),
                            })
                          )
                        }}
                        disabled={isEdit}
                        InputLabelProps={{
                          sx: {
                            root: styles.heading,
                            focused: styles.cssFocused,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
            )
          })}
        </Grid>
        <Grid
          width='100%'
          mt={3}
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <FormControl sx={styles.formControl}>
            <Grid item>
              <Button
                sx={styles.secondaryButton}
                variant='contained'
                color='primary'
                type='submit'
                disabled={loading}
              >
                Next
              </Button>
            </Grid>
          </FormControl>
        </Grid>
        {debug ? <DisplayFormikState {...props} /> : ''}
      </form>
      <DropzoneDialog
        acceptedFiles={['image/*']}
        cancelButtonText='Cancel'
        submitButtonText='Submit'
        maxFileSize={10240000}
        filesLimit={1}
        open={open}
        onClose={() => setOpen(false)}
        onSave={(files) => {
          if (files.length > 0) {
            const file = files[0]
            dispatch(setSpaceServiceImageFileName(file.name))
            const formData = new FormData()
            formData.append('file', file)
            dispatch(uploadSpaceServiceImageToS3(formData))
          }
          setOpen(false)
        }}
        showPreviews
        showFileNamesInPreview
      />
    </Box>
  )
}
