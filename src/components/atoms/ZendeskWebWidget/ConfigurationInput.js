import React, { useState, useRef } from 'react'
import { withTheme } from 'styled-components'
import { Field } from '@zendeskgarden/react-forms'
import { delay } from '../../../js-utils'

import {
  MediaInputButton,
  SubdomainInput,
  DefaultInput,
  TextInput,
} from './ConfigurationInput.style'

const validateNotEmpty = (
  value,
  errorMessage = 'Please enter your Zendesk domain'
) => {
  // eslint-disable-next-line eqeqeq
  const isValid = value != undefined && value !== ''
  return {
    isValid,
    validationStatus: isValid ? 'success' : 'error',
    errorMessage,
  }
}

const ConfigurationInput = ({
  openWindowCallback = () => {},
  disabled,
  subdomain,
  showConfigurationInput = true,
}) => {
  const textInputRef = useRef()
  const [inputValue, setInputValue] = useState(subdomain)

  const setFocus = async (ref) => {
    await delay(50)
    if (ref && ref.current) {
      ref.current.focus()
    }
  }

  return !showConfigurationInput ? null : (
    <Field>
      <SubdomainInput
        tabIndex={0}
        onFocus={() => setFocus(textInputRef)}
        mediaLayout
      >
        <span>
          <DefaultInput>https://</DefaultInput>
          <TextInput
            autoFocus
            placeholder="<<subdomain>>"
            value={inputValue}
            ref={textInputRef}
            onChange={({ target: { value } }) => setInputValue(value)}
          />
          <DefaultInput>.zendesk.com</DefaultInput>
        </span>
        <MediaInputButton
          primary
          disabled={!validateNotEmpty(inputValue).isValid || disabled}
          onClick={() => openWindowCallback(inputValue)}
        >
          Configure Widget
        </MediaInputButton>
      </SubdomainInput>
    </Field>
  )
}

export default withTheme(ConfigurationInput)
