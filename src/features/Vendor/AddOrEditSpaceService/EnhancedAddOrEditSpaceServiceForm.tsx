import { withFormik } from 'formik'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { NavigateFunction } from 'react-router-dom'
import { AddOrEditSpaceServiceForm } from './AddOrEditSpaceServiceForm'
import { Rate } from '../../../constants/models/Rate'
import { AppThunk } from '../../../app/store'
import {
  createSpaceService,
  updateSpaceService,
} from '../../../slices/spaceServiceSlice'

interface IDispatchProps {
  createSpaceService: (
    name: string,
    description: string,
    seats: number,
    startTime: Date,
    endTime: Date,
    navigate: NavigateFunction
  ) => AppThunk
  updateSpaceService: (
    id: string,
    name: string,
    description: string,
    seats: number,
    startTime: Date,
    endTime: Date,
    navigate: NavigateFunction
  ) => AppThunk
}

export interface EnhancedAddOrEditSpaceServiceFormValues {
  name: string
  description: string
  seats: number
  startTime: Date
  endTime: Date
}

export interface EnhancedAddOrEditSpaceServiceFormProps {
  name?: string
  description?: string
  seats?: number
  startTime?: Date
  endTime?: Date
  id?: string
  isEdit: boolean
  navigate: NavigateFunction
  createSpaceService: (
    name: string,
    description: string,
    seats: number,
    startTime: Date,
    endTime: Date,
    navigate: NavigateFunction
  ) => void
  updateSpaceService: (
    id: string,
    name: string,
    description: string,
    seats: number,
    startTime: Date,
    endTime: Date,
    navigate: NavigateFunction
  ) => void
}

const EnhancedAddOrEditSpaceServiceForm = withFormik<
  EnhancedAddOrEditSpaceServiceFormProps,
  EnhancedAddOrEditSpaceServiceFormValues
>({
  mapPropsToValues: (props) => ({
    name: props.name ? props.name : '',
    description: props.description ? props.description : '',
    seats: props.seats ? props.seats : 0,
    startTime: props.startTime ? props.startTime : new Date(),
    endTime: props.endTime ? props.endTime : new Date(),
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required('Space Service name is required'),
    description: Yup.string().required('Description is required'),
    seats: Yup.number().required('Number of seats is required'),
    startTime: Yup.date().required('Start time is required'),
    endTime: Yup.date()
      .required('End time is required')
      .min(Yup.ref('startTime'), 'End time should be greater than start time'),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { navigate, isEdit, updateSpaceService, createSpaceService } = props
    const { name, description, seats, startTime, endTime } = values
    if (!isEdit) {
      createSpaceService(name, description, seats, startTime, endTime, navigate)
    } else {
      updateSpaceService(
        props.id!,
        name,
        description,
        seats,
        startTime,
        endTime,
        navigate
      )
      setSubmitting(false)
    }
  },
  displayName: 'AddOrEditSpaceServiceForm',
  enableReinitialize: true,
})(AddOrEditSpaceServiceForm)

export default connect<null, IDispatchProps>(null, {
  createSpaceService,
  updateSpaceService,
})(EnhancedAddOrEditSpaceServiceForm)
