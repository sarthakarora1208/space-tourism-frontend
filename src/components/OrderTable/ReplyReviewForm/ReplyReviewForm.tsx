import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { FormikProps } from "formik";
import { shallowEqual, useSelector } from "react-redux";
import { EnhancedReplyReviewFormValues } from "./EnhancedReplyReviewForm";
import reviewStyles from "../../../assets/jss/components/reviewStyles";

import { RootState } from "../../../app/rootReducer";

interface IReplyReviewFormProps {}

export const ReplyReviewForm: React.FC<
  IReplyReviewFormProps & FormikProps<EnhancedReplyReviewFormValues>
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

  const { loading, order } = useSelector(
    (state: RootState) => state.order,
    shallowEqual
  );

  const handleAddReviewFormSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit();
  };
  return (
    <>
      <Box sx={reviewStyles.profile}>
        <Avatar
          sx={reviewStyles.avatar}
          variant="rounded"
          alt={order?.user.name}
          src={order?.user.profileImageUrl}
        />
        <Box sx={reviewStyles.profileContainer}>
          <Box sx={reviewStyles.nameContainer}>
            <Typography variant="body1" sx={reviewStyles.username}>
              {order?.user.name}
            </Typography>
            <Typography variant="body2" sx={reviewStyles.date}>
              {format(
                new Date(
                  order && order.review ? order?.review.createdAt : new Date()
                ),
                "dd LLL y"
              )}
            </Typography>
          </Box>

          <Box sx={reviewStyles.ratingContainer}>
            <Rating
              name="review-stars"
              value={order && order.review ? order.review.stars : 0}
              readOnly
              precision={0.5}
            />
            <Typography variant="body2" sx={reviewStyles.serviceName}>
              on {order?.serviceName}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box my={1.5}>
        <Typography variant="body2">
          <em>{order?.review.content}</em>
        </Typography>
      </Box>
      <form onSubmit={handleAddReviewFormSubmit}>
        <FormControl fullWidth>
          <Stack spacing={1.5}>
            {order?.review.reply === "" ? (
              <TextField
                name="replyText"
                size="small"
                id="outlined-textarea"
                placeholder="Reply to this review"
                multiline
                rows={4}
                maxRows={6}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.replyText}
                error={touched.replyText && Boolean(errors.replyText)}
                helperText={errors.replyText}
              />
            ) : (
              <Typography component="legend" variant="body2" fontWeight="500">
                You already replied: <strong>{order?.review.reply}</strong>
              </Typography>
            )}
          </Stack>
        </FormControl>
        {order?.review.reply === "" && (
          <FormControl sx={{ marginY: 2, float: "right" }}>
            <Button
              variant="text"
              color="success"
              type="submit"
              disabled={loading}
            >
              Reply
            </Button>
          </FormControl>
        )}
      </form>
    </>
  );
};
