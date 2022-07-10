import { withFormik } from 'formik'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { cancelOrder } from '../../../slices/orderSlice'
import { AppThunk } from '../../../app/store'
import { CancellationForm } from './CancellationForm'

interface IDispatchProps {
  cancelOrder: (
    cancellationComment: string,
    cancellationReason: string
  ) => AppThunk
}

export interface EnhancedCancellationFormValues {
  cancellationComment: string
  cancellationReason: string
}

export interface EnhancedCancellationFormProps {
  cancellationComment?: string
  cancellationReason?: string
  handleClose: () => void
  cancelOrder: (cancellationComment: string, cancellationReason: string) => void
}

const EnhancedCancellationForm = withFormik<
  EnhancedCancellationFormProps,
  EnhancedCancellationFormValues
>({
  mapPropsToValues: (props) => ({
    cancellationComment: props.cancellationComment
      ? props.cancellationComment
      : '',
    cancellationReason: props.cancellationReason
      ? props.cancellationReason
      : '',
  }),
  validationSchema: Yup.object().shape({
    cancellationComment: Yup.string().required('Required field'),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    console.log(`On submit of the form ${values.cancellationReason}`)
    const { handleClose, cancelOrder } = props
    handleClose()
    cancelOrder(values.cancellationComment, values.cancellationReason)
    setSubmitting(false)
  },
  displayName: 'CancellationForm',
})(CancellationForm)

export default connect<null, IDispatchProps>(null, { cancelOrder })(
  EnhancedCancellationForm
)
