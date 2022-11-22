import { createStitches } from '@stitches/react'

export const { styled, getCssText, globalCss } = createStitches({
  theme: {
    colors: {
      white: '#fff',
      gray100: '#e1e1e6',
      gray200: '#d2d2d5',
      gray300: '#b3b3bd',
      gray500: '#9a9a9c',
      gray700: '#67676a',
      gray750: '#454548',
      gray800: '#232325',
      gray900: '#121214',
      green500: '#00875f',
      green300: '#00b37e',
      purple300: '#8257E6 ',
      purple500: '#7431F4',
      red500: '#cc0000',
      red900: '#ef4444',
    },
    fontSizes: {
      xsm: '0.75rem',
      sm: '0.875rem',
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem',
    },
  },
})
