import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Grid, Container, Hidden, Box } from '@mui/material'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../../app/rootReducer'
import EnhancedVendorRegisterForm from './EnhancedVendorRegisterForm'
import EnhancedConfirmUserFrom from '../ConfirmUser/EnhancedConfirmUserForm'

import { setStep } from '../../../slices/authSlice'

import Lottie from 'react-lottie'
import Graphic from '../../../assets/images/register.json'

interface IVendorRegisterProps {}

const VendorRegister: React.FC<IVendorRegisterProps> = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { step, user } = useSelector((state: RootState) => {
    return {
      step: state.auth.step,
      user: state.auth.user,
    }
  }, shallowEqual)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Graphic,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  let renderedForm

  switch (step) {
    case 0:
      renderedForm = <EnhancedVendorRegisterForm navigate={navigate} />
      break
    case 1:
      renderedForm = <EnhancedConfirmUserFrom navigate={navigate} />
      break
    default:
      renderedForm = <EnhancedVendorRegisterForm navigate={navigate} />
  }

  useEffect(() => {
    if (step === 1 && !user) {
      dispatch(setStep(0))
    }
  }, [])

  return (
    <div style={{ margin: '0' }}>
      <Container maxWidth='lg'>
        <Grid
          container
          direction='row'
          justifyContent='flex-start'
          alignItems='flex-start'
        >
          <Grid item xs={12} md={6}>
            <div style={{ padding: '1em' }}>{renderedForm}</div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                paddingTop: '15rem',
              }}
            >
              <Lottie options={defaultOptions} height={400} width={400} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default VendorRegister
