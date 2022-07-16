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
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/rootReducer'
import { PageHeading } from '../../../components/Dashboard/PageHeading'
import { ADD_SERVICE } from '../../../constants/routes'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import {
  getTransactionsForBankAccount,
  getVirtualAccounts,
} from '../../../slices/businessSlice'

interface IVirtualAccountsProps {}

const VirtualAccounts: React.FC<IVirtualAccountsProps> = ({}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getVirtualAccounts())
  }, [])
  const { bankAccounts } = useSelector((state: RootState) => {
    return {
      bankAccounts: state.business.bankAccounts,
    }
  }, shallowEqual)

  return (
    <>
      <PageHeading
        heading='Virtual Accounts'
        subHeading='Manage your virtual accounts'
      >
        <Button variant='contained'>
          <Link to={ADD_SERVICE}>Add Service</Link>
        </Button>
      </PageHeading>
      <div>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={3}
          sx={{ margin: '0.5rem' }}
        >
          {' '}
          {bankAccounts.length === 0 && ' No bank accounts found!'}
          {bankAccounts.map((bankAccount) => (
            <Grid item md={4}>
              <Card
                sx={{
                  backgroundColor: '#ffffff',
                  padding: '0.75rem',
                  width: '400px',
                  boxShadow: '0px 5px 10px 5px #e0e0e0',
                  '&:hover': {
                    boxShadow: '0px 20px 40px 20px #e0e0e0',
                  },
                }}
              >
                <Typography variant='h6' my={2}>
                  <AccountBalanceIcon /> &nbsp;
                  <strong>{bankAccount.country_iso} Bank Details</strong>
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
                <Button
                  variant='contained'
                  onClick={(e) => {
                    dispatch(
                      getTransactionsForBankAccount(
                        bankAccount.issuing_id,
                        navigate
                      )
                    )
                  }}
                >
                  View Transactions
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  )
}

export default VirtualAccounts
