import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
  },

  body: {
    '-webkit-font-smoothing': 'antialised',
    backgroundColor: '$gray100',
    color: '$gray900',
  },

  'body, input, textarea, button': {
    fontFamily: 'IBM Plex Sans',
    fontWeight: 400,
  },

  ':focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px $purple500',
  },

  '*::-webkit-scrollbar': {
    width: 8,
    height: 0,
    backgroundColor: '$gray300',
  },

  '*::-webkit-scrollbar-thumb': {
    borderRadius: 10,
    backgroundColor: '$gray900',
  },

  '.transparent': {
    opacity: '0.01',
  },

  '.colored': {
    opacity: '1',
    transition: 'opacity 1s ease-in',
  },

  '.defaultBalance': {
    color: '$white',
  },

  '.newBalance': {
    transition: 'all 0.2',
    color: '$purple500',
  },
})
