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
  PHONE_NUMBER_REQUIRED,
  PHONE_NUMBER_INVALID,
  PHONE_NUMBER_TOO_SHORT,
  PHONE_NUMBER_TOO_LONG,
  USERNAME_REQUIRED,
  USERNAME_INVALID,
  USERNAME_TOO_LONG,
  USERNAME_TOO_SHORT,
  GENDER_REQUIRED,
  ADDRESS_REQUIRED,
  STATE_REQUIRED,
  CITY_REQUIRED,
  POSTAL_CODE_INVALID,
  POSTAL_CODE_REQUIRED,
  COUNTRY_REQUIRED,
} from '../../../constants/formMessages'
import { GENDER } from '../../../constants/gender'

import { USER_ROLE } from '../../../constants/userRoles'
import { VendorRegisterForm } from './VendorRegisterForm'
import { AppThunk } from '../../../app/store'
import { registerVendor } from '../../../slices/authSlice'

interface IDispatchProps {
  registerVendor: (
    name: string,
    email: string,
    username: string,
    phone: string,
    gender: GENDER,
    address: string,
    state: string,
    city: string,
    postalCode: string,
    dob: Date,
    country: string,
    password: string,
    navigate: NavigateFunction
  ) => AppThunk
}

export interface EnhancedVendorRegisterFormValues {
  name: string
  email: string
  username: string
  phone: string
  gender: GENDER
  address: string
  state: string
  city: string
  postalCode: string
  password: string
  passwordConfirmation: string
  role: USER_ROLE
  dob: Date
  country: string
}

export interface EnhancedVendorRegisterFormProps {
  name?: string
  email?: string
  username?: string
  phone?: string
  gender?: GENDER
  address?: string
  state?: string
  city?: string
  postalCode?: string
  dob?: Date
  country?: string
  navigate: NavigateFunction
  registerVendor: (
    name: string,
    email: string,
    username: string,
    phone: string,
    gender: GENDER,
    address: string,
    state: string,
    city: string,
    postalCode: string,
    dob: Date,
    country: string,
    password: string,
    navigate: NavigateFunction
  ) => void
}

const EnhancedVendorRegisterForm = withFormik<
  EnhancedVendorRegisterFormProps,
  EnhancedVendorRegisterFormValues
>({
  mapPropsToValues: (props) => ({
    name: props.name ? props.name : 'Richard Branson',
    email: props.email ? props.email : '',
    username: props.username ? props.username : 'Virgin Galactic',
    phone: props.phone ? props.phone : '+465724249138',
    gender: props.gender ? props.gender : 0,
    address: props.address ? props.address : 'Kamperhoug 63',
    state: props.state ? props.state : 'Region Midtjylland',
    city: props.city ? props.city : 'Risskov',
    postalCode: props.postalCode ? props.postalCode : '8229',
    password: '12345678',
    passwordConfirmation: '12345678',
    role: USER_ROLE.VENDOR,
    dob: new Date(),
    country: props.country ? props.country : '',
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required(NAME_REQUIRED),
    email: Yup.string()
      .min(3, EMAIL_NOT_LONG_ENOUGH)
      .max(255)
      .email(EMAIL_INVALID)
      .required(EMAIL_REQUIRED),
    country: Yup.string().required(COUNTRY_REQUIRED),
    username: Yup.string()
      .required(USERNAME_REQUIRED)
      .min(3, USERNAME_TOO_SHORT)
      .max(20, USERNAME_TOO_LONG),
    phone: Yup.string().required(PHONE_NUMBER_REQUIRED),
    gender: Yup.number().required(GENDER_REQUIRED),
    address: Yup.string().required(ADDRESS_REQUIRED),
    state: Yup.string().required(STATE_REQUIRED),
    city: Yup.string().required(CITY_REQUIRED),
    postalCode: Yup.string().required(POSTAL_CODE_REQUIRED),
    password: Yup.string()
      .required(PASSWORD_REQUIRED)
      .min(6, PASSWORD_TOO_SHORT),
    passwordConfirmation: Yup.string()
      .required(CONFIRM_PASSWORD_REQUIRED)
      .oneOf([Yup.ref('password')], PASSWORDS_MUST_MATCH),
    dob: Yup.date().required('Date of birth is required'),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { registerVendor, navigate } = props
    const {
      name,
      email,
      username,
      phone,
      gender,
      address,
      state,
      city,
      postalCode,
      password,
      dob,
      country,
    } = values

    registerVendor(
      name,
      email,
      username,
      phone,
      gender,
      address,
      state,
      city,
      postalCode,
      dob,
      country,
      password,
      navigate
    )
    setSubmitting(false)
  },
})(VendorRegisterForm)

export default connect<null, IDispatchProps>(null, { registerVendor })(
  EnhancedVendorRegisterForm
)
