import React, { useState } from "react";
import { Alert, Box, Snackbar } from "@mui/material";
import styles from "../../assets/jss/components/alertTemplateStyles";

interface IMessageProps {
  message: string;
  severity: "error" | "success" | "info";
  handleClose: any;
}

const Message: React.FC<IMessageProps> = ({
  message,
  severity,
  handleClose,
}) => {
  const [open] = useState(true);

  return (
    <Box sx={styles.root}>
      <Snackbar
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={severity} onClose={handleClose} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

interface IAlertTemplateProps {
  options: any;
  message: any;
  close: any;
}

export const AlertTemplate: React.FC<IAlertTemplateProps> = ({
  options,
  message,
  close,
}) => <Message severity={options.type} handleClose={close} message={message} />;
