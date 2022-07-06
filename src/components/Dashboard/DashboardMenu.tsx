import React, { useState, ReactNode } from "react";
import {
  Box,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { IoMenu } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Header } from "./Header";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { Navigator } from "./Navigator";
import { MobileNavigator } from "./MobileNavigator";
import { Drawer } from "./StyledDrawer";
import { DrawerHeader } from "./StylesDrawerHeader";
import {
  HOME,
  ABOUT_US,
  LOGIN,
  LOGOUT,
  REGISTER,
  CONFIRM_USER,
  FORGOT_PASSWORD,
  CONTACT_US,
  FAQ,
  VENDOR_REGISTER,
  CUSTOMER_REGISTER,
} from "../../constants/routes";
import styles from "../../assets/jss/components/DashboardLayoutStyles/DashboardContainerStyles";

interface IDashboardMenu {
  children: ReactNode | any | null;
}

const DashboardMenu: React.FC<IDashboardMenu> = ({ children }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const pathsToExclude: string[] = [
    HOME,
    LOGIN,
    REGISTER,
    ABOUT_US,
    CONTACT_US,
    CONFIRM_USER,
    FORGOT_PASSWORD,
    LOGOUT,
    FAQ,
    VENDOR_REGISTER,
    CUSTOMER_REGISTER,
  ];

  if (!pathsToExclude.includes(pathname)) {
    return (
      <Box sx={{ display: "flex" }}>
        <Header open={open} handleDrawerOpen={handleDrawerOpen} />

        <Drawer
          sx={{
            backgroundColor: "primary.main",
          }}
          variant="permanent"
          open={open}
        >
          {matches && (
            <>
              <DrawerHeader>
                <Box>
                  {open ? (
                    <IconButton
                      sx={styles.leftButton}
                      onClick={handleDrawerClose}
                    >
                      <ChevronLeftIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={handleDrawerOpen}
                      edge="start"
                      sx={styles.menuIcon}
                    >
                      <IoMenu fontSize={24} />
                    </IconButton>
                  )}
                </Box>
              </DrawerHeader>
              <Divider />
            </>
          )}
          {matches ? <Navigator /> : <MobileNavigator />}
        </Drawer>
        <Box component="main" sx={styles.container}>
          {children}
        </Box>
      </Box>
    );
  }
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
export default DashboardMenu;
