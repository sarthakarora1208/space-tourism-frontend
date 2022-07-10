import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Container,
  CssBaseline,
  makeStyles,
  Typography,
  Button,
} from "@mui/material";

import EnhancedConfirmUserForm from "./EnhancedConfirmUserForm";

interface IConfirmUserProps {}

const ConfirmUser: React.FC<IConfirmUserProps> = props => {
  // const handleResendClick = () => {
  //   dispatch(resendConfirmationCode());
  // };

  return (
    <div style={{ paddingTop: "20vh", background: "#fafafa" }}>
      <Container
        style={{ paddingLeft: "0.4em", paddingRight: "0.4em", height: "80vh" }}
      >
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={6}>
            <CssBaseline />
            <div style={{ padding: "1em" }}></div>
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <Hidden smDown>
              <div style={{ paddingTop: "10vh", marginLeft: "2em" }}>
                <img src={GRAPHIC} />
              </div>
            </Hidden>
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
};
export default ConfirmUser;
