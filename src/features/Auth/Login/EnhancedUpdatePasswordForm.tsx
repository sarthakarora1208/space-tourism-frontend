import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { NavigateFunction } from "react-router-dom";
import { History } from "history";
import { AppThunk } from "../../../app/store";

import {
  CONFIRM_PASSWORD_REQUIRED,
  PASSWORDS_MUST_MATCH,
  PASSWORD_REQUIRED,
  PASSWORD_TOO_SHORT,
} from "../../../constants/formMessages";
import { UpdatePasswordForm } from "./UpdatePasswordForm";
import { updatePassword } from "../../../slices/authSlice";

interface IDispatchProps {
  updatePassword: (newPassword: string, navigate: NavigateFunction) => AppThunk;
}

export interface EnhancedUpdatePasswordFormValues {
  password: string;
  passwordConfirmation?: string;
}

export interface EnhancedUpdatePasswordFormProps {
  password?: string;
  passwordConfirmation?: string;
  navigate: NavigateFunction;
  updatePassword: (newPassword: string, navigate: NavigateFunction) => void;
}

const EnhancedUpdatePasswordForm = withFormik<
  EnhancedUpdatePasswordFormProps,
  EnhancedUpdatePasswordFormValues
>({
  mapPropsToValues: props => ({
    password: "",
    passwordConfirmation: "",
  }),
  validationSchema: Yup.object().shape({
    password: Yup.string()
      .required(PASSWORD_REQUIRED)
      .min(6, PASSWORD_TOO_SHORT),
    passwordConfirmation: Yup.string()
      .required(CONFIRM_PASSWORD_REQUIRED)
      .oneOf([Yup.ref("password")], PASSWORDS_MUST_MATCH),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    const { updatePassword, navigate } = props;
    const { password } = values;
    updatePassword(password, navigate);
  },
  displayName: "BasicForm",
})(UpdatePasswordForm);

export default connect<null, IDispatchProps>(null, { updatePassword })(
  EnhancedUpdatePasswordForm
);
