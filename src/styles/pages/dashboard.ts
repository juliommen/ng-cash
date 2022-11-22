import { styled } from '..'

export const DashboardContainer = styled('div', {
  width: '100%',
  maxWidth: 1120,
  margin: '0 auto',

  '&>h1': {
    fontSize: '2.5rem',
    textAlign: 'center',
    marginTop: '-1rem',
    marginBottom: '2rem',
  },

  '&>h2': {
    fontSize: '$xxl',
    marginBottom: '0.5rem',
  },

  h3: {
    marginTop: '2rem',
    marginBottom: '2rem',
    fontSize: '$xl',
  },

  '.buttonDiv': {
    width: '10rem',
    margin: '2rem auto',
    marginBottom: '1rem',
    cursor: 'pointer',
  },

  hr: {
    margin: '2rem 0',
  },

  footer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '0.5rem',
    gap: '0.25rem',

    '&>h4': {
      userSelect: 'none',
    },

    '&>svg': {
      cursor: 'pointer',
      border: '1px solid transparent',
      borderRadius: 4,
    },
    '&>svg:hover': {
      border: '1px solid $gray700',
      backgroundColor: '$gray200',
    },
  },
})

export const DashboardHeader = styled('div', {
  width: '100%',
  maxWidth: 350,
  margin: '1rem auto',
  borderRadius: 6,
  backgroundColor: '$gray900',
  padding: '1.5rem 2rem',
  color: '$white',
  position: 'relative',
  border: '2px solid $gray750',
  filter: 'drop-shadow(6px 6px 6px black)',

  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: '$xl',
  },

  strong: {
    display: 'block',
    marginTop: '1rem',
    fontSize: '2rem',
  },
})

export const TransactionsContainer = styled('main', {
  width: '100%',
  maxWidth: 1120,
  margin: '1rem auto 0',
  padding: '0 0rem',
})

export const TransactionsTable = styled('table', {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 0.5rem',
  marginTop: '0.5rem',

  th: {
    padding: '0.5rem 2rem',
    backgroundColor: '$gray200',
    textAlign: 'left',

    '&:first-child': {
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
    },

    '&:last-child': {
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
    },
  },

  td: {
    padding: ' 1rem 2rem',
    backgroundColor: '$gray200',

    '&:first-child': {
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
    },

    '&:last-child': {
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
    },
  },
})

export const PriceHightLight = styled('span', {
  variants: {
    variant: {
      income: { color: '$green500' },
      outcome: { color: '$red500' },
    },
  },
})

export const LoadingContainer = styled('div', {
  width: '100vw',
  height: '50vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '.loading': {
    width: '100%',
  },
})
