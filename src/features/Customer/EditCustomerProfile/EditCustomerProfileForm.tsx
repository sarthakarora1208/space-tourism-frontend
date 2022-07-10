import React from "react";

import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";
import { shallowEqual, useSelector } from "react-redux";
import { GENDER } from "../../../constants/gender";
import { RootState } from "../../../app/rootReducer";
import styles from "../../../assets/jss/components/FormStyles/formStyles";

import { EnhancedEditCustomerProfileFormValues } from "./EnhancedEditCustomerProfileForm";
import { DisplayFormikState } from "../../../components/DisplayFormikState";

interface IEditCustomerProfileFormProps {}

export const EditCustomerProfileForm: React.FC<
  IEditCustomerProfileFormProps &
    FormikProps<EnhancedEditCustomerProfileFormValues>
> = props => {
  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    props;

  const handleEditSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit();
  };

  const { authLoading } = useSelector((state: RootState) => {
    return {
      authLoading: state.auth.loading,
    };
  }, shallowEqual);

  const debug = false;

  return (
    <Box my={3}>
      <form onSubmit={handleEditSubmit}>
        <Grid
          // container
          direction="column"
          justifyContent="center"
          alignItems="start"
        >
          <Grid item md={6} xs={12}>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                Name
              </Typography>
              <TextField
                type="text"
                placeholder="Enter name"
                name="name"
                variant="outlined"
                size="small"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(errors.name && touched.name) as boolean}
                helperText={errors.name && touched.name && errors.name}
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12} sx={styles.fontGridColumn}>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                Gender
              </Typography>
              <Select
                labelId="minor-gender-select-label"
                id="minor-gender-select"
                value={values.gender}
                name="gender"
                size="small"
                onChange={handleChange}
              >
                <MenuItem value={GENDER.MALE}>Male</MenuItem>
                <MenuItem value={GENDER.FEMALE}>Female</MenuItem>
                <MenuItem value={GENDER.PREFER_NOT_TO_SAY}>
                  Prefer not to say
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                Phone Number
              </Typography>
              <TextField
                id="phone"
                placeholder="Enter phone number"
                type="phone"
                name="phone"
                variant="outlined"
                size="small"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(errors.phone && touched.phone) as boolean}
                helperText={errors.phone && touched.phone && errors.phone}
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                Address
              </Typography>
              <TextField
                type="text"
                placeholder="Enter address"
                name="address"
                variant="outlined"
                size="small"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(errors.address && touched.address) as boolean}
                helperText={errors.address && touched.address && errors.address}
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item md={6} xs={12}>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                City
              </Typography>
              <TextField
                type="text"
                placeholder="Enter City"
                name="city"
                variant="outlined"
                size="small"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(errors.city && touched.city) as boolean}
                helperText={errors.city && touched.city && errors.city}
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                Province/State
              </Typography>
              <TextField
                type="text"
                placeholder="Enter State/Province"
                name="state"
                variant="outlined"
                size="small"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(errors.state && touched.state) as boolean}
                helperText={errors.state && touched.state && errors.state}
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl required sx={styles.formControl}>
              <Typography variant="body2" sx={styles.label}>
                Postal Code
              </Typography>
              <TextField
                type="text"
                placeholder="Enter postal code"
                name="postalCode"
                variant="outlined"
                size="small"
                value={values.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(errors.postalCode && touched.postalCode) as boolean}
                helperText={
                  errors.postalCode && touched.postalCode && errors.postalCode
                }
                InputLabelProps={{
                  sx: {
                    root: styles.heading,
                    focused: styles.cssFocused,
                  },
                }}
              />
            </FormControl>
          </Grid>

          <FormControl sx={styles.formControl}>
            <Grid item md={6} xs={12}>
              <Button
                sx={styles.secondaryButton}
                variant="contained"
                color="primary"
                type="submit"
                disabled={authLoading}
                // fullWidth
              >
                Submit
              </Button>
            </Grid>
          </FormControl>
        </Grid>
        {debug ? <DisplayFormikState {...props} /> : ""}
      </form>
    </Box>
  );
};
