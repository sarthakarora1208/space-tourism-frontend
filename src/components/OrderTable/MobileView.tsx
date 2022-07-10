// React
import React from "react";

import { Stack } from "@mui/material";

// Collapsible component
import CollapsibleComponent from "./CollapsibleComponent";
import { Order } from "../../constants/models/Order";

interface IMobileViewProps {
  tableData: Order[];
  tableFor: string;
}

// Main Component
const MobileView: React.FC<IMobileViewProps> = ({ tableData, tableFor }) => {
  return (
    <Stack spacing={2}>
      {tableData.map((data: Order) => {
        return (
          <CollapsibleComponent
            order={data}
            tableFor={tableFor}
            key={data.id}
          />
        );
      })}
    </Stack>
  );
};

export default MobileView;
