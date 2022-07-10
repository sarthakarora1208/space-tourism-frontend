const styles = {
  container: {
    backgroundColor: 'background.default',
    paddingX: 4,
    paddingY: 3,
  },
  filterContainer: {
    padding: '1rem',
    width: ['100%', '100%', '100%', '100%'],
    flexShrink: 0,
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: ['auto', 'auto', 'auto', '1fr 4fr'],
    gap: '1.5rem',
  },
  serviceGrid: {
    paddingY: '1.5rem',
    backgroundColor: '#fafafa',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    rowGap: '3rem',
    placeItems: 'center',
  },
}

export default styles
