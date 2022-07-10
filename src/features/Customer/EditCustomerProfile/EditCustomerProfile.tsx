import React, { useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Container } from '@mui/material'
import { PageHeading } from '../../../components/Dashboard/PageHeading'
import EnhancedEditCustomerProfileForm from './EnhancedEditCustomerProfileForm'
import styles from '../../../assets/jss/pages/Customer/EditProfileStyles'
import { RootState } from '../../../app/rootReducer'

interface IEditCustomerProfileProps {}

const EditCustomerProfile: React.FC<IEditCustomerProfileProps> = () => {
  const navigate = useNavigate()
  const { customer } = useSelector((state: RootState) => {
    return {
      customer: state.customer.customer,
    }
  }, shallowEqual)

  console.log(customer)
  if (!customer) {
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
          <EnhancedEditCustomerProfileForm
            name={customer.name}
            email={customer.email}
            phone={customer.phone}
            gender={customer.gender}
            address={customer.address}
            city={customer.city}
            state={customer.state}
            postalCode={customer.postalCode}
            dob={customer.dob}
            navigate={navigate}
          />
        </Container>
      </Box>
    </div>
  )
}

export default EditCustomerProfile
