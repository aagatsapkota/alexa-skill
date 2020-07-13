import styled from 'styled-components'
import { Well } from '@zendeskgarden/react-notifications'
import { Heading2 } from '../../../styles/core'

export const ScreenshotsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;

  div + div {
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-left: 10px;
    }
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      margin-top: 10px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`

export const NavigationWrapper = styled(Well)`
  width: 100%;
`

export const NavigationHeading = styled(Heading2)`
  text-align: center;
`
