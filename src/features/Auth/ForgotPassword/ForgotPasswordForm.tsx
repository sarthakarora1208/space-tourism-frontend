import React from "react";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import {} from "react-router-dom";
import { FormikProps } from "formik";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../app/rootReducer";
import { LOGIN } from "../../../constants/routes";
import { EnhancedForgotPasswordFormValues } from "./EnhancedForgotPasswordForm";
import styles from "../../../assets/jss/components/FormStyles/formStyles";

interface IForgotPasswordFormProps {}

export const ForgotPasswordForm: React.FC<
  IForgotPasswordFormProps & FormikProps<EnhancedForgotPasswordFormValues>
> = props => {
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    props;
  const { authLoading, email } = useSelector((state: RootState) => {
    return {
      authLoading: state.auth.loading,
      email: state.auth.email,
    };
  }, shallowEqual);

  // const email = "noauthset@gmail.com";

  return (
    <div>
      <div style={{ margin: "0px 0px 22px" }}>
        <Typography variant="body1" sx={styles.label}>
          UPDATE PASSWORD
        </Typography>
        <Typography variant="h4" sx={styles.label}>
          Set New Password
        </Typography>
        <Typography variant="body1" sx={styles.label}>
          We&apos;ve sent a code to{" "}
          <span style={{ color: "green" }}>{email}</span>. Please enter the code
          to change your current password.
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <FormControl required sx={styles.formControl}>
          <Typography variant="body2" sx={styles.label}>
            Enter verification code
          </Typography>
          <TextField
            type="text"
            placeholder="123456"
            name="code"
            size="small"
            variant="outlined"
            value={values.code}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(errors.code && touched.code) as boolean}
            helperText={errors.code && touched.code && errors.code}
            InputLabelProps={{
              sx: {
                root: styles.heading,
                focused: styles.cssFocused,
              },
            }}
          />
        </FormControl>
        <FormControl required sx={styles.formControl}>
          <Typography variant="body2" sx={styles.label}>
            Enter your password
          </Typography>
          <TextField
            id="password"
            placeholder="Enter Password"
            type="password"
            name="password"
            variant="outlined"
            size="small"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="off"
            error={(errors.password && touched.password) as boolean}
            helperText={errors.password && touched.password && errors.password}
            InputLabelProps={{
              sx: {
                root: styles.heading,
                focused: styles.cssFocused,
              },
            }}
          />
        </FormControl>
        <FormControl sx={styles.formControl}>
          <Typography variant="body2" sx={styles.label}>
            Re-enter your password
          </Typography>
          <TextField
            placeholder="Re-enter password"
            type="password"
            variant="outlined"
            size="small"
            name="passwordConfirmation"
            value={values.passwordConfirmation}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              (errors.passwordConfirmation &&
                touched.passwordConfirmation) as boolean
            }
            autoComplete="off"
            helperText={
              errors.passwordConfirmation &&
              touched.passwordConfirmation &&
              errors.passwordConfirmation
            }
            InputLabelProps={{
              sx: {
                root: styles.heading,
                focused: styles.cssFocused,
              },
            }}
          />
        </FormControl>
        <Button
          sx={styles.button}
          variant="contained"
          color="primary"
          type="submit"
          disabled={authLoading}
          //fullWidth
        >
          Update password
        </Button>
      </form>
    </div>
  );
};
