import { Theme, CSSObject } from "@mui/material/styles";
import { DRAWER_WIDTH } from "../../constants/dashboard";

export const openedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

export const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: "0px",
  [theme.breakpoints.up("md")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});
