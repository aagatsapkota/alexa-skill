import styled from 'styled-components'
import Markdown from 'markdown-to-jsx'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { ButtonGroup } from '@zendeskgarden/react-buttons'
import { Section } from '../../atoms'

const MARKDOWN_STYLES = (theme) => `
  ol {
    list-style: decimal-leading-zero;
  }
  ul {
    list-style: square;
    padding-inline-start: 16px;
  }
  .max {
    max-width: 100%;
  }
  .border {
    max-width: 100%;
    border: 1px solid ${theme.colors.tertiary};
  }
  .link-group { 
    display: inline-table;
    text-align: center;
  }
  .logo {
    padding: 12px;
  }
  .image-group {
    display: flex;
    align-items: flex-start;
    justify-content: space-evenly;
  }
  .columns {
    display: flex;
    @media (max-width: ${theme.breakpoints.sm}) {
      display: block;
    }
  }
  .columns div { 
    flex-grow: 1;
    flex-basis: 0;
  }
  .columns .third { 
    flex-grow: .5;
    flex-basis: 0;
  }
  .columns .right {
    padding-left: 2vw;
    padding-right: 1vw;
  }
  .columns .left {
    padding-right: 2vw;
  }
`

export const LeftCol = styled(Col)`
  margin-left: -2px;
  height: ${({ height }) => `${height}px`};
  align-self: auto;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
    align-items: center;
  }
`

export const BodyCol = styled(Col)`
  align-self: auto;
  margin-left: 2vw;
  margin-top: 8px;
  ${({ 'data-padding-body': paddingTop }) => paddingTop && `
    padding-top: 5em;
  `}
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-top: 2em;
    margin-left: 0;
    max-width: 100%;
    align-items: center;
  }
`

export const ContentSection = styled(Section)`
  ${({ 'data-padding-body': paddingTop }) => paddingTop && `
    padding-top: 0;
  `}
`

export const ContentGrid = styled(Grid)`
  min-height: 60vh;
`

export const ContentRow = styled(Row)`
  padding-bottom: 40px;
`

export const StyledMDX = styled.div`
  ${({ theme }) => MARKDOWN_STYLES(theme)}
`

export const StyledMarkdown = styled(Markdown)`
  ${({ theme }) => MARKDOWN_STYLES(theme)}
`

export const StyledNavigation = styled(ButtonGroup)`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  min-height: 80px;
  margin-top: 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: center;
  }
`
