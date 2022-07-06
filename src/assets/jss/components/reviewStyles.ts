const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  profile: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
  },
  profileContainer: {
    flexGrow: 1,
  },
  nameContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  avatar: {
    width: "48px",
    height: "48px",
  },
  username: {
    flexGrow: 1,
    fontWeight: "bold",
  },
  date: {
    color: "text.secondary",
    fontSize: "0.85rem",
  },
  serviceName: {
    color: "text.secondary",
  },
  ratingContainer: {
    display: "flex",
    gap: "0.5rem",
  },
  readMoreToggle: {
    margin: "0rem",
    padding: "0rem",
    display: "inline",
    fontWeight: "bold",
    color: "primary.main",
    cursor: "pointer",
  },
  reply: {
    padding: "0.25rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  replierAvatar: {
    width: "20px",
    height: "20px",
  },
  replierNameContainer: {
    display: "flex",
    gap: "0.5rem",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "start",
    alignItems: "center",
  },
  replyHeader: {
    fontWeight: "500",
  },
  replyContainer: {
    marginLeft: "2rem",
    marginTop: "-0.5rem",
  },
  openReplyButton: {},
};

export default styles;
