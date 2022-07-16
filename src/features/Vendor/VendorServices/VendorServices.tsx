import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
// components
import {
  Button,
  Stack,
  Typography,
  Box,
  CircularProgress,
  Divider,
} from '@mui/material'
import { PageHeading } from '../../../components/Dashboard/PageHeading'
import styles from '../../../assets/jss/pages/Vendor/VendorServiceStyles'

// mock data
import { RootState } from '../../../app/rootReducer'
import { SpaceService } from '../../../constants/models/SpaceService'
import ServicesOfferedCard from '../../../components/ServicesOffered/ServicesOfferedCard'
import { getSpaceServicesForBusiness } from '../../../slices/spaceServiceSlice'
import { ADD_SERVICE } from '../../../constants/routes'

const VendorServices: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { businessId, vendor } = useSelector(
    (state: RootState) => state.vendor,
    shallowEqual
  )
  const { spaceServices } = useSelector(
    (state: RootState) => state.spaceService,
    shallowEqual
  )

  useEffect(() => {
    if (businessId !== '') {
      dispatch(getSpaceServicesForBusiness())
    }
  }, [spaceServices.length, businessId])

  let renderedStatus
  if (spaceServices.length === 0) {
    renderedStatus = (
      <Box>
        <Typography>
          No flight found
          <Button variant='text'>
            <Link to={ADD_SERVICE}>Add Flight?</Link>
          </Button>
        </Typography>
      </Box>
    )
  }
  // console.log(vendorServices);

  return (
    <>
      <PageHeading heading='Flights' subHeading='Manage your flights'>
        <Button variant='contained'>
          <Link to={ADD_SERVICE}>Add Flight</Link>
        </Button>
      </PageHeading>
      <Box sx={styles.container}>
        {renderedStatus}
        {spaceServices && spaceServices.length > 0 && (
          <>
            <Typography
              variant='subtitle2'
              textTransform='uppercase'
              fontWeight='500'
              color='text.secondary'
              mb={4}
            >
              Your Services
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: '2rem',
                gridTemplateColumns: [
                  'auto',
                  'auto',
                  'repeat(3, 1fr)',
                  'repeat(4, 1fr)',
                ],
                flexWrap: 'wrap',
                justifyContent: ['center', 'center', 'center', 'flex-start'],
              }}
            >
              {spaceServices.map((service: SpaceService) => (
                <ServicesOfferedCard key={service.id} service={service} />
              ))}
            </Box>
          </>
        )}
      </Box>
    </>
  )
}

export default VendorServices
