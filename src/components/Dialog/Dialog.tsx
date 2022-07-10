import React, { ReactNode } from "react";
import {
  Dialog as MuiDialog,
  Box,
  Divider,
  DialogContent,
  DialogTitle,
  DialogActions,
  Breakpoint,
} from "@mui/material";

// style
import styles from "../../assets/jss/components/dialogStyles";

interface IDialogProps {
  open: boolean;
  children: ReactNode;
  handleClose: any;
  title?: string | undefined;
  action?: ReactNode | undefined;
  maxWidth?: false | Breakpoint | undefined;
}

const Dialog: React.FC<IDialogProps> = ({
  open,
  children,
  handleClose,
  title,
  action,
  maxWidth,
}) => (
  <MuiDialog
    open={open}
    maxWidth={maxWidth}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    {title && <DialogTitle>{title}</DialogTitle>}
    <Divider />
    <DialogContent sx={styles.root}>{children}</DialogContent>
    {action && (
      <Box sx={styles.actionArea}>
        <DialogActions>{action}</DialogActions>
      </Box>
    )}
  </MuiDialog>
);

export default Dialog;

Dialog.defaultProps = {
  title: undefined,
  action: undefined,
  maxWidth: "md",
};
