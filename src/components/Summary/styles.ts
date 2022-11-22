import { styled } from '../../styles'

export const SummaryContainer = styled('section', {
  width: '100%',
  maxWidth: 1120,
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '2rem',
})

export const SummaryCard = styled('div', {
  borderRadius: 6,
  padding: '1rem 2rem',
  filter: 'drop-shadow(6px 6px 6px black)',

  variants: {
    type: {
      normal: { backgroundColor: '$white' },
      red: { backgroundColor: '$red900' },
      green: { backgroundColor: '$green300' },
    },
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '$gray900',
    fontWeight: 'bold',
    fontSize: '$lg',
  },

  strong: {
    display: 'block',
    fontSize: '2rem',
  },
})
