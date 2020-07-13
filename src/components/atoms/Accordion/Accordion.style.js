import styled from 'styled-components'
import { Link } from 'gatsby'
import { ChevronButton } from '@zendeskgarden/react-buttons'
import Heading from '../Heading'

export const StyledHeader = styled.div`
  border-style: none;
  background: none;
  text-align: left;
  cursor: pointer;
`

export const StyledLink = styled(Link).attrs(() => ({
  getProps: ({ isCurrent = false }) => {
    const style = isCurrent
      ? {
        fontWeight: '600',
      } : {
        display: 'block',
        marginRight: 12,
      }
    return {
      style,
    }
  },
}))``

export const AccordionButton = styled.button`
  border-style: none;
  background: none;
  text-align: left;
  font-weight: inherit;
  width: 100%;
  margin: 4px -2px;
  &:hover {
    color: ${({ theme }) => theme.colors.accent2};
  }
`

export const StyledAccordionHeading = styled(Heading)`
  border-bottom: ${({ theme }) => theme.colors.tertiary} 1px solid;
`

export const Chevron = styled(ChevronButton)`
  border-style: none;
  background: none;
  box-shadow: none !important;
  background-color: transparent !important;
  width: 20px;
  padding: 0 10px 0 0;
`
