import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  FormControl,
  TextField,
  Typography,
  Grid,
  Box,
} from '@mui/material'
import { FormikProps } from 'formik'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { EnhancedConfirmUserFormValues } from './EnhancedConfirmUserForm'
import styles from '../../../assets/jss/components/FormStyles/formStyles'
import { HOME } from '../../../constants/routes'
import { resendConfirmationCode } from '../../../slices/authSlice'
import { RootState } from '../../../app/rootReducer'

interface IConfirmUserFormProps {}

export const ConfirmUserForm: React.FC<
  IConfirmUserFormProps & FormikProps<EnhancedConfirmUserFormValues>
> = (props) => {
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    props
  const dispatch = useDispatch()

  const { authLoading } = useSelector((state: RootState) => {
    return {
      authLoading: state.auth.loading,
    }
  }, shallowEqual)

  return (
    <div>
      <div style={{ margin: '0px 0px 22px' }}>
        <Typography variant='h4' sx={styles.welcomeBackText}>
          Confirm Account
        </Typography>
        <Typography variant='body1' sx={styles.loginText}>
          We have sent a 6-digit code by email, enter it below to confirm your
          account.
        </Typography>
        <br />
      </div>
      <form onSubmit={handleSubmit}>
        <FormControl required sx={styles.formControl}>
          <Typography variant='subtitle1' sx={styles.label}>
            Enter verification code
          </Typography>
          <TextField
            type='text'
            placeholder='123456'
            name='code'
            size='small'
            variant='outlined'
            value={values.code}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(errors.code && touched.code) as boolean}
            helperText={errors.code && touched.code && errors.code}
            InputLabelProps={{
              sx: {
                root: styles.heading,
                focused: styles.cssFocused,
              },
            }}
          />
        </FormControl>
        <FormControl sx={styles.formControl}>
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Grid item md={9} xs={12}>
              <Typography variant='body2' sx={styles.label}>
                Did not receive a code?{' '}
                <Link
                  to={HOME}
                  style={{
                    textDecoration: 'underline',
                    color: 'primary.main',
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(resendConfirmationCode())
                  }}
                >
                  Resend it
                </Link>
              </Typography>
            </Grid>
            <Grid item md={3} xs={12}>
              <Button
                sx={styles.secondaryButton}
                variant='contained'
                color='primary'
                type='submit'
                disabled={authLoading}
                // fullWidth
              >
                Confirm
              </Button>
              <br />
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </div>
  )
}
