// React
import React from "react";

// Material UI Components
import { TableHead, TableRow, TableCell } from "@mui/material";

// Styles
import tableStyles from "../../assets/jss/components/TableStyles/tableStyles";

// Constants
import {
  ID,
  DATE,
  CUSTOMER,
  VENDOR,
  SERVICE_NAME,
  CONTACT,
  STARTTIME,
  ENDTIME,
  STATUS,
  PRICE,
  REVIEW,
  ONGOING,
  ACTION,
  CANCEL,
  TIMING,
} from "../../constants/table";

interface IOrderTableHeadProps {
  tableFor: string;
}

const OrderTableHead: React.FC<IOrderTableHeadProps> = ({ tableFor }) => {
  return (
    <TableHead sx={tableStyles.tableHead}>
      <TableRow>
        {/* <TableCell sx={tableStyles.tableCellForHead}>{ID}</TableCell> */}
        <TableCell sx={tableStyles.tableCellForHead}>{SERVICE_NAME}</TableCell>
        {tableFor === VENDOR ? (
          <TableCell sx={tableStyles.tableCellForHead}>{CUSTOMER}</TableCell>
        ) : (
          <TableCell sx={tableStyles.tableCellForHead}>{VENDOR}</TableCell>
        )}
        {/* <TableCell sx={tableStyles.tableCellForHead}>{CONTACT}</TableCell> */}
        <TableCell sx={tableStyles.tableCellForHead}>{DATE}</TableCell>
        <TableCell sx={tableStyles.tableCellForHead}>{TIMING}</TableCell>
        <TableCell sx={tableStyles.tableCellForHead}>{STATUS}</TableCell>
        <TableCell sx={tableStyles.tableCellForHead}>{PRICE}</TableCell>
        {/* {orderStatus === ONGOING ? ( */}
        <TableCell sx={tableStyles.tableCellForHead}>{ACTION}</TableCell>
        {/* ) : ( */}
        {/* <TableCell sx={tableStyles.tableCellForHead}>{REVIEW}</TableCell> */}
        {/* )} */}
      </TableRow>
    </TableHead>
  );
};
export default OrderTableHead;
