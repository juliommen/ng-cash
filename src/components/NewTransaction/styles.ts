import * as Dialog from '@radix-ui/react-dialog'
import { styled } from '../../styles'

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
})

export const Content = styled(Dialog.Content, {
  minWidth: '16rem',
  maxWidth: '16rem',
  borderRadius: 6,
  padding: '2.5rem 3rem',
  backgroundColor: '$gray900',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  color: '$white',

  form: {
    width: '100%',
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',

    input: {
      width: '100%',
    },

    h3: {
      marginTop: '0.5rem',
    },

    '.buttonDiv': {
      cursor: 'pointer',
      marginTop: '2rem',
    },

    'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: '0',
    },

    'input[type=number]': {
      '-moz-appearance': 'textfield',
    },
  },

  p: {
    color: '$red500',
    padding: 0,
    fontSize: '$xsm',
    textAlign: 'left',
    marginBottom: '0.25rem',
    overflowWrap: 'break-word',
  },
})

export const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  backgroundColor: 'transparent',
  border: '1px solid transparent',
  top: '1.25rem',
  right: '1.5rem',
  lineHeight: 0,
  cursor: 'pointer',
  color: '$gray500',

  '&:hover:enabled': {
    border: '1px solid $gray800',
    borderRadius: 4,
    color: '$white',
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },
})
