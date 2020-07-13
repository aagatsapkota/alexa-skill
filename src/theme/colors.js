import hexToRgba from 'hex-to-rgba'

const light = '#fff' // white
const dark = '#0F0D19' // black-ish
const primary = '#12333E' // plum
const secondary = '#D2B193' // tan
const tertiary = '#E9E8E8' // grey

const accent1 = '#682860' // purple
const accent2 = '#5B6EC6' // blue
const disabled = '#B0B0B0' // dark grey
const alpha1 = 0.5
const alpha2 = 0.1

// eslint-disable-next-line import/prefer-default-export
export const colors = {
  light,
  dark,
  primary,
  secondary,
  tertiary,
  accent1,
  accent2,
  alpha1,
  alpha2,
  disabled,
  shadow1: hexToRgba(primary, alpha1),
  shadow2: hexToRgba(dark, alpha2),
  toAlpha: (hex, decimal = alpha1) => hexToRgba(hex, decimal),
}
