import React, { useState } from "react";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../app/rootReducer";

interface ICancellationFormProps {}

export const CancellationForm: React.FC<
  ICancellationFormProps & FormikProps<any>
> = props => {
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
  } = props;

  const { orderLoading } = useSelector((state: RootState) => {
    return {
      orderLoading: state.auth.loading,
    };
  }, shallowEqual);

  const handleCancelFormSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={handleCancelFormSubmit}>
      <FormControl fullWidth>
        <Stack spacing={1.5}>
          <Typography component="legend" variant="body2" fontWeight="500">
            Reason for Cancellation
          </Typography>
          <Typography variant="body2">
            You will be partially refunded the amount of the order.
          </Typography>

          <Select
            size="small"
            id="demo-simple-select"
            value={values.cancellationReason}
            name="cancellationReason"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="Sick">Sick</MenuItem>
            <MenuItem value="Emergency">Emergency</MenuItem>
            <MenuItem value="No transport">No transport</MenuItem>
            <MenuItem value="No Longer">No Longer Needed</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
          <TextField
            size="small"
            id="outlined-textarea"
            placeholder="Reason for Cancellation"
            multiline
            rows={4}
            maxRows={6}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.cancellationComment}
            name="cancellationComment"
            error={
              (touched.cancellationComment &&
                errors.cancellationComment) as boolean
            }
            helperText={errors.cancellationComment}
          />
        </Stack>
      </FormControl>
      <FormControl sx={{ marginY: 2, float: "right" }}>
        <Button
          variant="text"
          color="success"
          type="submit"
          disabled={orderLoading}
        >
          Confirm
        </Button>
      </FormControl>
    </form>
  );
};
