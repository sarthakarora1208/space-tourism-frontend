import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { Button, FormControl, TextField, Typography } from '@mui/material'

import { FormikProps } from 'formik'
import { EnhancedUpdatePasswordFormValues } from './EnhancedUpdatePasswordForm'
import styles from '../../../assets/jss/components/FormStyles/formStyles'
import { RootState } from '../../../app/rootReducer'

interface IUpdatePasswordFormProps {}

export const UpdatePasswordForm: React.FC<
  IUpdatePasswordFormProps & FormikProps<EnhancedUpdatePasswordFormValues>
> = (props) => {
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    props

  const { authLoading } = useSelector((state: RootState) => {
    return {
      authLoading: state.auth.loading,
    }
  }, shallowEqual)

  return (
    <div>
      <div style={{ margin: '0px 0px 22px' }}>
        <Typography variant='body1' sx={styles.loginText}>
          UPDATE PASSWORD
        </Typography>
        <Typography variant='h4' sx={styles.welcomeBackText}>
          Set New Password
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <FormControl required sx={styles.formControl}>
          <Typography variant='subtitle1' sx={styles.label}>
            Enter your password
          </Typography>
          <TextField
            id='password'
            placeholder='Enter Password'
            type='password'
            name='password'
            variant='outlined'
            size='small'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete='off'
            error={(errors.password && touched.password) as boolean}
            helperText={errors.password && touched.password && errors.password}
            InputLabelProps={{
              sx: {
                root: styles.heading,
                focused: styles.cssFocused,
              },
            }}
          />
        </FormControl>
        <FormControl sx={styles.formControl}>
          <Typography variant='subtitle1' sx={styles.label}>
            Re-enter your password
          </Typography>
          <TextField
            placeholder='Re-enter Password'
            type='password'
            variant='outlined'
            size='small'
            name='passwordConfirmation'
            value={values.passwordConfirmation}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              (errors.passwordConfirmation &&
                touched.passwordConfirmation) as boolean
            }
            autoComplete='off'
            helperText={
              errors.passwordConfirmation &&
              touched.passwordConfirmation &&
              errors.passwordConfirmation
            }
            InputLabelProps={{
              sx: {
                root: styles.heading,
                focused: styles.cssFocused,
              },
            }}
          />
        </FormControl>
        <Button
          sx={styles.secondaryButton}
          variant='contained'
          color='primary'
          type='submit'
          disabled={authLoading}
          //fullWidth
        >
          Update password
        </Button>
      </form>
    </div>
  )
}
