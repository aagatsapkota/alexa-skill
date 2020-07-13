import { css } from 'styled-components'

const commonOverrides = ({ theme, format }) => format && `
  background-color: ${theme.formats[format].background}!important;
  color: ${theme.formats[format].color};
`

// eslint-disable-next-line import/prefer-default-export
export const garden = {
  'grid.row': css`
    ${commonOverrides}
    ${({ pad }) => (pad ? 'padding: 2em 0' : '')};
  `,
  'grid.col': css`
    ${commonOverrides}
    ${({ alignSelf }) => `
    align-self: ${alignSelf || 'center'};
  `};
    ${({ nowrap }) => (nowrap ? 'white-space: nowrap;' : '')};
    ${({ align }) => (align ? `text-align: ${align}` : '')};
    ${({ theme, alignMobile }) => (alignMobile ? `
      @media (max-width: ${theme.breakpoints.sm}) {
        text-align: ${alignMobile};
      }
    ` : '')};
  `,
  'buttons.button': css`
    ${commonOverrides}
    ${({ isPrimary, theme, disabled, format = 'default' }) => `
    margin: 0 2px;
    padding: 0 1.5em;
    text-transform: uppercase;
    font-family: ${theme.typography.heading.default};
    border-color: transparent!important;
    transition: background .4s ease, filter .2s ease, transform .2s ease;
    box-shadow: 0 2px 2px 0 ${theme.colors.shadow1}, 2px 2px 6px 0 ${theme.colors.shadow2}!important;
    ${disabled ? `
    cursor: no-drop!important;
    color: ${theme.colors.disabled}!important;
    ` : `
    background-color: ${isPrimary
    ? theme.formats[theme.formats[format].compliment].background
    : theme.formats[theme.formats[format].compliment].accent}!important;
    color: ${isPrimary
    ? theme.formats[theme.formats[format].compliment].color
    : theme.formats[theme.formats[format].compliment].background}!important;

    &&:hover {
      filter: saturate(40%) brightness(1.2);
      transform: translate(0px, -.5px);
    }
  `}
  `};
  `,
  'modals.modal': css`
    width: 70%;
    height: 80%;
    max-height: 762px;
    @media (max-width: ${({ theme }) => theme.breakpoints.calc(theme.breakpoints.md, 'max')}) {
      width: 100%;
      height: 100%;
      min-height: 100%;
      left: 0;
    }
  `,
  'modals.header': css`
    text-transform: uppercase;
  `,
}
