import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ListItemIcon,
  ListItem,
  List,
  ListItemText,
  Box,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { shallowEqual, useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { RootState } from "../../app/rootReducer";
import { LogoutDialog } from "../Auth/LogoutDialog";
import { vendorRoutes } from "./MenuRoutes/vendorRoutes";
import { customerRoutes } from "./MenuRoutes/customerRoutes";
import { USER_ROLE } from "../../constants/userRoles";

import { CUSTOMER_DASHBOARD, VENDOR_DASHBOARD } from "../../constants/routes";
import styles from "../../assets/jss/components/DashboardLayoutStyles/DrawerStyles";

interface INavigatorProps {}

export const Navigator: React.FC<INavigatorProps> = () => {
  const { pathname } = useLocation();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const { user, role } = useSelector((state: RootState) => {
    return {
      user: state.auth.user,
      role: state.auth.role,
    };
  }, shallowEqual);

  let homeLink;
  let routes = customerRoutes;

  if (role === USER_ROLE.CUSTOMER) {
    homeLink = CUSTOMER_DASHBOARD;
    routes = customerRoutes;
  } else if (role === USER_ROLE.VENDOR) {
    homeLink = VENDOR_DASHBOARD;
    routes = vendorRoutes;
  }

  return (
    <Box sx={styles.root}>
      <List>
        {routes.map(({ id, children }) => (
          <React.Fragment key={id}>
            {children.map(({ id: childId, icon, route }) => (
              <Link
                key={childId}
                to={route}
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                <ListItem
                  sx={{
                    ...styles.listItem,
                    ...(pathname.includes(route) && styles.itemActiveLink),
                  }}
                  button
                >
                  <ListItemIcon
                    sx={{
                      ...styles.icon,
                      ...(pathname.includes(route) && styles.itemActiveIcon),
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      sx={{
                        ...(pathname.includes(route) && styles.itemActiveTitle),
                      }}
                      variant="body1"
                    >
                      {childId}
                    </Typography>
                  </ListItemText>
                </ListItem>
              </Link>
            ))}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};
