import React, { useState } from "react";
import Dialog from "../../Dialog/Dialog";
import EnhancedAddReviewForm from "./EnhancedAddReviewForm";

interface IAddReviewDialogProps {
  handleConfirm: any;
  handleClose: any;
  isOpen: boolean;
}

export const AddReviewDialog: React.FC<IAddReviewDialogProps> = ({
  handleConfirm,
  handleClose,
  isOpen,
}) => {
  return (
    <Dialog
      maxWidth="xl"
      open={isOpen}
      handleClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      title="Add Review"
    >
      <EnhancedAddReviewForm handleClose={handleClose} />
    </Dialog>
  );
};
