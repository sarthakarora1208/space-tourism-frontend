import React from "react";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";
import { shallowEqual, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../app/rootReducer";
import { EnhancedEnterEmailFormValues } from "./EnhancedEnterEmailForm";
import styles from "../../../assets/jss/components/FormStyles/formStyles";
import { LOGIN } from "../../../constants/routes";

interface IEnterEmailFormProps {}

export const EnterEmailForm: React.FC<
  IEnterEmailFormProps & FormikProps<EnhancedEnterEmailFormValues>
> = props => {
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    props;

  const { authLoading } = useSelector((state: RootState) => {
    return {
      authLoading: state.auth.loading,
    };
  }, shallowEqual);

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit();
  };

  const navigate = useNavigate();
  return (
    <div>
      <div style={{ margin: "0px 0px 22px" }}>
        <Typography variant="body1" sx={styles.headingText}>
          FORGOT PASSWORD
        </Typography>
        <Typography variant="h4" sx={styles.headingText}>
          Account Recovery
        </Typography>
        <Typography variant="body1" sx={styles.headingText}>
          Enter your email, to recover your account.
        </Typography>
      </div>
      <form onSubmit={handleFormSubmit}>
        <FormControl required sx={styles.formControl}>
          <Typography variant="body2" sx={styles.label}>
            Enter your email
          </Typography>
          <TextField
            id="emailAddress"
            placeholder=""
            type="email"
            name="email"
            variant="outlined"
            size="small"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={(errors.email && touched.email) as boolean}
            helperText={errors.email && touched.email && errors.email}
            InputLabelProps={{
              sx: {
                root: styles.heading,
                focused: styles.cssFocused,
              },
            }}
          />
        </FormControl>
        <FormControl required sx={styles.formControl}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item md={6} xs={12} sx={styles.fontGridColumn}>
              <Typography
                variant="body2"
                sx={styles.link}
                onClick={() => navigate(LOGIN)}
              >
                Login instead?
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <Button
                sx={styles.formControl}
                variant="contained"
                color="primary"
                type="submit"
                disabled={authLoading}
              >
                Reset Password
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </div>
  );
};
