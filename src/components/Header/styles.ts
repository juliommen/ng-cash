import { styled } from '../../styles'

export const HeaderContainer = styled('header', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '$gray100',
  img: {
    backgroundColor: 'transparent',
    marginLeft: '4rem',
    marginRight: '4rem',
  },
})

export const LogoutButton = styled('button', {
  border: '2px solid $gray900',
  backgroundColor: '$gray100',
  padding: '0.75rem',
  borderRadius: 8,
  cursor: 'pointer',
  fontSize: 0,
  marginRight: '4rem',
  color: '$gray900',

  '&:hover:enabled': {
    transition: 'all 0.2s',
    backgroundColor: '$gray900',
    color: '$gray100',
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },
})
