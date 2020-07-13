import styled from 'styled-components'
import { Col, Row } from '@zendeskgarden/react-grid'

import { Heading, Section } from '../../atoms'

export const HeroSection = styled(Section)`
  @media (max-width: ${({ theme }) => theme.breakpoints.calc(theme.breakpoints.md, 'max')}) {
    height: auto;
    min-height: 100vh;
    align-items: flex-start;
  }
`

export const HeroHeading = styled(Heading)`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
  min-height: 33vh;
  @media (max-width: ${({ theme }) => theme.breakpoints.calc(theme.breakpoints.md, 'max')}) {
    min-height: auto;
  }
`

export const HeroRow = styled(Row)`
  @media (max-width: ${({ theme }) => theme.breakpoints.calc(theme.breakpoints.md, 'max')}) {
    flex-direction column-reverse;
  }
`

export const HeroCol = styled(Col)`
  @media (max-width: ${({ theme }) => theme.breakpoints.calc(theme.breakpoints.md, 'max')}) {
    &:nth-of-type(even) {
      margin-bottom: 2em;
      flex-direction: row-reverse;
    }
  }
`

export const Body = styled.div`
  min-height: 120px;
`

export const Callout = styled.div`
  padding-top: 1vh;
  font-style: italic;
  ${({ onClick }) => onClick && `
    cursor: pointer;
  `};
  ${({ theme, format }) => format && `
    color: ${theme.formats[format].color};
  `};

  span:last-child {
    ${({ theme, format }) => format && `
      color: ${theme.formats[theme.formats[format].compliment].accent};
    `};
  }
`
