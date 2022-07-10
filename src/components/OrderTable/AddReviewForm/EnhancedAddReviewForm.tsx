import { withFormik } from 'formik'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { AddReviewForm } from './AddReviewForm'
import { addReview } from '../../../slices/orderSlice'
import { AppThunk } from '../../../app/store'

interface IDispatchProps {
  addReview: (star: number, review: string) => AppThunk
}

export interface EnhancedAddReviewFormValues {
  rating: number
  reviewText: string
}
export interface EnhancedAddReviewFormProps {
  rating?: number
  reviewText?: string
  handleClose: () => void
  addReview: (star: number, review: string) => void
}

const EnhancedAddReviewForm = withFormik<
  EnhancedAddReviewFormProps,
  EnhancedAddReviewFormValues
>({
  mapPropsToValues: (props) => ({
    rating: props.rating ? props.rating : 0,
    reviewText: props.reviewText ? props.reviewText : '',
  }),
  validationSchema: Yup.object().shape({
    rating: Yup.number(),
    reviewText: Yup.string().required('Required field'),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    console.log(`On submit of the form ${values.reviewText}`)
    const { addReview, handleClose } = props
    addReview(values.rating, values.reviewText)

    handleClose()
    setSubmitting(false)
  },

  displayName: 'AddReview',
})(AddReviewForm)

export default connect<null, IDispatchProps>(null, { addReview })(
  EnhancedAddReviewForm
)
