import React, { useEffect, useState } from 'react'
import { Box, Stack, Grid, useMediaQuery, useTheme } from '@mui/material'
import { shallowEqual, useSelector } from 'react-redux'
import { RootState } from '../../../../app/rootReducer'

import styles from '../../../../assets/jss/pages/Customer/CustomerServiceStyles'
import SpaceServiceCard from '../../../../components/ServiceCard/SpaceServiceCard'

export const SpaceServiceSearch = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const { spaceServices } = useSelector(
    (state: RootState) => state.spaceService,
    shallowEqual
  )

  useEffect(() => {}, [spaceServices.length])

  return (
    <Box sx={{ padding: '2rem' }}>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        {spaceServices.length === 0 && <div>No Space Services found!</div>}
        {spaceServices.map((service) => (
          <Grid item md={4} sx={{ padding: '1rem' }}>
            <SpaceServiceCard
              key={service.id}
              serviceId={service.id}
              imageUrl={service.imageUrl}
              name={service.name}
              rates={service.rates}
              isVerified={true}
              location={
                service.business && service.business!.address
                  ? service.business!.address
                  : ''
              }
              description={service.description}
              vendorName={
                (service.business && service.business!.businessName) || ''
              }
              averageRating={service.averageRating}
              reviewCount={service.reviewCount}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
