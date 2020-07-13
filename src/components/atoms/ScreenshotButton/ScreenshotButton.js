import React from 'react'
import moment from 'moment'
import { navigate } from 'gatsby'
import {
  snakecase,
  removeLeadingTrailingSlash
} from '../../../js-utils'

import {
  Screenshot,
  ScreenshotDate,
  ScreenshotTitle,
  ScreenshotImage,
} from './ScreenshotButton.style'

const ScreenshotButton = ({ title, path, date }) => {
  const screenShot = snakecase(removeLeadingTrailingSlash(path))
  const timestamp = moment(date, 'M/D/YYYY')
  return !path ? null : (
    <Screenshot title={title} onClick={() => navigate(path)}>
      <ScreenshotTitle>{title}</ScreenshotTitle>
      {timestamp && <ScreenshotDate>{timestamp.format('LL')}</ScreenshotDate>}
      <ScreenshotImage
        alt={title}
        src={`/images/screenshots/${screenShot}.png`}
      />
    </Screenshot>
  )
}

export default ScreenshotButton
