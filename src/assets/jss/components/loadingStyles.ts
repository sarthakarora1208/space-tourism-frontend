const styles = {
  backdrop: {
    color: "#fff",
    zIndex: (theme: { zIndex: { drawer: number } }) => theme.zIndex.drawer + 1,
  },
};

export default styles;
