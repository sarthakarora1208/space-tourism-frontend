import { withFormik } from 'formik'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { NavigateFunction } from 'react-router-dom'
import { AppThunk } from '../../../app/store'

import {
  EMAIL_INVALID,
  EMAIL_REQUIRED,
  EMAIL_NOT_LONG_ENOUGH,
} from '../../../constants/formMessages'
import { EnterEmailForm } from './EnterEmailForm'
import { forgotPassword } from '../../../slices/authSlice'
// import forgotPassword from auth slice

interface IDispatchProps {
  forgotPassword: (email: string, navigate: NavigateFunction) => AppThunk
}

export interface EnhancedEnterEmailFormValues {
  email: string
}

export interface EnhancedEnterEmailFormProps {
  email?: string
  navigate: NavigateFunction
  forgotPassword: (email: string, navigate: NavigateFunction) => void
}

const EnhancedEnterEmailForm = withFormik<
  EnhancedEnterEmailFormProps,
  EnhancedEnterEmailFormValues
>({
  mapPropsToValues: (props) => ({
    email: props.email ? props.email : '',
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .min(3, EMAIL_NOT_LONG_ENOUGH)
      .max(255)
      .email(EMAIL_INVALID)
      .required(EMAIL_REQUIRED),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { navigate, forgotPassword } = props
    const { email } = values

    console.log('forgot password email: ', email)
    forgotPassword(email, navigate)
    setSubmitting(false)
  },
  displayName: 'Basic Form',
})(EnterEmailForm)

export default connect<null, IDispatchProps>(null, {
  forgotPassword,
})(EnhancedEnterEmailForm)
