import { withFormik } from 'formik'
import { connect } from 'react-redux'
import { NavigateFunction } from 'react-router-dom'
import * as Yup from 'yup'

import { AppThunk } from '../../../../app/store'

import { BookSpaceServiceForm } from './BookSpaceServiceForm'

interface IDispatchProps {}

export interface EnhancedBookSpaceServiceFormValues {
  date: Date
  startTime: Date
  endTime: Date
}

export interface EnhancedBookSpaceServiceFormProps {
  date?: Date
  startTime?: Date
  endTime?: Date
  navigate: NavigateFunction
}

const EnhancedBookSpaceServiceForm = withFormik<
  EnhancedBookSpaceServiceFormProps,
  EnhancedBookSpaceServiceFormValues
>({
  mapPropsToValues: (props) => ({
    date: props.date ? new Date(props.date) : new Date(),
    startTime: props.startTime ? new Date(props.startTime) : new Date(),
    endTime: props.endTime ? new Date(props.endTime) : new Date(),
  }),
  validationSchema: Yup.object().shape({
    date: Yup.date().required('Date is required'),
    startTime: Yup.date().required('Start Time is required'),
    endTime: Yup.date()
      .required('End Time is required')
      .min(Yup.ref('startTime'), 'End Time must be after Start Time'),
    amount: Yup.number().min(0, 'Minimum amount is 0'),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { navigate } = props
    const { date, endTime, startTime } = values

    startTime.setDate(date.getDate())
    startTime.setFullYear(date.getFullYear())
    startTime.setMonth(date.getMonth())
    endTime.setDate(date.getDate())
    endTime.setFullYear(date.getFullYear())
    endTime.setMonth(date.getMonth())

    setSubmitting(false)
  },
  displayName: 'BookService Form',
})(BookSpaceServiceForm)

export default connect<null, IDispatchProps>(
  null,
  {}
)(EnhancedBookSpaceServiceForm)
