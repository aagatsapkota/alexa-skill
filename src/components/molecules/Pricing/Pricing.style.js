import styled from 'styled-components'
import { Col } from '@zendeskgarden/react-grid'

export const PricingTier = styled(Col)`
  border-left: 0.5px solid ${({ theme }) => theme.colors.shadow2};
  &:nth-of-type(1) {
    border-left: none;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.calc(theme.breakpoints.md, 'max')}) {
    border-left: none;
    border-top: 0.5px solid ${({ theme }) => theme.colors.shadow2};
    padding: 2em;
    margin-top: 2em;
    &:nth-of-type(1) {
      border-top: none;
      margin-top: 0;
    }
  }
`

export const PricingWrapper = styled.div`
  margin-bottom: 0.5rem;
`

export const PricingCost = styled.div`
  font-size: 3em;
  line-height: 0.9;
`

export const PricingPerMonth = styled.span`
  font-size: 0.5em;
`

export const PricingPerAgent = styled.div`
  font-size: 0.75em;
`

export const PricingFeature = styled.div`
  padding: 0.6rem 0 0 0;
`

export const RefundNote = styled.div`
  margin-top: 2rem;
  font-style: italic;
`

export const PricingNote = styled.div`
  margin-top: 1rem;
`

export const MinimumAgents = styled.div`
  font-size: 0.75em;
  font-style: italic;
`
