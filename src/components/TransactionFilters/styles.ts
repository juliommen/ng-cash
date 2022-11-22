import { styled } from '../../styles'

export const FilterFormContainer = styled('form', {
  h2: {
    margin: '2rem 0 0.5rem 0',
  },

  div: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-end',
  },

  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.25rem',
  },

  'input, select': {
    fontSize: '$md',
    width: '10rem',
    borderRadius: 6,
    backgroundColor: '$gray900',
    color: '$white',
    padding: '0.85rem',
    colorScheme: 'dark',
    border: '2px solid $gray900',
    cursor: 'pointer',

    '&::placeholder': {
      color: '$gray800',
    },

    '&:hover': {
      border: '2px solid $green500',
    },
  },

  input: {
    padding: '0.75rem',
  },

  button: {
    all: 'unset',
    height: '2.5rem',
    width: '10rem',
    textAlign: 'center',
    borderRadius: 8,
    fontWeight: 'bold',
    backgroundColor: '$gray900',
    color: '$white',
    cursor: 'pointer',
    border: '2px solid $gray900',
    fontSize: '$md',

    '&:hover': {
      border: '2px solid $green500',
    },
  },
})
