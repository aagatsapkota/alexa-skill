import React from 'react'
import styled from 'styled-components'
import { convertElement } from '../../../js-utils'

// All Navigation Bars
export const NavigationWrapper = styled(
  ({ component = <section />, ...props }) => convertElement(component, props)
)`
  padding: 1.5em 3em;
  @media (max-width: ${({ theme }) => theme.breakpoints.calc(theme.breakpoints.md, 'max')}) {
    padding: 0;
  }
  ${({ header }) => header && `
    position: absolute;
    left: 0;
    right: 0;
    transition: all 0.4s ease;
    z-index: 2;
  `}
  ${({ sticky, theme }) => sticky && `
    position: fixed;
    background-color: ${theme.formats.default.color};
    z-index: 2;
  `}
`

export const NavigationContentWrapper = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.xxl};
  margin: 0px auto;
`
