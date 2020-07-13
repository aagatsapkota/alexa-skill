import { createGlobalStyle } from 'styled-components'

import theme from '../theme'

export default createGlobalStyle`
  html {
    background-color: ${theme.body.background};
    color: ${theme.body.color};
  }
  body {
    margin: 0;
    padding: 0;
    line-height: 1.35;
    font-family: ${theme.typography.body.default};
    font-size: ${theme.typography.sizes.default};
    overflow-x: hidden;
  }
  h1 {
    margin-bottom: .5em;
    font-weight: 300;
  }
  h2, h4, h6 {
    text-transform: uppercase;
    font-weight: 800;
  }
  h1, h2 {
    line-height: 1;
  }
  h1, h3 {
    font-weight: 300;
  }
  h2, h3, h4, h5, h6 {
    line-height: 1.1;
    margin-bottom: .8em;
  }
  pre {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 3px;
    padding: 10px 15px;
    overflow: auto;
    white-space: pre-wrap;
  }
  code {
    background-color: #f8f8f8;
    margin: -1px;
    padding: 2px 2px 1px 2px;
  }
  .XL {
    font-size: ${theme.typography.sizes.XL};
  }
  .LG {
    font-size: ${theme.typography.sizes.LG};
  }
  .MD {
    font-size: ${theme.typography.sizes.MD};
  }
  .SM {
    font-size: ${theme.typography.sizes.SM};
  }
  .XS {
    font-size: ${theme.typography.sizes.XS};
  }
  .hide-sm {
    @media (max-width: ${theme.breakpoints.sm}) {
      display: none;
    }
  }
`
