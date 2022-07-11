import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import {
  Grid,
  Container,
  CircularProgress,
  Typography,
  Box,
} from '@mui/material'
import { RootState } from '../../../app/rootReducer'
import styles from '../../../assets/jss/components/FormStyles/formStyles'

import { SpaceServiceOrderSummary } from './OrderSummary/SpaceServiceOrderSummary'
import EnhancedBookSpaceServiceForm from './BookServiceForm/EnhancedBookSpaceServiceForm'

interface IBookServiceProps {}

const BookService: React.FC<IBookServiceProps> = () => {
  const { serviceId } = useParams()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { spaceService } = useSelector((state: RootState) => {
    return {
      spaceService: state.spaceService.spaceService,
    }
  })

  useEffect(() => {}, [])

  let orderSummary = <SpaceServiceOrderSummary />
  let renderForm = <EnhancedBookSpaceServiceForm navigate={navigate} />

  return (
    <div>
      <div style={{ background: '#fafafa', minHeight: '100vh' }}>
        <Container maxWidth='xl'>
          <Grid
            container
            direction='row'
            justifyContent='flex-start'
            alignItems='flex-start'
          >
            <Grid item xs={12} md={6}>
              <div style={{ padding: '1em' }}>
                <Box my={3}>{renderForm}</Box>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div style={{ padding: '1em' }}>{orderSummary}</div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  )
}

export default BookService
