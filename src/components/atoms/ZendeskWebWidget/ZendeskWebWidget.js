import React, { useState, useEffect } from 'react'
import { window } from 'browser-monads'
import { withTheme } from 'styled-components'
import { parse as parseHTML } from 'node-html-parser'
import { Button } from '@zendeskgarden/react-buttons'
import { Well, Paragraph } from '@zendeskgarden/react-notifications'
import PopupWindow from '../PopupWindow'
import ConfigurationInput from './ConfigurationInput'
import {
  ImageGroup,
  Snippet,
  SubTitle,
  MainTitle,
  TitleWrapper,
  ToggleWrapper,
  SnippetWrapper,
  ButtonParagraph,
  ParagraphWrapper,
} from './ZendeskWebWidget.style'
import { Anchor, Heading4 } from '../../../styles/core'
import { useDimensions, useCodeSnippet } from '../../../hooks'

const getParsedKey = (html) => {
  const getSrc = (parsed) => (parsed && parsed.querySelector('script')
    ? parsed.querySelector('script').attributes.src
    : null
  )
  const getKey = (src) => (
    src && new URL(src).searchParams.get('key')
  )

  let key

  try {
    key = html && getKey(getSrc(parseHTML(html)))
  } catch (error) {
    console.error(error)
  }

  return key
}

const PanelTitle = ({
  showSnippetInput,
  showConfigurationInput,
  showConfigurationToggle,
  setShowConfigurationInput,
}) => (
  <TitleWrapper>
    <MainTitle>
      {showConfigurationInput && !showSnippetInput
        ? 'Enter Zendesk Subdomain'
        : 'Enter Default Zendesk Snippet'}
    </MainTitle>
    {showConfigurationToggle && (
      <ToggleWrapper>
        <Anchor
          onClick={() => setShowConfigurationInput(!showConfigurationInput)}
        >
          {showConfigurationInput ? 'Manual Setup' : 'Configuration Wizard'}
        </Anchor>
      </ToggleWrapper>
    )}
  </TitleWrapper>
)

const PopupHelpDescription = ({
  showPopupWindow = true,
  closeWindowCallback,
}) => (!showPopupWindow ? null : (
  <Paragraph>
    <div>
      Within the Zendesk popup, configure any settings you'd like within the
      {' '}
      <b>Customizations</b>
      {' '}
      Tab and then click on the
      {' '}
      <b>Setup</b>
      {' '}
      Tab to obtain the default Zendesk code snippet and then Copy to Clipboard.
    </div>
    <ImageGroup>
      <div>
        <img
          src="/images/zendesk-embeddable-customization-screenshot.png"
          alt="Zendesk Embeddable Customization"
        />
      </div>
      <div>
        <img
          src="/images/zendesk-embeddable-setup-screenshot.png"
          alt="Zendesk Embeddable Setup"
        />
        <div>
          Click on the
          {' '}
          <b>Copy To Clipboard</b>
          {' '}
          button at the bottom of the screen and then
          {' '}
          <Anchor onClick={() => closeWindowCallback(true)}>
            close the popup window
          </Anchor>
          {' '}
          to continue to agnoStack setup.
        </div>
      </div>
    </ImageGroup>
  </Paragraph>
))

const DefaultSnippet = ({ showSnippetInput, showConfigurationInput, input }) => (
  !showSnippetInput ? null : (
    <>
      {showConfigurationInput && <SubTitle>Default Zendesk Snippet</SubTitle>}
      {input}
    </>
  ))

const EnhancedSnippet = ({ showEnhancedInput, input, copyToClipboard }) => (
  !showEnhancedInput ? null : (
    <SnippetWrapper>
      <Heading4>Copy and Paste Enhanced Snippet Below</Heading4>
      <Paragraph>
        Paste the code below into each page of your website where you'd like the
        Web Widget to appear (or into a template that will insert it on every
        page on the site).
      </Paragraph>
      <Paragraph>{input}</Paragraph>
      <ParagraphWrapper>
        <ButtonParagraph>
          Paste the code above as high as possible into the
          {' '}
          <Snippet>
            {'<head>'}
          </Snippet>
          {' '}
          of your page.
        </ButtonParagraph>
        <Button size="small" isPrimary onClick={() => copyToClipboard()}>
          Copy
        </Button>
      </ParagraphWrapper>
    </SnippetWrapper>
  ))

const ZendeskWebWidget = ({ theme }) => {
  const [windowIsOpen, setOpenWindow] = useState(false)
  const [closeWindow, handleCloseWindow] = useState(false)
  const [showConfigurationInput, setShowConfigurationInput] = useState(true)
  const [defaultSnippet, setDefaultSnippet] = useState()
  const [snippetKey, setSnippetKey] = useState()
  const [subdomain, setSubdomain] = useState()
  const [{ width }] = useDimensions(window)

  const { breakpoints } = theme || {}
  const { sm: breakpointPx = '', numeric } = breakpoints || {}
  const breakpoint = numeric(breakpointPx)

  const [defaultCodeInput] = useCodeSnippet({
    autoFocus: true,
    muted: snippetKey,
    rows: width > breakpoint ? '4' : '6',
    placeholder:
      'For Manual Setup, copy the default snippet from inside of Zendesk under the Admin/gear icon > Channels > Widget',
    children: defaultSnippet,
    onChange: ({ target: { value } }) => setDefaultSnippet(value),
  })
  const [enhancedCodeInput, copyToClipboard] = useCodeSnippet({
    rows: '12',
    readOnly: true,
    clipboard: true,
    children: `<!-- Start of Zendesk/agnoStack Widget script -->
<script>window.dataLayer = window.dataLayer || [];window.dataLayer.push((() => ({ 'ze-snippet-key': '${snippetKey}' }))()); (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl+'';f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer', 'GTM-KZS6Z55');</script>
<!-- End of Zendesk/agnoStack Widget script -->`,
  })

  const handleSetSnippetKey = (snippet) => {
    const key = getParsedKey(snippet)
    if (key) {
      if (snippetKey !== key) {
        setSnippetKey(key)
      }
    } else {
      setSnippetKey()
    }
  }

  const handleOpenWindow = (value) => {
    setOpenWindow(true)
    setSubdomain(value)
  }

  const handleWindowClose = (clippedSnippet) => {
    if (clippedSnippet) {
      setDefaultSnippet(clippedSnippet)
    }
    setOpenWindow(false)
  }

  useEffect(() => {
    handleSetSnippetKey(defaultSnippet)
  }, [defaultSnippet])

  const showPopupWindow = (subdomain && windowIsOpen) || false
  const showSnippetInput = (subdomain && !windowIsOpen) || !showConfigurationInput
  const showEnhancedInput = showSnippetInput && snippetKey
  const showConfigurationToggle = (showSnippetInput || showConfigurationInput)
    && !(showSnippetInput && showConfigurationInput)

  const renderProps = {
    disabled: windowIsOpen,
    muted: snippetKey,
    subdomain,
    setSnippetKey,
    defaultSnippet,
    showPopupWindow,
    setDefaultSnippet,
    showEnhancedInput,
    showSnippetInput,
    showConfigurationToggle,
    showConfigurationInput,
    setShowConfigurationInput,
    copyToClipboard,
    openWindowCallback: handleOpenWindow,
    closeWindowCallback: handleCloseWindow,
  }

  return (
    <Well isFloating isRecessed>
      {showPopupWindow && (
        <PopupWindow
          url={`https://${subdomain}.zendesk.com/embeddable/settings`}
          close={closeWindow}
          onClose={(value) => handleWindowClose(value)}
        />
      )}
      <PanelTitle {...renderProps} />
      <ConfigurationInput {...renderProps} />
      <PopupHelpDescription {...renderProps} />
      <DefaultSnippet input={defaultCodeInput} {...renderProps} />
      <EnhancedSnippet input={enhancedCodeInput} {...renderProps} />
    </Well>
  )
}

export default withTheme(ZendeskWebWidget)
