import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Container, CssBaseline, Box } from '@mui/material'
import { shallowEqual, useSelector } from 'react-redux'

import { RootState } from '../../../app/rootReducer'
import EnhancedLoginForm from './EnhancedLoginForm'
import EnhancedUpdatePasswordForm from './EnhancedUpdatePasswordForm'
import { LOGIN } from '../../../constants/routes'

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

  switch (step) {
    case 0:
      renderedForm = <EnhancedLoginForm navigate={navigate} />
      // vendor accounts
      //nflyteteam@gmail.com
      // sarthakarora1208@gmail.com
      // renderedForm = (
      //   <EnhancedLoginForm
      //     email={
      //       customer
      //         ? "sarthakarora1208@gmail.com"
      //         : "sarthakarora1207@gmail.com"
      //     }
      //     password={customer ? "12345678" : "1234567"}
      //     navigate={navigate}
      //   />
      // );

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
    <div style={{ paddingTop: '20vh', background: '#fafafa' }}>
      <Container style={{ padding: '0.4em', height: '80vh' }}>
        <Grid
          container
          direction='row'
          justifyContent='flex-start'
          spacing={4}
          alignItems='flex-start'
        >
          <Grid item xs={12} md={6}>
            <CssBaseline />
            <div style={{ padding: '1em' }}>{renderedForm}</div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: ['none', 'none', 'block'],
              }}
            >
              <div
                style={
                  {
                    // padding: "1em",
                    // marginLeft: "3em",
                    // marginBottom: "2rem",
                  }
                }
              ></div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Login
