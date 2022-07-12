import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import {
  Button,
  FormControl,
  TextField,
  Typography,
  Grid,
  Box,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
  Card,
} from '@mui/material'
import { format, getHours } from 'date-fns'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { SelectChangeEvent } from '@mui/material/Select'
import { FormikProps } from 'formik'
import { EnhancedBookSpaceServiceFormValues } from './EnhancedBookSpaceServiceForm'
import styles from '../../../../assets/jss/components/FormStyles/formStyles'
import { RootState } from '../../../../app/rootReducer'
import { DisplayFormikState } from '../../../../components/DisplayFormikState'
import { getVirtualAccounts } from '../../../../slices/businessSlice'
import { Rate } from '../../../../constants/models/Rate'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'

interface BookSpaceServiceFormProps {}

export const BookSpaceServiceForm: React.FC<
  BookSpaceServiceFormProps & FormikProps<EnhancedBookSpaceServiceFormValues>
> = (props) => {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
    setFieldError,
  } = props
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const debug = false

  const { spaceService, loading, bankAccounts, customer } = useSelector(
    (state: RootState) => {
      return {
        spaceService: state.spaceService.spaceService,
        loading: state.order.loading,
        bankAccounts: state.business.bankAccounts,
        customer: state.customer.customer,
      }
    },
    shallowEqual
  )

  const [country, setCountry] = React.useState(
    customer && customer.country
      ? customer.country
      : spaceService!.rates[0].country
  )

  let renderedBankAccount = <></>

  const handleSelectChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string)
    renderedBankAccount = bankAccounts
      .filter((bankAccount) => {
        return bankAccount.country_iso === event.target.value
      })
      .map((bankAccount) => {
        return (
          <Grid item>
            <Grid container direction='column' spacing={2}>
              <Grid
                item
                xs={12}
                md={12}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '0.5rem',
                  border: '2px solid blue',
                }}
              >
                <Typography variant='body2' fontWeight='500'>
                  <strong>Account Id :</strong>
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {bankAccount.account_id}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '0.5rem',
                }}
              >
                <Typography variant='body2' fontWeight='500'>
                  <strong>Account Type:</strong>
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {bankAccount.account_id_type}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                flexDirection='row'
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '0.5rem',
                }}
              >
                <Typography variant='body2' fontWeight='500'>
                  <strong>Currency:</strong>
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {bankAccount.currency}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                flexDirection='row'
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '0.5rem',
                }}
              >
                <Typography variant='body2' fontWeight='500'>
                  <strong>Country Code:</strong>
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {bankAccount.country_iso}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                md={12}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '0.5rem',
                }}
              ></Grid>
            </Grid>
          </Grid>
        )
      })[0]
  }

  useEffect(() => {
    dispatch(getVirtualAccounts())
  }, [bankAccounts.length])

  const handleBookServiceSubmit = (e: any) => {
    e.preventDefault()
    handleSubmit()
  }

  return (
    <form onSubmit={handleBookServiceSubmit}>
      <Grid container spacing={2} direction='column'>
        <Box sx={styles.chargeContainer}></Box>
        <Card sx={{ backgroundColor: '#ffffff', padding: '1rem' }}>
          <div>
            <Typography variant='h5' sx={styles.welcomeBackText}>
              Order
            </Typography>
            <Typography variant='body1' sx={styles.loginText}>
              Please make the a payment to this account to book your flight
            </Typography>
          </div>
          <Typography variant='h6' my={2}>
            <strong>Pick a currency</strong>
          </Typography>
          <FormControl fullWidth>
            <Select
              sx={styles.chargesSelect}
              labelId='charge-select-label'
              id='charge-select'
              placeholder='Select a rate'
              value={country}
              onChange={handleSelectChange}
            >
              {spaceService!.rates.map((rate: Rate, index: number) => {
                if (rate.amount > 0) {
                  return (
                    <MenuItem
                      key={uuidv4()}
                      sx={styles.chargeItem}
                      value={rate.country}
                    >
                      {rate.amount} {rate.currency}
                    </MenuItem>
                  )
                }
                return null
              })}
            </Select>
          </FormControl>
          <br />
          <br />
          <Grid
            container
            direction='row'
            justifyContent='space-start'
            alignItems='top'
          >
            {bankAccounts
              .filter((bankAccount) => {
                return bankAccount.country_iso === country
              })
              .map((bankAccount) => (
                <Card
                  sx={{
                    backgroundColor: '#f0f0f0',
                    padding: '1rem',
                    width: '100%',
                  }}
                >
                  <Grid item md={12}>
                    <Typography variant='h6' my={2}>
                      <AccountBalanceIcon /> &nbsp;
                      <strong>Bank Account Details</strong>
                    </Typography>

                    <Grid container direction='column' spacing={1}>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '0.5rem',
                        }}
                      >
                        <Typography variant='body2' fontWeight='500'>
                          <strong>Amount to transfer:</strong>
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {spaceService!.rates.find(
                            (rate) => rate.country === country
                          )!.amount || 0}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '0.5rem',
                        }}
                      >
                        <Typography variant='body2' fontWeight='500'>
                          <strong>Account Id :</strong>
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {bankAccount.account_id}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '0.5rem',
                        }}
                      >
                        <Typography variant='body2' fontWeight='500'>
                          <strong>Account Type:</strong>
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {bankAccount.account_id_type}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        flexDirection='row'
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '0.5rem',
                        }}
                      >
                        <Typography variant='body2' fontWeight='500'>
                          <strong>Currency:</strong>
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {bankAccount.currency}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        flexDirection='row'
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '0.5rem',
                        }}
                      >
                        <Typography variant='body2' fontWeight='500'>
                          <strong>Country Code:</strong>
                        </Typography>
                        <Typography variant='body2' color='text.secondary'>
                          {bankAccount.country_iso}
                        </Typography>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '0.5rem',
                        }}
                      ></Grid>
                    </Grid>
                  </Grid>
                </Card>
              ))}
          </Grid>
          <br />
          <Typography>
            <em>
              {' '}
              Keyano partners with Rapyd to make multi-country payments possible
              Each Virtual IBAN Account (international bank account number)
              functions like a local bank account for collecting payments. You
              can make online or offline bank transfers using the assigned
              virtual account number in their local currency.
            </em>
          </Typography>
        </Card>
        <Grid item>
          <FormControl sx={styles.formControl}>
            <Button
              sx={styles.secondaryButton}
              variant='contained'
              color='success'
              type='submit'
              disabled={loading}
              startIcon={<RocketLaunchIcon />}
            >
              Confirm Order
            </Button>
          </FormControl>
        </Grid>
      </Grid>
      {debug ? <DisplayFormikState {...props} /> : ''}
    </form>
  )
}
