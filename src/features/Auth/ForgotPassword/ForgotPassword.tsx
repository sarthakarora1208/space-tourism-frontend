import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, CssBaseline, Grid, Hidden } from '@mui/material'
import EnhancedForgotPasswordForm from './EnhancedForgotPasswordForm'
import EnhancedEnterEmailForm from './EnhancedEnterEmailForm'
import { RootState } from '../../../app/rootReducer'
import { setStep } from '../../../slices/authSlice'

interface IForgotPasswordProps {}

const ForgotPassword: React.FC<IForgotPasswordProps> = () => {
  const dispatch = useDispatch()

  const { step, email } = useSelector((state: RootState) => {
    return {
      step: state.auth.forgotPasswordStep,
      email: state.auth.email,
    }
  }, shallowEqual)

  const navigate = useNavigate()
  let renderedForm

  // = (
  //   <EnhancedEnterEmailForm email="noauth@gmail.com" navigate={navigate} />
  // );

  // switch (step) {
  //   case 0:
  //     renderedForm = <EnhancedEnterEmailForm />;
  //     break;
  //   case 1:
  //     renderedForm = <EnhancedForgotPasswordForm />;
  //     break;
  //   default:
  //     renderedForm = <EnhancedEnterEmailForm />;
  // }
  if (step === 0) {
    renderedForm = <EnhancedEnterEmailForm navigate={navigate} />
  } else if (step === 1) {
    renderedForm = <EnhancedForgotPasswordForm navigate={navigate} />
  }
  useEffect(() => {
    if (step === 1 && email !== '') {
      dispatch(setStep(0))
    }
  }, [])

  return (
    <div style={{ paddingTop: '20vh' }}>
      <Container
        style={{ paddingLeft: '0.4em', paddingRight: '0.4em', height: '80vh' }}
      >
        <Grid
          container
          direction='row'
          justifyContent='flex-start'
          alignItems='flex-start'
        >
          <Grid item xs={12} md={6}>
            <CssBaseline />
            <div style={{ padding: '1em' }}>{renderedForm}</div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Hidden smDown>
              <div style={{ marginLeft: '3.5em' }}>
                {/* <img src={GRAPHIC} style={{ maxHeight: 450 }} alt='fp-1' /> */}
              </div>
            </Hidden>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default ForgotPassword
