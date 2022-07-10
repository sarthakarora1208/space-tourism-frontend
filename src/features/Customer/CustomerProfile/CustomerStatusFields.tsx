import React from "react";
import { Typography, Stack, Button, Box } from "@mui/material";

interface ICustomerStatusFieldsProps {
  fieldName: string;
  value: string;
  isActive: boolean;
  buttonValue?: string;
  buttonOnClick?: any;
}

export const CustomerStatusFields: React.FC<ICustomerStatusFieldsProps> = ({
  fieldName,
  value,
  isActive,
  buttonValue,
  buttonOnClick,
}) => {
  return (
    <Stack
      direction="row"
      display="flex"
      justifyContent="space-between"
      flexWrap="wrap"
      alignItems="center"
    >
      <Stack direction="row">
        <Typography
          variant="body2"
          mr="4px"
          fontWeight={500}
        >{`${fieldName}: `}</Typography>
        <Typography color={isActive ? "warning" : "error"} variant="body2">
          {value}
        </Typography>
      </Stack>

      <Box justifySelf="end">
        {!isActive && (
          <Button
            variant="text"
            sx={{
              padding: "0",
            }}
            color="secondary"
            onClick={buttonOnClick}
          >
            {buttonValue}
          </Button>
        )}
      </Box>
    </Stack>
  );
};

CustomerStatusFields.defaultProps = {
  buttonValue: "Connect",
  buttonOnClick: null,
};
