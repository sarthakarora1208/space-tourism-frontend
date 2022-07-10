import { withFormik } from 'formik'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { NavigateFunction } from 'react-router-dom'
import { AppThunk } from '../../../app/store'
import {
  CONFIRM_PASSWORD_REQUIRED,
  PASSWORD_REQUIRED,
  PASSWORD_TOO_SHORT,
  PASSWORDS_MUST_MATCH,
  INVALID_PATTERN,
} from '../../../constants/formMessages'

import { forgotPasswordSubmit } from '../../../slices/authSlice'
import { ForgotPasswordForm } from './ForgotPasswordForm'

interface IDispatchProps {
  forgotPasswordSubmit: (
    code: string,
    newPassword: string,
    navigate: NavigateFunction
  ) => AppThunk
}

export interface EnhancedForgotPasswordFormValues {
  code: string
  password: string
  passwordConfirmation: string
}

export interface EnhancedForgotPasswordFormProps {
  code?: string
  password?: string
  passwordConfirmation?: string
  navigate: NavigateFunction

  forgotPasswordSubmit: (
    code: string,
    newPassword: string,
    navigate: NavigateFunction
  ) => void
}

const EnhancedForgotPasswordForm = withFormik<
  EnhancedForgotPasswordFormProps,
  EnhancedForgotPasswordFormValues
>({
  mapPropsToValues: (props) => ({
    code: '',
    password: '',
    passwordConfirmation: '',
  }),
  validationSchema: Yup.object().shape({
    code: Yup.string()
      .matches(/([0-9]){6}/gi, INVALID_PATTERN)
      .length(6, INVALID_PATTERN),
    password: Yup.string()
      .required(PASSWORD_REQUIRED)
      .min(6, PASSWORD_TOO_SHORT),
    passwordConfirmation: Yup.string()
      .required(CONFIRM_PASSWORD_REQUIRED)
      .oneOf([Yup.ref('password')], PASSWORDS_MUST_MATCH),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { navigate, forgotPasswordSubmit } = props
    const { code, password } = values

    console.log('forgot password code: ', code, ' password: ', password)
    // forgotPasswordSubmit(code, password, history);
    forgotPasswordSubmit(code, password, navigate)

    setSubmitting(false)
  },
  displayName: 'BasicForm',
})(ForgotPasswordForm)

export default connect<null, IDispatchProps>(null, { forgotPasswordSubmit })(
  EnhancedForgotPasswordForm
)
