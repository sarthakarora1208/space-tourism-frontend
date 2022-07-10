import React from "react";
import { Typography, Stack } from "@mui/material";

interface IVendorDetailFieldsProps {
  fieldName: string | undefined;
  value: string | undefined;
}

export const VendorDetailFields: React.FC<IVendorDetailFieldsProps> = ({
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
