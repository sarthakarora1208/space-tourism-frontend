import * as React from "react";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f8fafc",
  },
}));
