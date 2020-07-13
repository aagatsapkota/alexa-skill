import styled from 'styled-components'
import { Title, Paragraph } from '@zendeskgarden/react-notifications'
import { Heading6 } from '../../../styles/core'

export const Snippet = styled.code`
  font-style: italic;
  font-weight: 600;
`

export const ParagraphWrapper = styled(Paragraph)`
  display: flex;
  align-items: center;
`

export const ButtonParagraph = styled.span`
  flex-grow: 1;
`

export const TitleWrapper = styled(Title)`
  display: flex;
`

export const MainTitle = styled.span`
  flex-grow: 1;
`

export const SubTitle = styled(Heading6)`
  margin-top: 10px;
`

export const SnippetWrapper = styled.div`
  margin-top: 10px;
`

export const ImageGroup = styled.div`
  ${({ theme }) => `
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;

  @media (max-width: ${theme.breakpoints.sm}) {
    display: block;
  }

  div {
    margin-top: 10px;
    margin-left: 6px;
    margin-right: 6px;
  }

  & > div {
    max-width: calc(50% - 6px);

    @media (max-width: ${theme.breakpoints.sm}) {
      max-width: calc(100% - 6px);
    }
  }

  & > div > img {
    background: #fff;
    padding: 10px;
    width: 100%;
    border: 1px solid ${theme.colors.tertiary};
  }
  
  & > div:first-of-type {
    margin-left: 0;
  }

  & > div:last-of-type {
    margin-right: 0;
  }
`}
`

export const ToggleWrapper = styled.span.attrs(() => ({
  className: 'SM',
}))`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin-right: 12px;
`
