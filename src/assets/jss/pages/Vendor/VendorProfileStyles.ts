const styles = {
  container: {
    backgroundColor: 'background.default',
    paddingX: 4,
    paddingY: 3,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },

  cardMedia: {
    backgroundColor: '#f5f5f5',
    width: '100%',
    height: '200px',
    '& img': {
      width: 'auto',
      height: '100%',
      objectFit: 'cover',
    },
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  imageStyle: {
    width: '200px',
    height: '200px',
  },
  typographyStyle: {
    lineHeight: '1.8',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: ['auto', '2fr 1fr'],
    gap: '1.5rem',
    // flexWrap: "wrap",
  },
  cardStyle: {
    // width: "500px",
  },
  profileCardContainer: {
    position: 'relative',
    // flexGrow: 1,
    // width: "500px",
    boxSizing: 'border-box',
  },
  detailContainer: {
    // flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  cardContainer2: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  readMoreToggle: {
    margin: '0rem',
    padding: '0rem',
    display: 'inline',
    fontWeight: 'bold',
    color: 'primary.main',
    cursor: 'pointer',
  },
}

export default styles
