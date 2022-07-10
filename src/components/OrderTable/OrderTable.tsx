// React
import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

// Material UI Components
import {
  Box,
  Tab,
  TableContainer,
  Typography,
  Table,
  useTheme,
  useMediaQuery,
} from "@mui/material";

// Material UI Lab
import { TabPanel, TabContext, TabList } from "@mui/lab";

// Components
import OrderTableBody from "./OrderTableBody";
import OrderTableHead from "./OrderTableHead";
import MobileView from "./MobileView";
import { Order } from "../../constants/models/Order";
import { RootState } from "../../app/rootReducer";

interface ITableComponentProps {
  tableFor: string;
}

const OrderTable: React.FC<ITableComponentProps> = ({ tableFor }) => {
  const { ongoingOrders, cancelledOrders, completedOrders } = useSelector(
    (state: RootState) => state.order,
    shallowEqual
  );

  // useEffect(() => {}, [
  //   ongoingOrders.length,
  //   cancelledOrders.length,
  //   completedOrders.length,
  // ]);

  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Ongoing" value="1" />
            <Tab label="Completed" value="2" />
            <Tab label="Cancelled" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ paddingX: 0 }}>
          {ongoingOrders.length === 0 ? (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body1" fontWeight="500">
                No Ongoing Orders
              </Typography>
            </Box>
          ) : (
            <div>
              {!matches ? (
                <MobileView tableData={ongoingOrders} tableFor={tableFor} />
              ) : (
                <TableContainer>
                  <Table stickyHeader aria-label="simple table">
                    <OrderTableHead tableFor={tableFor} />
                    <OrderTableBody
                      tableFor={tableFor}
                      orders={ongoingOrders}
                    />
                  </Table>
                </TableContainer>
              )}
            </div>
          )}
        </TabPanel>
        <TabPanel value="2" sx={{ paddingX: 0 }}>
          {completedOrders.length === 0 ? (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body1" fontWeight="500">
                No Completed Orders
              </Typography>
            </Box>
          ) : (
            <div>
              {!matches ? (
                <MobileView tableData={completedOrders} tableFor={tableFor} />
              ) : (
                <TableContainer>
                  <Table stickyHeader aria-label="simple table">
                    <OrderTableHead tableFor={tableFor} />
                    <OrderTableBody
                      tableFor={tableFor}
                      orders={completedOrders}
                    />
                  </Table>
                </TableContainer>
              )}
            </div>
          )}
        </TabPanel>
        <TabPanel value="3" sx={{ paddingX: 0 }}>
          {cancelledOrders.length === 0 ? (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body1" fontWeight="500">
                No Cancelled Orders
              </Typography>
            </Box>
          ) : (
            <div>
              {!matches ? (
                <MobileView tableData={cancelledOrders} tableFor={tableFor} />
              ) : (
                <TableContainer>
                  <Table stickyHeader aria-label="simple table">
                    <OrderTableHead tableFor={tableFor} />
                    <OrderTableBody
                      tableFor={tableFor}
                      orders={cancelledOrders}
                    />
                  </Table>
                </TableContainer>
              )}
            </div>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default OrderTable;
