import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Container, CssBaseline, Box } from '@mui/material'
import { shallowEqual, useSelector } from 'react-redux'

import { RootState } from '../../../app/rootReducer'
import EnhancedLoginForm from './EnhancedLoginForm'
import EnhancedUpdatePasswordForm from './EnhancedUpdatePasswordForm'
import { LOGIN } from '../../../constants/routes'

import Lottie from 'react-lottie'
import Graphic from '../../../assets/images/rocket-in-space.json'

interface ILoginProps {}

const Login: React.FC<ILoginProps> = () => {
  const { isAuthenticated, role, step, email, tempPassword } = useSelector(
    (state: RootState) => {
      return {
        isAuthenticated: state.auth.isAuthenticated,
        role: state.auth.role,
        step: state.auth.loginStep,
        email: state.auth.email,
        tempPassword: state.auth.tempPassword,
      }
    },
    shallowEqual
  )

  const navigate = useNavigate()

  let renderedForm

  const customer = false

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Graphic,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  switch (step) {
    case 0:
      renderedForm = <EnhancedLoginForm navigate={navigate} />
      renderedForm = (
        <EnhancedLoginForm
          email={customer ? 'dociye5646@lankew.com' : 'heforec361@leupus.com'}
          password={customer ? '1234567' : '12345678'}
          navigate={navigate}
        />
      )

      break
    case 1:
      renderedForm = <EnhancedUpdatePasswordForm navigate={navigate} />
      break
    default:
      renderedForm = <EnhancedLoginForm navigate={navigate} />
      break
  }

  // useEffect(() => {
  //   if (isAuthenticated) {
  //   }
  // }, [isAuthenticated, role]);

  useEffect(() => {
    if (step === 1 && !email && !tempPassword) {
      navigate(LOGIN)
    }
  }, [])

  return (
    <div style={{ paddingTop: '15vh', background: '#FFFFFF' }}>
      <Container style={{ padding: '0.4em', height: '80vh' }}>
        <Grid
          container
          direction='row'
          justifyContent='flex-start'
          spacing={4}
          alignItems='flex-start'
        >
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Lottie options={defaultOptions} height={400} width={400} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <CssBaseline />
            <div style={{ padding: '1em' }}>{renderedForm}</div>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Login
