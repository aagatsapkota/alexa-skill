import { ensureString } from '../js-utils'

import { colors } from './colors'
import { typography } from './typography'

const BREAKPOINTS = {
  XS: '577px',
  SM: '769px',
  MD: '993px',
  LG: '1201px',
  XL: '1309px',
  XXL: '1921px',
}

const toNumeric = (pixels) => Number(ensureString(pixels).replace(/[^0-9]/gi, ''))

// eslint-disable-next-line import/prefer-default-export
export const config = {
  colors,
  typography,
  body: {
    background: colors.primary,
    color: colors.light,
  },
  formats: {
    default: {
      background: colors.tertiary,
      color: colors.primary,
      accent: colors.toAlpha(colors.primary),
      compliment: 'medium',
    },
    dark: {
      background: colors.dark,
      color: colors.light,
      accent: colors.toAlpha(colors.secondary),
      compliment: 'light',
    },
    medium: {
      background: colors.primary,
      color: colors.light,
      accent: colors.toAlpha(colors.tertiary),
      compliment: 'dark',
    },
    light: {
      background: colors.light,
      color: colors.primary,
      accent: colors.toAlpha(colors.tertiary),
      compliment: 'medium',
    },
    highlight: {
      background: colors.secondary,
      color: colors.light,
      accent: colors.toAlpha(colors.secondary),
      compliment: 'medium',
    },
    accent1: {
      background: colors.accent1,
      color: colors.light,
      accent: colors.toAlpha(colors.secondary),
      compliment: 'medium',
    },
    accent2: {
      background: colors.accent2,
      color: colors.light,
      accent: colors.toAlpha(colors.secondary),
      compliment: 'medium',
    },
  },
  breakpoints: {
    xs: BREAKPOINTS.XS,
    sm: BREAKPOINTS.SM,
    md: BREAKPOINTS.MD,
    lg: BREAKPOINTS.LG,
    xl: BREAKPOINTS.XL,
    xxl: BREAKPOINTS.XXL,
    numeric: toNumeric,
    calc: (size, minMax) => {
      let pixels = size.substring(0, size.length - 2)
      pixels = minMax === 'max' ? pixels - 1 : pixels
      return `${pixels}px`
    },
  },
}
