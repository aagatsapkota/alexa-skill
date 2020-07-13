import React from 'react'
import { Tooltip } from '@zendeskgarden/react-tooltips'
import { Field } from '@zendeskgarden/react-forms'
import Checked from '@zendeskgarden/svg-icons/src/16/clipboard-check-fill.svg'
import Unchecked from '@zendeskgarden/svg-icons/src/16/clipboard-blank-stroke.svg'
import {
  SnippetWrapper,
  Code,
  ClipboardWrapper,
  IconButton,
} from './CodeSnippet.style'

export const STATUS = {
  DEFAULT: 'Copy to Clipboard',
  COPIED: 'Copied to Clipboard!',
}

const CodeSnippet = ({
  children,
  copied,
  clipboard = false,
  onCopy = () => console.log('onCopy'),
  inputRefCallback,
  buttonRefCallback,
  statusMessage,
  ...renderProps
}) => (
  <SnippetWrapper>
    {clipboard && (
      <ClipboardWrapper>
        <Tooltip
          trigger={(
            <IconButton
              ref={buttonRefCallback}
              tiny
              isPill={false}
              onClick={() => onCopy()}
            >
              {copied ? <Checked /> : <Unchecked />}
            </IconButton>
          )}
        >
          {statusMessage}
        </Tooltip>
      </ClipboardWrapper>
    )}
    <Field>
      <Code ref={inputRefCallback} {...renderProps} value={children} />
    </Field>
  </SnippetWrapper>
)

export default CodeSnippet
