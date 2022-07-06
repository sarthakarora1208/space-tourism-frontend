const styles = {
  root: {
    "& > * ": {
      marginTop: 4,
      width: "25ch",
    },
  },
  buttonGrid: {
    width: "40vw",
  },
  button: {
    width: "100%",
  },
  secondaryButton: {
    width: "100%",
    fontWeight: "bold",
    color: "white",
    borderColor: "white",
    backgroundColor: "primary.main",
    "&:hover": {
      backgroundColor: "primary.dark",
    },
  },
  link: {
    textDecoration: "underline",
    color: "primary.main",
  },

  selectLabel: {
    left: "auto",
    top: "auto",
  },

  typography: {
    textAlign: "center",
    fontWeight: "bold",
    padding: "0.4rem 1.6rem",
  },
  headingText: {
    fontWeight: "bold",
  },
  cssFocused: {
    color: "primary.light",
  },
  heading: {
    color: "#00000",
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
    color: "primary.main",
    fontWeight: 700,
  },
  loginText: {
    color: "text.secondary",
  },
  formControl: {
    width: "100%",
    margin: "0px 0px 14px 0px",
    "&  *": {
      fontSize: "14px",
    },
  },

  label: {
    color: "primary.main",
    fontWeight: 500,
    margin: "0px 0px 2px 0px",
    // fontSize: "1rem",
  },
  label1: {
    color: "primary.light",
    fontWeight: 500,
  },
  fontGridColumn: {
    display: "grid",
    gridTemplateColumns: ["auto", "auto", "auto", "repeat(2, 1fr)"],
    gap: ["0", "0", "0", "1.5rem"],
  },

  serviceCardMedia: {
    display: ["none", "nono", "block", "block"],
  },
  serviceCardIcon: {
    backgroundColor: "secondary.light",
    color: "white",
    fontSize: "16px",
    padding: "0.5rem",
    borderRadius: "8px",
    display: "inline-block",
  },
};

export default styles;
