import React from 'react'
import { window } from 'browser-monads'
import { withTheme } from 'styled-components'
import { useDimensions } from '../../../hooks'

const Responsive = ({
  component: Component,
  children,
  theme,
  breakpoint: breakProp,
  ...renderProps
}) => {
  const [{ width }] = useDimensions(window)
  const { breakpoints } = theme || {}
  const { md: breakpointPx = '', numeric } = breakpoints || {}
  const breakpoint = breakProp || numeric(breakpointPx)

  return width >= breakpoint ? (
    <Component breakpoint={breakpoint} {...renderProps}>
      {children}
    </Component>
  ) : (
    children
  )
}

export default withTheme(Responsive)
