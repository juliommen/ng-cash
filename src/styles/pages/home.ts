import { styled } from '..'

export const HomeContainer = styled('main', {
  margin: '2rem auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(2,1fr)',
  alignItems: 'center',
  width: '55rem',
  height: '25rem',
  gap: '3rem',

  img: {
    width: 'auto',
    height: '25rem',
  },

  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
  },

  '.a2': {
    textDecoration: 'underline',
    fontSize: '$lg',
    color: '$gray900',
    fontWeight: 'bold',

    '&:hover': {
      transition: 'color 0.2s',
      color: '$purple500',
    },
  },
})
