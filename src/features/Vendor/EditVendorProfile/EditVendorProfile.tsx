import React, { useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import { PageHeading } from '../../../components/Dashboard/PageHeading'
import EnhancedEditVendorProfileForm from './EnhancedEditVendorProfileForm'
import styles from '../../../assets/jss/pages/Vendor/EditProfileStyles'
import { RootState } from '../../../app/rootReducer'

interface IEditVendorProfileProps {}

const EditVendorProfile: React.FC<IEditVendorProfileProps> = () => {
  const navigate = useNavigate()

  const { vendor } = useSelector((state: RootState) => {
    return {
      vendor: state.vendor.vendor,
    }
  }, shallowEqual)

  if (!vendor) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <PageHeading
        heading='Edit Your Profile'
        subHeading='Manage your profile'
      />
      <Box sx={styles.container}>
        <Container maxWidth='md'>
          <EnhancedEditVendorProfileForm
            name={vendor.name}
            email={vendor.email}
            phone={vendor.phone}
            address={vendor.address}
            city={vendor.city}
            state={vendor.state}
            postalCode={vendor.postalCode}
            gender={vendor.gender}
            navigate={navigate}
          />
        </Container>
      </Box>
    </div>
  )
}

export default EditVendorProfile
