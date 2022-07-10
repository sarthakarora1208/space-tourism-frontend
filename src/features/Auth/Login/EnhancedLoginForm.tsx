import { withFormik } from 'formik'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { History } from 'history'
import { NavigateFunction } from 'react-router-dom'
import { AppThunk } from '../../../app/store'
import {
  CONFIRM_PASSWORD_REQUIRED,
  EMAIL_REQUIRED,
  PASSWORD_REQUIRED,
  PASSWORD_TOO_SHORT,
  EMAIL_NOT_LONG_ENOUGH,
  EMAIL_INVALID,
} from '../../../constants/formMessages'
import { login } from '../../../slices/authSlice'
import { LoginForm } from './LoginForm'

interface IDispatchProps {
  login: (
    email: string,
    password: string,
    navigate: NavigateFunction
  ) => AppThunk
}

export interface EnhancedLoginFormValues {
  email: string
  password: string
}

export interface EnhancedLoginFormProps {
  email?: string
  password?: string
  navigate: NavigateFunction
  login: (email: string, password: string, navigate: NavigateFunction) => void
}
const EnhancedLoginForm = withFormik<
  EnhancedLoginFormProps,
  EnhancedLoginFormValues
>({
  mapPropsToValues: (props) => ({
    email: props.email ? props.email : 'lilodi9648@meidir.com',
    password: props.password ? props.password : '12345678',
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .min(3, EMAIL_NOT_LONG_ENOUGH)
      .max(255)
      .email(EMAIL_INVALID)
      .required(EMAIL_REQUIRED),
    password: Yup.string()
      .required(PASSWORD_REQUIRED)
      .min(6, PASSWORD_TOO_SHORT),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { login, navigate } = props
    const { email, password } = values
    login(email, password, navigate)
    setSubmitting(false)
  },
  displayName: 'BasicForm',
})(LoginForm)

export default connect<null, IDispatchProps>(null, { login })(EnhancedLoginForm)
