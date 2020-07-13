import React from 'react'

import { GlobalContext } from './src/util/context'
import './src/styles/fonts.css'

export const wrapRootElement = ({ element }) => (
  <GlobalContext>{element}</GlobalContext>
)
