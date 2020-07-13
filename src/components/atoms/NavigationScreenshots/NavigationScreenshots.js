import React from 'react'
import { getNavigationLinks } from '../../../js-utils'
import {
  NavigationWrapper,
  NavigationHeading,
  ScreenshotsWrapper,
} from './NavigationScreenshots.style'
import ScreenshotButton from '../ScreenshotButton'

const NavigationScreenshots = ({
  title,
  path,
  subPaths = [],
  maxItems = 4,
}) => {
  const navigationLinks = getNavigationLinks({ path, subPaths, maxItems })
  return (
    <NavigationWrapper isRecessed>
      <NavigationHeading>{title}</NavigationHeading>
      <ScreenshotsWrapper>
        {navigationLinks.map((navigationItem, index) => (
          <ScreenshotButton
            key={`navigationItem-${index}`}
            {...navigationItem}
          />
        ))}
      </ScreenshotsWrapper>
    </NavigationWrapper>
  )
}

export default NavigationScreenshots
