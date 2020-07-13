import styled from 'styled-components'

// eslint-disable-next-line import/prefer-default-export
export const ResponsiveWrapper = styled.div`
  ${({ 'data-hide': dataHide }) => dataHide && `
    @media (${dataHide}) {
      display: none;
    }
  `}
  ${({ 'data-show': dataShow }) => dataShow && `
    @media (${dataShow}) {
      display: block;
    }
  `}
`
