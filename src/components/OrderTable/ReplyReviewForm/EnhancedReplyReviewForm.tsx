import { withFormik } from 'formik'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { ReplyReviewForm } from './ReplyReviewForm'
import { addReply } from '../../../slices/orderSlice'
import { AppThunk } from '../../../app/store'

interface IDispatchProps {
  addReply: (reply: string) => AppThunk
}

export interface EnhancedReplyReviewFormValues {
  replyText: string
}

export interface EnhancedReplyReviewFormProps {
  replyText?: string
  handleClose: () => void
  addReply: (reply: string) => void
}

const EnhancedReplyReviewForm = withFormik<
  EnhancedReplyReviewFormProps,
  EnhancedReplyReviewFormValues
>({
  mapPropsToValues: (props) => ({
    replyText: props.replyText ? props.replyText : '',
  }),
  validationSchema: Yup.object().shape({
    replyText: Yup.string().required('Required field'),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    console.log(`On submit of the form ${values.replyText}`)
    const { handleClose, addReply } = props
    addReply(values.replyText)
    handleClose()
    setSubmitting(false)
  },
  enableReinitialize: true,
  displayName: 'ReplyReview',
})(ReplyReviewForm)

export default connect<null, IDispatchProps>(null, { addReply })(
  EnhancedReplyReviewForm
)
