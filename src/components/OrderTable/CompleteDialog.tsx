import React, { useState } from "react";
import {
  Button,
  Stack,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Rating,
  Typography,
} from "@mui/material";
import Dialog from "../Dialog/Dialog";

interface ICompleteDialogProps {
  handleConfirm: any;
  handleClose: any;
  isOpen: boolean;
}

export const CompleteDialog: React.FC<ICompleteDialogProps> = ({
  handleConfirm,
  handleClose,
  isOpen,
}) => {
  return (
    <Dialog
      open={isOpen}
      handleClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      title="Mark as complete"
      action={
        <>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="text" color="success" onClick={handleConfirm}>
            Confirm
          </Button>
        </>
      }
    >
      <Typography variant="body2" mb={2}>
        Are you sure you want to mark the order as complete?
      </Typography>
    </Dialog>
  );
};
