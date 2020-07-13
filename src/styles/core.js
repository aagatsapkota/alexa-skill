import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { Anchor as _Anchor } from '@zendeskgarden/react-buttons'
import { convertElement } from '../../src/js-utils'

const handleMode = ({ mode, theme, format = 'default' }) => {
  switch (mode) {
    case 'thirdscreen':
      return `
        position: relative;
        overflow: hidden;
        height: 33vh;
        max-height: 430px;
        box-sizing: border-box;
        padding: 10em 1em 5em 1em;
        display: flex;
        align-items: center;
      `
    case 'halfscreen':
      return `
        position: relative;
        overflow-x: hidden;
        height: 50vh;
        max-height: 640px;
        box-sizing: border-box;
        padding: 5em 1em;
        display: flex;
        align-items: center;
      `
    case 'fullscreen':
      return `
        position: relative;
        overflow-x: hidden;
        height: 100vh;
        max-height: 1280px;
        box-sizing: border-box;
        padding: 5em 1em;
        display: flex;
        align-items: center;
      `
    case 'overlay':
      return `
        position: absolute;
        transform: translateY(-2em);
        left: 0;
        right: 0;
        margin-left: 10vw;
        margin-right: 10vw;
        border-radius: 15px;
        box-shadow: 0 15px 50px ${theme.formats[format].color};
        padding: 2em 1em;

        div {
          width: 100%;
        }
      `
    case 'parent':
      return 'padding: 0;'
    default:
      return 'padding: 5em 1em;'
  }
}

export const NoWrap = styled.span`
  white-space: nowrap;
`

export const Container = styled(({ component = <section />, ...props }) => convertElement(component, props))`
  ${(props) => handleMode(props)};
  ${({ offset }) => offset && `
    padding-top: ${offset};
  `};
  ${({ theme, format }) => format && `
    background-color: ${theme.formats[format].background};
    color: ${theme.formats[format].color};
  `};
  @media (max-width: ${({ theme }) => theme.breakpoints.calc(theme.breakpoints.md, 'max')}) {
    height: auto;
  }
`

export const ContentWrapper = styled.div`
  width: ${({ wide }) => (wide ? '90%' : '80%')};
  max-width: ${({ theme }) => theme.breakpoints.xxl};
  margin: 0px auto;
`

export const SectionTitle = styled.h2`
  display: flex;
  justify-content center;
  align-items: center;
`

export const Tagline = styled.div`
  ${({ theme, format = 'default' }) => `
      color: ${theme.formats[theme.formats[format].compliment].accent}!important;
  `};
`

export const HeroTitle = styled.div`
  ${({ heroIndex }) => (heroIndex === undefined || heroIndex > 0) && `
    padding-right: 12px;
  `}
`

export const ImageWrapper = styled.div`
  ${({ width, height, center }) => `
    ${center ? 'text-align: center;' : ''}
    width: ${width || '80%'};
    height: ${height || 'auto'};
    margin: 0 auto;
    img {
      width: ${width || '80%'};
      height: ${height || 'auto'};
    }
  `}
`

export const NavigationLink = styled(Link)`
  display: inline-flex;
  margin: 0 0.75em;
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.typography.heading.default};
  letter-spacing: 0.08em;
  text-decoration: none;
  opacity: 0.9;
  vertical-align: bottom;
  padding-bottom: 9px;
  color: ${({ theme }) => theme.colors.light};
  &:hover,
  &:active {
    opacity: 1;
  }
`

const StyledHeading = styled.p`
  ${({ theme, tag, size, weight, transform, type = 'default' }) => {
    const fontSize = size
      ? theme.typography.sizes[size]
      : theme.typography.sizes[theme.typography.sizes.headings[tag]]
    const mobileBreakpoint = theme.breakpoints.calc(theme.breakpoints.xs, 'max')
    const mobileFontSize = `${Math.min(theme.breakpoints.numeric(fontSize), 2)}em`
    return `
    overflow-wrap: break-word;
    ${weight ? `font-weight: ${weight};` : ''}
    ${transform ? `text-transform: ${transform};` : ''}
    ${theme.typography.heading[type]
    ? `font-family: ${theme.typography.heading[type]};`
    : ''}
    font-size: ${fontSize};

    @media (max-width: ${mobileBreakpoint}) {
      font-size: ${mobileFontSize};
    }
    `
  }}
`

export const Heading1 = styled(StyledHeading).attrs(({ tag = 'h1' }) => ({
  tag,
  as: tag,
}))``

export const Heading2 = styled(StyledHeading).attrs(({ tag = 'h2' }) => ({
  tag,
  as: tag,
}))``

export const Heading3 = styled(StyledHeading).attrs(({ tag = 'h3' }) => ({
  tag,
  as: tag,
}))``

export const Heading4 = styled(StyledHeading).attrs(({ tag = 'h4' }) => ({
  tag,
  as: tag,
}))``

export const Heading5 = styled(StyledHeading).attrs(({ tag = 'h5' }) => ({
  tag,
  as: tag,
}))``

export const Heading6 = styled(StyledHeading).attrs(({ tag = 'h6' }) => ({
  tag,
  as: tag,
}))``

export const ColorPanel = styled.span`
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  ${({ top }) => `
    ${top && `
      transform-origin: 0 50%;
      width: 0;
    `}
  `};
  @media (max-width: ${({ theme }) => theme.breakpoints.calc(theme.breakpoints.sm, 'max')}) {
    display: none;
  }
`

export const ColorOverlay = styled.span`
  display: block;
  position: absolute;
  right: 0;
  left: 0;
  top: -50%;
  bottom: 0;
  transform: translateX(40%);
  ${({ opacity }) => `
    ${opacity && `
      opacity: ${opacity};
    `}
  `}
`

export const ColorOverlayAlternate = styled.span`
  display: block;
  position: absolute;
  top: -100%;
  transform: translateX(-40%);
  left: 0;
  right: 0;
  bottom: -90%;
`

export const AngledBackground = styled(({ component = <div />, ...props }) => convertElement(component, props))`
  &::before {
    content: ' ';
    display: block;
    position: absolute;
    z-index: 0;
    top: 225vh;
    right: 75vw;
    width: 150vw;
    height: 100vw;
    background: ${({ theme, format }) => (format ? theme.formats[format].background : theme.colors.dark)};
    transform: rotate(-35deg);
    opacity: 0.3;
  }
`

export const Anchor = styled(_Anchor).attrs(
  ({ isExternal }) => isExternal && {
    target: '_blank',
  }
)`
  padding: 0;
  color: unset;
  text-transform: unset;
  text-decoration: underline;
  background-color: unset!important;
  box-shadow: unset!important;
`
