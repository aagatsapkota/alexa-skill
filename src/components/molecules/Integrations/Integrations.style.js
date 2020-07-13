import styled from 'styled-components'
import { Col } from '@zendeskgarden/react-grid'
import IntegrationsSVG from '../../../images/agnoStack-integration.svg'

export const OverlayCol = styled(Col)`
  margin: -9em -4em 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.calc(theme.breakpoints.md, 'max')}) {
    margin: 2em 0 0 0;
  }
`

export const IntegrationsImage = styled(IntegrationsSVG)`
  width: 120%;
  @media (max-width: ${({ theme }) => theme.breakpoints.calc(theme.breakpoints.md, 'max')}) {
    width: 100%;
  }
`
