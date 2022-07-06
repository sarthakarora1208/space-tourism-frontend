import { createStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const formStyles = (theme: Theme) =>
  createStyles({
    root: {
      "& > * ": {
        marginTop: theme.spacing(4),
        width: "25ch",
      },
    },
    button: {
      width: "95%",
      padding: "0.5rem",
      border: `1px solid ${theme.palette.primary.main}`,
      margin: theme.spacing(1),
      fontWeight: "bold",
      color: theme.palette.primary.main,
      backgroundColor: "white",
      borderColor: theme.palette.primary.main,
      //'&:hover': {
      //backgroundColor: theme.palette.primary.main,
      // },
      borderRadius: "6px",
    },
    secondaryButton: {
      width: "95%",
      padding: "0.5rem",
      margin: theme.spacing(1),
      fontWeight: "bold",
      color: "white",
      borderColor: "white",
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
      borderRadius: "6px",
    },
    reportButton: {
      padding: "0.5rem 1rem",
      margin: theme.spacing(1),
      fontWeight: "bold",
      color: "white",
      borderColor: "white",
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
      borderRadius: "6px",
    },

    selectLabel: {
      left: "auto",
      top: "auto",
    },

    typography: {
      textAlign: "center",
      fontWeight: "bold",
      fontFamily: "Helvetica",
      padding: "0.4rem 1.6rem",
    },
    headingText: {
      fontWeight: "bold",
      fontFamily: "Helvetica",
    },
    cssFocused: {
      color: theme.palette.primary.light,
    },
    heading: {
      color: "#00000",
    },
    link: {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
    wrapper: {
      padding: "2rem 4rem",
      marginTop: "2.5rem",
    },
    formWrapper: {
      padding: "0rem 2rem 0rem 2rem",
    },
    signin: {
      textAlign: "center",
    },
    backButton: {
      margin: "0.2rem auto auto 0.2rem",
    },
    welcomeBackText: {
      color: theme.palette.secondary.dark,
      fontWeight: 700,
    },
    loginText: {
      color: theme.palette.secondary.main,
    },
    formControl: {
      width: "100%",
      margin: "0px 0px 12px 0px",
    },

    label: {
      color: theme.palette.secondary.dark,
      fontWeight: 600,
      margin: "0px 0px 8px 0px",
    },
    label1: {
      color: theme.palette.secondary.dark,
      fontWeight: 600,
    },
  });
export default formStyles;
