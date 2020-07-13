import React from 'react'

import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from '../../../styles/core'

const Heading = ({ tag, children, ...renderProps }) => {
  switch (tag) {
    case '1':
      return <Heading1 {...renderProps}>{children}</Heading1>
    case '2':
      return <Heading2 {...renderProps}>{children}</Heading2>
    case '3':
      return <Heading3 {...renderProps}>{children}</Heading3>
    case '4':
      return <Heading4 {...renderProps}>{children}</Heading4>
    case '5':
      return <Heading5 {...renderProps}>{children}</Heading5>
    case '6':
      return <Heading6 {...renderProps}>{children}</Heading6>
    default:
      return <p>{children}</p>
  }
}

export default Heading
