import React from 'react'
import Sticky from 'react-stickynode'
import { StickyContainer } from './StickyAccordion.style'
import Accordion from '../Accordion'

const StickyAccordion = ({ breakpoint, enabled, ...renderProps }) => (
  !enabled ? null : (
    <Sticky top="#header_navigation" bottomBoundary="#content_grid">
      <StickyContainer>
        <Accordion {...renderProps} expandable collapsible />
      </StickyContainer>
    </Sticky>
  )
)

export default StickyAccordion
