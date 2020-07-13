import styled from 'styled-components'
import AutosizeInput from 'react-input-autosize'
import { Button } from '@zendeskgarden/react-buttons'
import { FauxInput } from '@zendeskgarden/react-forms'

export const DefaultInput = styled.span`
  margin-left: -2px;
  color: rgb(117, 117, 117);
`

export const SubdomainInput = styled(FauxInput)`
  align-items: unset;
  justify-content: space-between;
`

export const TextInput = styled(AutosizeInput)`
  input {
    padding: 0;
    border: none;
    font-family: unset;
  }
`

export const SmallButton = styled(Button).attrs(() => ({
  isPrimary: true,
  size: 'small',
}))`
  min-width: 0;
  padding-right: 12px;
  padding-left: 12px;
  line-height: 20px;
`

export const MediaInputButton = styled(SmallButton)`
  ${({ size }) => size === 'small' && `
      margin-top: -4px;
      margin-right: -6px;
  `}
`

export const ToggleContainer = styled.div.attrs(() => ({
  className: 'SM',
}))`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 6px 10px -4px;
`
