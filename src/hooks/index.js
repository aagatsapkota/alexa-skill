import React, { useEffect, useState, useRef } from 'react'
import { window, document } from 'browser-monads'
import { delay, objectNotEmpty } from '../js-utils'

import CodeSnippet, { STATUS } from '../components/atoms/CodeSnippet'

export const useCodeSnippet = ({ children, ...props }) => {
  const inputRef = useRef()
  const buttonRef = useRef()
  const [statusMessage, setStatusMessage] = useState(STATUS.DEFAULT)
  const [copied, setCopied] = useState(false)

  const getClipped = async () => {
    let clipped
    // eslint-disable-next-line no-undef
    if (navigator && navigator.clipboard) {
      try {
        window.focus()
        // eslint-disable-next-line no-undef
        clipped = await navigator.clipboard.readText()
      } catch (error) {
        console.error(error)
      }
    }
    return clipped
  }

  const copyToClipboard = async (inputElement, triggerElement) => {
    if (document.execCommand
      && document.queryCommandSupported('copy')
      && inputElement
      && inputElement.value
    ) {
      await delay(200)
      // NOTE: does copy empty inputs, but adds newline before content
      const range = document.createRange()
      range.selectNode(inputElement)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)

      // NOTE: doesn't copy empty inputs
      inputElement.focus()
      inputElement.select()

      // NOTE: doesn't copy empty inputs, but handles other types of inputs
      document.execCommand('selectall')
      document.execCommand('copy')

      if (triggerElement) {
        triggerElement.focus()
      }

      setCopied(true)
      setStatusMessage(STATUS.COPIED)
      await delay(1000)
      inputElement.setSelectionRange(0, 0)
      inputElement.focus()
      setStatusMessage(STATUS.DEFAULT)
      getClipped()
    }
  }

  const renderProps = {
    ...props,
    copied,
    statusMessage,
    onCopy: () => copyToClipboard(inputRef.current, buttonRef.current),
    inputRefCallback: inputRef,
    buttonRefCallback: buttonRef,
  }

  return [
    <CodeSnippet {...renderProps}>{children}</CodeSnippet>,
    () => copyToClipboard(inputRef.current, buttonRef.current),
  ]
}

export const useInterval = (callback, duration) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }
    if (duration !== null) {
      const id = setInterval(tick, duration)
      return () => clearInterval(id)
    }
    return null
  }, [duration])
}

export const useDimensions = (container = window) => {
  const getDimensions = () => {
    const { innerWidth: width, innerHeight: height } = container || {}
    return {
      width,
      height,
    }
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getDimensions(container)
  )

  const resizeDimensions = ({ width, height }) => {
    const resizeWidth = width || windowDimensions.width ? windowDimensions.width : null
    const resizeHeight = height || windowDimensions.height ? windowDimensions.height : null
    if (resizeWidth && resizeHeight) {
      if (container.resizeTo) {
        container.resizeTo(resizeWidth, resizeHeight)
      }
      if (container.focus) {
        container.focus()
      }
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (container) {
        const dimensions = getDimensions(container)
        if (objectNotEmpty(dimensions)) {
          setWindowDimensions(dimensions)
        }
      }
    }

    container.addEventListener('resize', handleResize)
    return () => container.removeEventListener('resize', handleResize)
  }, [])

  return [windowDimensions, resizeDimensions]
}
