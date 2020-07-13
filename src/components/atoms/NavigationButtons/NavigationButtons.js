import React from 'react'
import { navigate } from 'gatsby'
import { Button } from '@zendeskgarden/react-buttons'
import { getNavigationLinks } from '../../../js-utils'

const NavigationButtons = ({
  path,
  subPaths = [],
  labels = ['Previous', 'Next'],
}) => {
  const navigationLinks = getNavigationLinks({ path, subPaths, labels })
  return navigationLinks.map(({ title, path: linkPath, text }, index) => (
    <Button
      value={text}
      isPill
      size="small"
      key={`navigationButton-${index}`}
      disabled={!linkPath}
      title={title}
      onClick={() => linkPath && navigate(linkPath)}
    >
      {text}
    </Button>
  ))
}

export default NavigationButtons
