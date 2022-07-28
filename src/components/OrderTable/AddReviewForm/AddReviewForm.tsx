import React, { useState } from 'react'
import { FormikProps } from 'formik'
import { shallowEqual, useSelector } from 'react-redux'

import {
  Button,
  FormControl,
  Rating,
  Stack,
  TextField,
  Typography,
  Grid,
} from '@mui/material'
import { EnhancedAddReviewFormValues } from './EnhancedAddReviewForm'
import { RootState } from '../../../app/rootReducer'
import styles from '../../../assets/jss/components/FormStyles/formStyles'

interface IAddReviewFormProps {}

export const AddReviewForm: React.FC<
  IAddReviewFormProps & FormikProps<EnhancedAddReviewFormValues>
> = (props) => {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
  } = props

  const { orderLoading } = useSelector((state: RootState) => {
    return {
      orderLoading: state.order.loading,
    }
  }, shallowEqual)

  const handleAddReviewFormSubmit = (e: any) => {
    e.preventDefault()
    handleSubmit()
  }
  const [stars, setStars] = useState<number | null>(null)
  return (
    <form onSubmit={handleAddReviewFormSubmit}>
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
        >
          <FormControl>
            <Stack
              direction='row'
              spacing={1.5}
              sx={{
                width: '100%',
              }}
            >
              <Typography variant='body2' fontWeight='500'>
                Rating:
              </Typography>
              <Rating
                name='simple-controlled'
                value={stars}
                onChange={(event, newValue) => {
                  setStars(newValue)
                  setFieldValue('rating', newValue)
                }}
              />
            </Stack>
          </FormControl>
        </Grid>
        <Grid
          item
          mt={2}
          sx={{
            width: '100%',
          }}
        >
          <FormControl fullWidth>
            <TextField
              size='small'
              id='outlined-textarea'
              placeholder='How was the service?'
              multiline
              rows={4}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.reviewText}
              name='reviewText'
              error={
                (touched.reviewText && errors.reviewText) as unknown as boolean
              }
              helperText={errors.reviewText}
            />
          </FormControl>
        </Grid>
      </Grid>
      <FormControl sx={{ marginY: 2, float: 'right' }}>
        <Button
          variant='text'
          color='success'
          type='submit'
          disabled={orderLoading}
        >
          Confirm
        </Button>
      </FormControl>
      {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
    </form>
  )
}
