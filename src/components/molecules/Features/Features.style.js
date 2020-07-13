import styled from 'styled-components'
import { Grid } from '@zendeskgarden/react-grid'

// eslint-disable-next-line import/prefer-default-export
export const StyledGrid = styled(Grid)`
  div:nth-of-type(odd) {
    flex-direction: row-reverse;
  }
`
