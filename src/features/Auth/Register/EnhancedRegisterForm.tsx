import { withFormik } from 'formik'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { NavigateFunction } from 'react-router-dom'

import {
  CONFIRM_PASSWORD_REQUIRED,
  EMAIL_INVALID,
  EMAIL_REQUIRED,
  NAME_REQUIRED,
  PASSWORD_REQUIRED,
  PASSWORD_TOO_SHORT,
  PASSWORDS_MUST_MATCH,
  EMAIL_NOT_LONG_ENOUGH,
  GENDER_REQUIRED,
  COUNTRY_REQUIRED,
} from '../../../constants/formMessages'
import { RegisterForm } from './RegisterForm'
import { USER_ROLE } from '../../../constants/userRoles'
import { GENDER } from '../../../constants/gender'
import { AppThunk } from '../../../app/store'
import { registerCustomer } from '../../../slices/authSlice'

interface IDispatchProps {
  registerCustomer: (
    name: string,
    email: string,
    username: string,
    phone: string,
    gender: GENDER,
    dob: Date,
    country: string,
    password: string,
    navigate: NavigateFunction
  ) => AppThunk
}

export interface EnhancedRegisterFormValues {
  email: string
  name: string
  phone: string
  gender: GENDER
  password: string
  passwordConfirmation: string
  role: USER_ROLE
  username: string
  dob: Date
  country: string
}

export interface EnhancedRegisterFormProps {
  email?: string
  name?: string
  phone?: string
  gender?: GENDER
  role?: USER_ROLE
  username?: string
  dob?: Date
  country?: string
  navigate: NavigateFunction
  registerCustomer: (
    name: string,
    email: string,
    username: string,
    phone: string,
    gender: GENDER,
    dob: Date,
    password: string,
    country: string,
    navigate: NavigateFunction
  ) => void
}

const EnhancedRegisterForm = withFormik<
  EnhancedRegisterFormProps,
  EnhancedRegisterFormValues
>({
  mapPropsToValues: (props) => ({
    name: props.name ? props.name : '',
    email: props.email ? props.email : '',
    username: props.username ? props.username : '',
    phone: props.phone ? props.phone : '',
    gender: props.gender ? props.gender : 0,
    country: props.country ? props.country : '',
    password: '',
    passwordConfirmation: '',
    role: USER_ROLE.CUSTOMER,
    dob: new Date(),
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .min(3, EMAIL_NOT_LONG_ENOUGH)
      .max(255)
      .email(EMAIL_INVALID)
      .required(EMAIL_REQUIRED),
    name: Yup.string().required(NAME_REQUIRED),
    country: Yup.string().required(COUNTRY_REQUIRED),
    // username: Yup.string()
    //   .required(USERNAME_REQUIRED)
    //   .min(3, USERNAME_TOO_SHORT)
    //   .max(20, USERNAME_TOO_LONG)
    //   .matches(USERNAME_REGEX, USERNAME_INVALID),
    password: Yup.string()
      .required(PASSWORD_REQUIRED)
      .min(6, PASSWORD_TOO_SHORT),
    passwordConfirmation: Yup.string()
      .required(CONFIRM_PASSWORD_REQUIRED)
      .oneOf([Yup.ref('password')], PASSWORDS_MUST_MATCH),
    //phone: Yup.string().required(PHONE_NUMBER_REQUIRED),
    dob: Yup.date().required('Date of birth is required'),
    gender: Yup.number().required(GENDER_REQUIRED),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { navigate, registerCustomer } = props
    const { email, name, username, password, phone, dob, gender, country } =
      values
    registerCustomer(
      name,
      email,
      username,
      phone,
      gender,
      dob,
      country,
      password,
      navigate
    )
    //console.log("handleSubmit", values);
  },
  displayName: 'Register Form',
})(RegisterForm)

export default connect<null, IDispatchProps>(null, {
  registerCustomer,
})(EnhancedRegisterForm)
