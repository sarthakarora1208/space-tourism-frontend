import React from 'react'
import { Link } from 'react-router-dom'

import {
  Button,
  Select,
  MenuItem,
  FormControl,
  Stack,
  TextField,
  Typography,
  Grid,
  Box,
} from '@mui/material'
import { FormikProps } from 'formik'
import { shallowEqual, useSelector } from 'react-redux'
import { LOGIN } from '../../../constants/routes'
import { GENDER } from '../../../constants/gender'
import { RootState } from '../../../app/rootReducer'
import styles from '../../../assets/jss/components/FormStyles/formStyles'

import { EnhancedRegisterFormValues } from './EnhancedRegisterForm'
import { DisplayFormikState } from '../../../components/DisplayFormikState'

interface IRegisterFormProps {}

export const RegisterForm: React.FC<
  IRegisterFormProps & FormikProps<EnhancedRegisterFormValues>
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

  const handleRegisterSubmit = (e: any) => {
    e.preventDefault()
    handleSubmit()
  }

  const { authLoading } = useSelector((state: RootState) => {
    return {
      authLoading: state.auth.loading,
    }
  }, shallowEqual)

  const debug = false

  return (
    <Box my={3}>
      <div style={{ margin: '0px 0px 22px' }}>
        <Typography variant='h4' sx={styles.welcomeBackText}>
          Create a customer account
        </Typography>
        <Typography variant='body1' sx={styles.loginText}>
          Fill out the form to get started.
        </Typography>
        <Stack direction='row' spacing={1}>
          <Typography variant='subtitle2' sx={styles.label1}>
            Already have an account?
          </Typography>
          <Link to={LOGIN}>
            <Typography variant='subtitle2' sx={styles.link}>
              Login
            </Typography>
          </Link>
        </Stack>
      </div>
      <form onSubmit={handleRegisterSubmit}>
        <Grid
          //container
          direction='column'
          justifyContent='center'
          alignItems='start'
        >
          <Grid item md={6} xs={12}>
            <FormControl required sx={styles.formControl}>
              <Typography variant='body2' sx={styles.label}>
                Name
              </Typography>
              <TextField
                type='text'
                placeholder='Enter name'
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
          {/* <Grid item md={6} xs={12}>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                Username
              </Typography>
              <TextField
                type="text"
                placeholder="Enter username"
                name="username"
                variant="outlined"
                size="small"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(errors.username && touched.username) as boolean}
                helperText={
                  errors.username && touched.username && errors.username
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

          <Grid item md={6} xs={12} sx={styles.fontGridColumn}>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                Gender
              </Typography>
              <Select
                labelId="minor-gender-select-label"
                id="minor-gender-select"
                value={values.gender}
                name="gender"
                size="small"
                onChange={handleChange}
              >
                <MenuItem value={GENDER.MALE}>Male</MenuItem>
                <MenuItem value={GENDER.FEMALE}>Female</MenuItem>
                <MenuItem value={GENDER.PREFER_NOT_TO_SAY}>
                  Prefer not to say
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                Phone Number
              </Typography>
              <TextField
                id="phone"
                placeholder="Enter phone number"
                type="phone"
                name="phone"
                variant="outlined"
                size="small"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(errors.phone && touched.phone) as boolean}
                helperText={errors.phone && touched.phone && errors.phone}
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>
          </Grid> */}
          <Grid item md={6} xs={12}>
            <FormControl required sx={styles.formControl}>
              <Typography variant='body2' sx={styles.label}>
                Email
              </Typography>
              <TextField
                id='emailAddress'
                placeholder='Enter email'
                type='email'
                name='email'
                variant='outlined'
                size='small'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(errors.email && touched.email) as boolean}
                helperText={errors.email && touched.email && errors.email}
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>
          </Grid>
          {/* <Grid item md={6} xs={12}>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                Date of Birth
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <MuiDatePicker
                    disableFuture
                    views={["year", "month", "day"]}
                    value={values.dob}
                    onChange={newValue => {
                      setFieldValue("dob", newValue);
                    }}
                    renderInput={params => (
                      <TextField size="small" {...params} />
                    )}
                  />
                </Stack>
              </LocalizationProvider>
            </FormControl>
          </Grid> */}
          <Grid item md={6} xs={12} sx={styles.fontGridColumn}>
            <FormControl required sx={styles.formControl}>
              <Typography variant='body2' sx={styles.label}>
                Enter Password
              </Typography>
              <TextField
                id='password'
                placeholder='Enter password'
                type='password'
                name='password'
                variant='outlined'
                size='small'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete='off'
                error={(errors.password && touched.password) as boolean}
                helperText={
                  errors.password && touched.password && errors.password
                }
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>

            <FormControl required sx={styles.formControl}>
              <Typography variant='body2' sx={styles.label}>
                Re-enter Password
              </Typography>
              <TextField
                placeholder='Re-enter password'
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
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl required sx={styles.formControl}>
              <Typography variant='body2' sx={styles.label}>
                Country
              </Typography>
              <TextField
                type='text'
                placeholder='Enter Two-letter ISO Country code'
                name='country'
                variant='outlined'
                size='small'
                value={values.country}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(errors.country && touched.country) as boolean}
                helperText={errors.country && touched.country && errors.country}
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>
          </Grid>
          <br />
          <Button
            sx={styles.secondaryButton}
            variant='contained'
            color='primary'
            type='submit'
            disabled={authLoading}
            // fullWidth
          >
            Sign Up
          </Button>
          <br />
          <br />
          <Typography variant='subtitle2'>
            <em>
              By clicking the sign up button you confirm that you are atleast 18
              years old and agree with our{' '}
              <Link
                to='#'
                style={{
                  textDecoration: 'underline',
                  color: 'primary.main',
                }}
              >
                terms and conditions.
              </Link>
            </em>
          </Typography>
        </Grid>
        {debug ? <DisplayFormikState {...props} /> : ''}
      </form>
    </Box>
  )
}
