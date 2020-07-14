import React from 'react'
import classNames from 'classnames'
import { withTheme } from 'styled-components'
import { window } from 'browser-monads'
import { ResponsiveWrapper } from './withBreakpoint.style'
import { useDimensions } from '../../../hooks'

const withBreakpoint = (
  Component,
  FallbackComponent = null,
  container = window
) => {
  const [{ width }] = useDimensions(container)
  const ResponsiveHOC = ({
    theme,
    breakpoint: breakProp,
    className,
    children,
    ...renderProps
  }) => {
    const { breakpoints } = theme || {}
    const { md: breakpointPx = '', numeric } = breakpoints || {}
    const breakpoint = breakProp || numeric(breakpointPx)

    return !breakpoint ? (
      <Component className={className} breakpoint={breakpoint} {...renderProps}>
        {children}
      </Component>
    ) : (
      <>
        <ResponsiveWrapper
          data-hide={breakpoint ? `max-width: ${breakpoint}px` : null}
        >
          <Component
            breakpoint={breakpoint}
            enabled={width >= breakpoint}
            className={classNames('responsive', className)}
            {...renderProps}
          >
            {children}
          </Component>
        </ResponsiveWrapper>
        <ResponsiveWrapper
          data-hide={breakpoint ? `min-width: ${breakpoint + 1}px` : null}
        >
          <FallbackComponent
            breakpoint={breakpoint}
            enabled={width < breakpoint}
            className={classNames('responsive', 'fallback', className)}
            {...renderProps}
          >
            {children}
          </FallbackComponent>
        </ResponsiveWrapper>
      </>
    )
  }

  return withTheme(ResponsiveHOC)
}

export default withBreakpoint
