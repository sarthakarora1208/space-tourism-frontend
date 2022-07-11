import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Link as MuiLink,
  Divider,
  Chip,
} from '@mui/material'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { RootState } from '../../../../app/rootReducer'
import { format } from 'date-fns'

interface ISpaceServiceOrderSummaryProps {}

export const SpaceServiceOrderSummary: React.FC<
  ISpaceServiceOrderSummaryProps
> = ({}) => {
  const dispatch = useDispatch()

  const { customer, amount, spaceService } = useSelector((state: RootState) => {
    return {
      customer: state.customer.customer,
      amount: state.order.amount,
      spaceService: state.spaceService.spaceService,
    }
  }, shallowEqual)

  return (
    <Card>
      <CardContent
        sx={{
          padding: '1.5rem',
        }}
      >
        <Typography variant='h6' my={2}>
          <strong>Your Details</strong>
        </Typography>
        <Grid container direction='row' spacing={1}>
          <Grid
            item
            xs={12}
            md={6}
            flexDirection='row'
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '0.5rem',
            }}
          >
            <Typography variant='body2' fontWeight='500'>
              Name:
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {customer?.name}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '0.5rem',
            }}
          >
            <Typography variant='body2' fontWeight='500'>
              Email:
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <MuiLink href={`mailto:${customer?.email}`}>
                {customer?.email}
              </MuiLink>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '0.5rem',
            }}
          >
            <Typography variant='body2' fontWeight='500'>
              Phone Number:
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              <MuiLink href={`tel:${customer?.phone}`}>
                {customer?.phone ? customer?.phone : '_'}
              </MuiLink>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '0.5rem',
            }}
          >
            <Typography variant='body2' fontWeight='500'>
              Country:
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {customer?.country}
            </Typography>
          </Grid>
        </Grid>
        <br />

        {spaceService ? (
          <Card sx={{ backgroundColor: '#f0f0f0', padding: '1rem' }}>
            <Typography variant='h6' my={2}>
              <strong>Space Service Details</strong>
            </Typography>
            <Grid
              container
              direction='row'
              justifyContent='space-start'
              alignItems='top'
            >
              <Grid item sx={{ paddingRight: '0.75rem' }}>
                <img
                  src={spaceService.imageUrl}
                  alt={spaceService.name}
                  width={200}
                />
              </Grid>
              <Grid item>
                <Grid container direction='column' spacing={1}>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    flexDirection='row'
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '0.5rem',
                    }}
                  >
                    <Typography variant='body2' fontWeight='500'>
                      <strong>Service Name:</strong>
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {spaceService.name}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    flexDirection='row'
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '0.5rem',
                    }}
                  >
                    <Typography variant='body2' fontWeight='500'>
                      <strong>Description:</strong>
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {spaceService.description.substring(0, 20) + '...'}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '0.5rem',
                    }}
                  >
                    <Typography variant='body2' fontWeight='500'>
                      <strong>Vendor :</strong>
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {spaceService && spaceService.business
                        ? spaceService.business.businessName
                        : ''}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '0.5rem',
                    }}
                  >
                    <Typography variant='body2' fontWeight='500'>
                      <strong>Address:</strong>
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {spaceService && spaceService.business
                        ? spaceService.business.address
                        : ''}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '0.5rem',
                    }}
                  >
                    <Typography variant='body2' fontWeight='500'>
                      <strong>Start Time:</strong>
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {format(
                        new Date(spaceService!.startTime),
                        'KK:mm a MMM dd yyyy'
                      )}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '0.5rem',
                    }}
                  >
                    <Typography variant='body2' fontWeight='500'>
                      <strong>End Time:</strong>
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {format(
                        new Date(spaceService!.endTime),
                        'KK:mm a MMM dd yyyy'
                      )}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '0.5rem',
                    }}
                  >
                    <Chip
                      style={{ borderColor: '#000', color: '#000' }}
                      label={`${spaceService.seats} Seats Left`}
                      variant='outlined'
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        ) : (
          <Typography variant='body2' color='text.secondary'>
            No Service Details
          </Typography>
        )}
        {amount > 0 && (
          <div>
            <Typography variant='h6' my={2}>
              Amount
            </Typography>
            <Grid container direction='column' spacing={1}>
              <Grid
                item
                xs={12}
                md={6}
                flexDirection='row'
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '0.5rem',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='body2' fontWeight='500'>
                  Total Duration:
                </Typography>
                <Typography variant='body1' fontWeight='600'></Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                flexDirection='row'
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '0.5rem',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='body2' fontWeight='500'></Typography>
                <Typography variant='body1' fontWeight='600'></Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                mb={1}
                flexDirection='row'
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '0.5rem',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='body2' fontWeight='500'>
                  Service Fee:
                </Typography>
                <Typography variant='body1' fontWeight='600'>
                  ${' '}
                </Typography>
              </Grid>
              <Divider />
              <Grid
                item
                xs={12}
                md={6}
                flexDirection='row'
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '0.5rem',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='body1' fontWeight='600'>
                  Total Fee:
                </Typography>
                <Typography variant='body1' fontWeight='600'>
                  $ {amount.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
