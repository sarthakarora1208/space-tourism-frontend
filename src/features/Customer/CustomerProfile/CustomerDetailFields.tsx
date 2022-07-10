import React from "react";
import { Typography, Stack } from "@mui/material";

interface ICustomerDetailFieldsProps {
  fieldName: string;
  value: string;
}

export const CustomerDetailFields: React.FC<ICustomerDetailFieldsProps> = ({
  fieldName,
  value,
}) => {
  return (
    <Stack direction="row" flexWrap="wrap">
      <Typography
        variant="body2"
        mr="4px"
        fontWeight={500}
      >{`${fieldName}: `}</Typography>
      <Typography variant="body2">{value}</Typography>
    </Stack>
  );
};
