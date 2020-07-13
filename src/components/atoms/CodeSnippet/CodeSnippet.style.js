import styled from 'styled-components'
import { Textarea } from '@zendeskgarden/react-forms'
import { IconButton as _IconButton } from '@zendeskgarden/react-buttons'

export const SnippetWrapper = styled.div`
  position: relative;
`

export const ClipboardWrapper = styled.div`
  position: absolute;
  top: 1px;
  right: 1px;
  border-top-right-radius: 4px;
  background: #fff;
  padding: 4px;
`

export const IconButton = styled(_IconButton).attrs(
  ({ tiny }) => tiny && {
    size: 'small',
  }
)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${({ tiny }) => tiny && `
    width: 28px!important;
    height: 28px!important;
    padding: 0;

    svg {
      width: 12px;
      height: 12px;
    }
  `};
`

export const Code = styled(Textarea)`
  white-space: pre-wrap;
  font-family: monospace;
  font-size: initial;
  line-height: 1rem;
  overflow: auto;
  color: #68737d;

  ${({ muted }) => muted && `
    opacity: .7;
  `};
`
