import styled from 'styled-components'
import { Button } from '@zendeskgarden/react-buttons'
import { Menu, Item } from '@zendeskgarden/react-dropdowns'

export const StyledItem = styled(Item)`
  ${({ active, theme }) => active && `
    background-color: ${theme.colors.tertiary};
  `}
`

export const StyledButton = styled(Button)`
  ${({ full }) => full && `
    width: 100%;
  `}
`

export const StyledMenu = styled(Menu).attrs(
  ({ full }) => full && {
    popperModifiers: {
      fixedWidth: {
        enabled: true,
        fn: ({
          styles,
          offsets,
          offsets: {
            reference: { width },
          },
          ...renderProps
        }) => ({
          offsets,
          ...renderProps,
          styles: {
            ...styles,
            width,
          },
        }),
      },
    },
  }
)`
  ${({ full }) => full && `
    width: 100%;
  `}
`
