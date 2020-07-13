import React, { useEffect, useRef, useState } from 'react'
import { TweenMax, Expo } from 'gsap'
import { ColorPanel, ColorOverlay } from '../../../styles/core'
import Hexagon from '../../../images/hexagon.svg'
import theme from '../../../theme'

const ColorSlider = ({ activeFormat }) => {
  let topPanel = useRef(null)
  const [previousFormat, setPreviousFormat] = useState(activeFormat)

  useEffect(() => {
    TweenMax.fromTo(
      topPanel,
      0.6,
      {
        width: 0,
      },
      {
        width: '100%',
        ease: Expo.easeInOut,
        onComplete: () => {
          setPreviousFormat(activeFormat)
        },
      }
    )
  }, [activeFormat])

  return (
    <>
      <ColorPanel
        style={{
          backgroundColor: `${theme.formats[previousFormat].background}`,
        }}
      />
      <ColorPanel
        style={{
          backgroundColor: `${theme.formats[activeFormat].background}`,
        }}
        top
        ref={(el) => {
          topPanel = el
        }}
      />
      <ColorOverlay>
        <Hexagon />
      </ColorOverlay>
    </>
  )
}

export default ColorSlider
