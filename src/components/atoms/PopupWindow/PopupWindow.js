import React, { useLayoutEffect, useEffect, useState } from 'react'
import NewWindow from 'react-new-window'

const PopupWindow = ({
  url,
  close = false,
  onClose = () => console.log('onClose'),
}) => {
  const [previousClipped, setPreviousClipped] = useState()
  const [windowHandle, setWindowHandle] = useState()

  const getClipped = async () => {
    let clipped
    if (navigator && navigator.clipboard) {
      try {
        clipped = await navigator.clipboard.readText()
      } catch (info) {
        console.warn('Ignoring getClipped error', info)
      }
    }
    return clipped
  }

  const handleUnload = async () => {
    const clipped = await getClipped()
    setWindowHandle()
    return onClose(previousClipped !== clipped ? clipped : null)
  }

  useLayoutEffect(() => {
    const init = async () => setPreviousClipped(await getClipped())
    init()
  }, [])

  useEffect(() => {
    if (windowHandle) {
      if (close) {
        windowHandle.close()
      }
    }
  }, [close, windowHandle])

  return !previousClipped ? null : (
    <NewWindow
      copyStyles={false}
      url={url}
      onOpen={setWindowHandle}
      onBlock={handleUnload}
      onUnload={handleUnload}
    />
  )
}

export default PopupWindow
