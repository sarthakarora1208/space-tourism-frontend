import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { DRAWER_WIDTH } from "../../constants/dashboard";
import { openedMixin, closedMixin } from "./DashboardMixin";

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  zIndex: theme.zIndex.drawer + 1,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
