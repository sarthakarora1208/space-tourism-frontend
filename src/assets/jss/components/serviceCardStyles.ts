const styles = {
  card: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    position: 'relative',
    minHeight: '400px',
    border: '1px solid #e0e0e0',
    boxShadow: '0px 5px 10px 5px #e0e0e0',
    '&:hover': {
      boxShadow: '0px 20px 40px 20px #e0e0e0',
    },
  },
  cardMedia: { height: '200px' },
  status: {
    position: 'absolute',
    top: '10px',
    left: '15px',
  },
  iconButton: {
    backdropFilter: 'brightness(0.9)',
    position: 'absolute',
    color: '#FFF',
    right: 8,
    top: 8,
  },
  serviceName: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  cardInfoTitle: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'secondary.main',
  },
  cardContent: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  chargesSelect: {
    height: '36px',
    fontSize: '0.8rem',
  },
  chargeItem: {
    fontSize: '0.8rem',
  },
  chargeContainer: {
    marginTop: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1.5rem',
  },
  actionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '0.5rem',
  },
}

export default styles
