import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Paper,
  BottomNavigation,
  Box,
  Button,
  BottomNavigationAction,
} from "@mui/material";
import { shallowEqual, useSelector } from "react-redux";
import { vendorRoutes } from "./MenuRoutes/vendorRoutes";
import { customerRoutes } from "./MenuRoutes/customerRoutes";
import styles from "../../assets/jss/components/DashboardLayoutStyles/MobileNavigatorStyles";
import { RootState } from "../../app/rootReducer";
import { USER_ROLE } from "../../constants/userRoles";
import { CUSTOMER_DASHBOARD, VENDOR_DASHBOARD } from "../../constants/routes";

export const MobileNavigator = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, role } = useSelector((state: RootState) => {
    return {
      user: state.auth.user,
      role: state.auth.role,
    };
  }, shallowEqual);

  let homeLink;
  let routes = customerRoutes;

  if (role === USER_ROLE.CUSTOMER) {
    homeLink = VENDOR_DASHBOARD;
    routes = customerRoutes;
  } else if (role === USER_ROLE.VENDOR) {
    homeLink = CUSTOMER_DASHBOARD;
    routes = vendorRoutes;
  }
  return (
    <Paper sx={styles.root} elevation={3}>
      <BottomNavigation
        sx={{
          backgroundColor: "primary.main",
          display: "grid",
          gridTemplateColumns: "repeat(5, auto)",
          alignItems: "center",
          paddingX: 2,
        }}
        showLabels
      >
        {routes.map(({ id, children }) => (
          <React.Fragment key={id}>
            {children.map(({ id: childId, icon, route }) => (
              <Button
                sx={{
                  ...styles.navButton,
                  ...(pathname.includes(route) && styles.itemActiveLink),
                }}
                onClick={() => navigate(route)}
                key={childId}
              >
                <BottomNavigationAction
                  sx={{
                    ...styles.icon,
                    ...(pathname.includes(route) && styles.itemActiveIcon),
                  }}
                  label={childId}
                  icon={icon}
                />
              </Button>
            ))}
          </React.Fragment>
        ))}
      </BottomNavigation>
    </Paper>
  );
};
