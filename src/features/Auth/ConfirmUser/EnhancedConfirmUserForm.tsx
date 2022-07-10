import { withFormik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { NavigateFunction } from 'react-router-dom'

import { AppThunk } from '../../../app/store'
import { ConfirmUserForm } from './ConfirmUserForm'
import { INVALID_PATTERN } from '../../../constants/formMessages'
import { confirmUser } from '../../../slices/authSlice'

interface IDispatchProps {
  confirmUser: (code: string, navigate: NavigateFunction) => AppThunk
}

export interface EnhancedConfirmUserFormValues {
  code: string
}

export interface EnhancedConfirmUserFormProps {
  code?: string
  navigate: NavigateFunction
  confirmUser: (code: string, navigate: NavigateFunction) => void
}

const EnhancedConfirmUserForm = withFormik<
  EnhancedConfirmUserFormProps,
  EnhancedConfirmUserFormValues
>({
  mapPropsToValues: () => ({
    code: '',
  }),
  validationSchema: Yup.object().shape({
    code: Yup.string()
      .matches(/([0-9]){6}/gi, INVALID_PATTERN)
      .length(6, INVALID_PATTERN),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { confirmUser, navigate } = props
    const { code } = values
    confirmUser(code, navigate)
  },
  displayName: 'BasicForm',
})(ConfirmUserForm)

export default connect<null, IDispatchProps>(null, { confirmUser })(
  EnhancedConfirmUserForm
)
