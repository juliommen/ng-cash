import { styled } from '../../styles'

export const ButtonBackground = styled('div', {
  minWidth: '15rem',
  width: '100%',
  position: 'relative',
  fontSize: '$md',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: '1.5rem 0rem',
  color: '$white',
  backgroundColor: '$gray900',
  border: '1px solid $white',
  borderRadius: 14,
})

export const ButtonContainer = styled('button', {
  all: 'unset',
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: 'translate(-3%,-15%)',
  backgroundColor: '$white',
  border: '2px solid $white',
  borderRadius: 14,
  color: '$gray900',
  fontWeight: 'bold',
  fontSize: '$lg',
  transition: 'all 0.2s',

  '&:hover:enabled': {
    transform: 'translate(-2px,-2px)',
  },

  '&:disabled': {
    cursor: 'not-allowed',
    backgroundColor: '$gray500',
    border: '2px solid $gray500',
  },
})
