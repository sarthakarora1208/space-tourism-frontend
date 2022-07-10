import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  TextField,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
import { useSelector, shallowEqual } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FormikProps } from "formik";
import styles from "../../../assets/jss/components/FormStyles/formStyles";
import { EnhancedLoginFormValues } from "./EnhancedLoginForm";
import {
  CUSTOMER_REGISTER,
  CUSTOMER_SERVICES,
  FORGOT_PASSWORD,
  REGISTER,
  VENDOR_ORDERS,
} from "../../../constants/routes";
import { USER_ROLE } from "../../../constants/userRoles";
import { RootState } from "../../../app/rootReducer";

interface IFormProps {}

export const LoginForm: React.FC<
  IFormProps & FormikProps<EnhancedLoginFormValues>
> = props => {
  const navigate = useNavigate();
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    props;

  const { role, authLoading } = useSelector((state: RootState) => {
    return {
      role: state.auth.role,
      authLoading: state.auth.loading,
    };
  }, shallowEqual);

  const handleLoginSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit();
    // if (role === USER_ROLE.CUSTOMER) {
    //   navigate(CUSTOMER_SERVICES);
    // } else if (role === USER_ROLE.VENDOR) {
    //   navigate(VENDOR_ORDERS);
    // }
  };
  return (
    <div>
      <div style={{ margin: "0px 0px 32px" }}>
        <Typography variant="body1" sx={styles.loginText}>
          LOGIN
        </Typography>
        <Typography variant="h4" sx={styles.welcomeBackText}>
          Welcome Back
        </Typography>
        <Typography variant="body1" sx={styles.loginText}>
          Login to manage your account
        </Typography>
      </div>

      <form onSubmit={handleLoginSubmit}>
        <FormControl required sx={styles.formControl}>
          <Typography variant="subtitle1" sx={styles.label}>
            Enter your email
          </Typography>
          <TextField
            id="emailAddress"
            placeholder="Enter email address"
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

        <br />
        <FormControl required sx={styles.formControl}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="subtitle1" sx={styles.label}>
                Enter your password
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle2"
                // sx={styles.label}
                sx={styles.link}
              >
                <Link to={FORGOT_PASSWORD}>Forgot your password?</Link>
              </Typography>
            </Grid>
          </Grid>
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
        <br />
        <FormControl sx={styles.formControl}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Stack direction="row" spacing={1}>
                <Typography variant="subtitle2">
                  Do not have an account yet?
                </Typography>
                <Link to={CUSTOMER_REGISTER}>
                  <Typography variant="subtitle2" sx={styles.link}>
                    Sign up
                  </Typography>
                </Link>
              </Stack>
            </Grid>
            <Grid item>
              <Button
                sx={styles.secondaryButton}
                variant="contained"
                color="primary"
                type="submit"
                disabled={authLoading}
                // fullWidth
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </form>
    </div>
  );
};
