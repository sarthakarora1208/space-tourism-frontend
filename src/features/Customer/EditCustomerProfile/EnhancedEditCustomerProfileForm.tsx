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
} from '../../../constants/formMessages'

import { GENDER } from '../../../constants/gender'

import { USER_ROLE } from '../../../constants/userRoles'
import { EditCustomerProfileForm } from './EditCustomerProfileForm'
import { AppThunk } from '../../../app/store'
import { updateCustomer } from '../../../slices/customerSlice'

interface IDispatchProps {
  updateCustomer: (
    name: string,
    phone: string,
    gender: GENDER,
    address: string,
    state: string,
    city: string,
    postalCode: string,
    dob: Date,
    navigate: NavigateFunction
  ) => AppThunk
}

export interface EnhancedEditCustomerProfileFormValues {
  name: string
  phone: string
  gender: GENDER
  address: string
  state: string
  city: string
  postalCode: string
  role: USER_ROLE
  dob: Date
}

export interface EnhancedEditCustomerProfileFormProps {
  name?: string
  email?: string
  phone?: string
  gender?: GENDER
  address?: string
  state?: string
  city?: string
  postalCode?: string
  dob?: Date
  navigate: NavigateFunction
  updateCustomer: (
    name: string,
    phone: string,
    gender: GENDER,
    address: string,
    state: string,
    city: string,
    postalCode: string,
    dob: Date,
    navigate: NavigateFunction
  ) => void
}

const EnhancedEditCustomerProfileForm = withFormik<
  EnhancedEditCustomerProfileFormProps,
  EnhancedEditCustomerProfileFormValues
>({
  mapPropsToValues: (props) => ({
    name: props.name ? props.name : '',
    phone: props.phone ? props.phone : '',
    gender: props.gender ? props.gender : 0,
    address: props.address ? props.address : '',
    state: props.state ? props.state : '',
    city: props.city ? props.city : '',
    postalCode: props.postalCode ? props.postalCode : '',
    role: USER_ROLE.VENDOR,
    dob: new Date(),
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required(NAME_REQUIRED),
    phone: Yup.string().required(PHONE_NUMBER_REQUIRED),
    gender: Yup.number().required(GENDER_REQUIRED),
    address: Yup.string().required(ADDRESS_REQUIRED),
    state: Yup.string().required(STATE_REQUIRED),
    city: Yup.string().required(CITY_REQUIRED),
    postalCode: Yup.string().required(POSTAL_CODE_REQUIRED),
    dob: Yup.date().required('Date of birth is required'),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { navigate, updateCustomer } = props
    const { name, phone, gender, address, state, city, postalCode, dob } =
      values

    updateCustomer(
      name,
      phone,
      gender,
      address,
      state,
      city,
      postalCode,
      dob,
      navigate
    )

    setSubmitting(false)
  },
})(EditCustomerProfileForm)

export default connect<null, IDispatchProps>(null, {
  updateCustomer,
})(EnhancedEditCustomerProfileForm)
