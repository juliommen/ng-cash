import { styled } from '..'

export const LoginContainer = styled('main', {
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
})

export const LoginForm = styled('form', {
  height: '80%',
  backgroundColor: '$gray900',
  padding: '3rem 3rem 2rem 3rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,

  h1: {
    color: '$white',
    marginBottom: '1rem',
  },

  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    color: '$gray100',
  },

  '.buttonDiv': {
    marginTop: '2rem',
    marginBottom: '1rem',
    width: '100%',
    cursor: 'pointer',
  },

  '.a2': {
    textDecoration: 'none',
    fontSize: '$lg',
    color: '$purple500',
    fontWeight: 'bold',

    '&:hover': {
      transition: 'all 0.2s',
      color: '$purple300',
    },
  },

  p: {
    color: '$red500',
    padding: 0,
    fontSize: '$xsm',
    textAlign: 'left',
    width: '100%',
    marginBottom: '0.25rem',
  },
})
