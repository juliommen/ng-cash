import { styled } from '../../styles'
export const StyledInput = styled('div', {
  position: 'relative',
  height: '2rem',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '$gray800',
  borderRadius: 6,
  border: '2px solid $gray900',
  padding: '0.5rem 0',
  transition: 'border-color 0.2s',
  width: '100%',
  gap: '0.75rem',
  margin: '0.5rem 0',

  variants: {
    validity: {
      true: { border: '0 !important', outline: '2px solid $red500' },
      false: { outline: 0 },
    },
  },

  svg: {
    fontSize: 0,
  },

  '&:focus-within': {
    border: '2px solid $purple500',

    'svg:first-child': {
      transition: 'all 0.2s',
      color: '$purple500',
    },
  },

  'svg:first-child': {
    color: '$gray700',
    position: 'absolute',
    left: '1rem',
  },

  input: {
    height: '100%',
    backgroundColor: 'transparent',
    color: '$white',
    fontSize: '$md',
    border: 0,
    marginLeft: '3rem',
  },

  'svg:last-child': {
    position: 'absolute',
    right: '1rem',
    color: '$purple300',
  },
})
