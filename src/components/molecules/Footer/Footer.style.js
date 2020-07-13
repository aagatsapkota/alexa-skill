import styled from 'styled-components'
import { Link } from 'gatsby'
import { Row, Grid, Col } from '@zendeskgarden/react-grid'

export const MapImage = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1vh;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`

export const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: min-content;
  }
`

export const AddressWrapper = styled.address`
  * {
    color: white;
    text-decoration: none;
  }
`

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  text-decoration: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`

export const MenuItem = styled(Link)`
  padding: 0.1rem 0 0.5rem 0;
  margin: 0.2rem;
  color: white;
  text-decoration: none;
`

export const LogoWrapper = styled.div`
  img {
    width: auto;
    height: 44px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.calc(theme.breakpoints.md, 'max')}) {
    padding: 1em 1em 1em 12%;
  }
`

export const SocialCol = styled(Col)`
  @media (max-width: ${({ theme }) => theme.breakpoints.calc(theme.breakpoints.xs, 'max')}) {
    margin: 4em 0;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.calc(theme.breakpoints.sm, 'max')}) {
    margin-bottom: 2em;
  }
`

export const SocialIcon = styled.div`
  width: 25px;
  height: auto;
  display: inline-block;
  margin: 1em 0.75em;
  i {
    color: ${({ theme }) => theme.colors.light};
    font-size: 1.5em;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.calc(theme.breakpoints.md, 'max')}) {
    padding: 1.5em;
    margin: 0;
  }
`

export const FooterGrid = styled(Grid)`
  max-width: ${({ theme }) => theme.breakpoints.xxl};
  margin: 0px auto;
  padding-top: 15em;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-flow: column-reverse;
    padding-top: 20em;
  }
`

export const Copyright = styled.div`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.light};
`

export const BottomRow = styled(Row)`
  border-top: ${({ theme }) => `
  1px solid ${theme.colors.toAlpha(
    theme.colors.light,
    theme.colors.alpha2
  )}
  `};
  margin-top: 1.5em;
  padding-top: 1.5em;
`
