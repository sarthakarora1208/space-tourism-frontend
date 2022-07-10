import React, { useState } from "react";

import Dialog from "../../Dialog/Dialog";
import EnhancedReplyReviewForm from "./EnhancedReplyReviewForm";

interface IReplyReviewDialogProps {
  handleConfirm: any;
  handleClose: any;
  isOpen: boolean;
}

export const ReplyReviewDialog: React.FC<IReplyReviewDialogProps> = ({
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
      title="Reply to Review"
    >
      <EnhancedReplyReviewForm handleClose={handleClose} />
    </Dialog>
  );
};
