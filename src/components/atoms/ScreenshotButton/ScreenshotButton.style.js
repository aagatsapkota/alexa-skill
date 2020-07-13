import styled from 'styled-components'
import { Title, Well } from '@zendeskgarden/react-notifications'

export const Screenshot = styled(Well)`
  cursor: pointer;
  padding: 20px;

  &:hover {
    ${({ theme }) => `
      box-shadow: 0 20px 28px 0 ${theme.colors.shadow2};
    `}
  }
`

export const ScreenshotTitle = styled(Title)`
  white-space: pre-wrap;
`

export const ScreenshotImage = styled.img`
  width: 100%;
  margin-top: 4px;
  ${({ theme }) => `
    border: 1px solid ${theme.colors.shadow2};
  `}
`

export const ScreenshotDate = styled.div`
  font-style: italic;
  margin-left: unset !important;
`
