import React from 'react'
import { navigate } from 'gatsby'
import { useAccordion } from '@zendeskgarden/container-accordion'
import {
  AccordionButton,
  StyledAccordionHeading,
  StyledHeader,
  StyledLink,
  Chevron,
} from './Accordion.style'
import Heading from '../Heading'

const Accordion = ({
  paths,
  category,
  expandable = false,
  collapsible = false,
}) => {
  const accordionIndex = Object.keys(paths).indexOf(category)
  const {
    getHeaderProps,
    getTriggerProps,
    getPanelProps,
    expandedSections,
    disabledSections,
  } = useAccordion({
    expandedSections: [accordionIndex > -1 ? accordionIndex : 0],
    expandable,
    collapsible,
  })

  return Object.entries(paths).map(
    ([accordionSectionTitle, accordionSection], sectionIndex) => {
      const disabled = disabledSections.indexOf(sectionIndex) !== -1
      const hidden = expandedSections.indexOf(sectionIndex) === -1
      const { onClick: triggerClick, ...triggerProps } = getTriggerProps({
        index: sectionIndex,
        role: 'button',
        tabIndex: 0,
        disabled,
      })
      return (
        <div key={`accordion-section-${sectionIndex}`}>
          <StyledHeader
            {...getHeaderProps({ role: null, ariaLevel: null })}
            {...triggerProps}
            onClick={(event) => ((hidden) ? navigate(accordionSection[0].path) : triggerClick(event))}
          >
            <StyledAccordionHeading tag="2" size="MD">
              <Chevron rotated={!hidden} />
              {accordionSectionTitle}
            </StyledAccordionHeading>
          </StyledHeader>
          {accordionSection.map(
            ({ frontmatter: { title, version }, path }, itemIndex) => (
              <Heading
                tag="3"
                size="default"
                key={`accordion-section-${sectionIndex}-item-${itemIndex}`}
                {...getPanelProps({
                  index: sectionIndex,
                  role: null,
                  hidden,
                })}
              >
                <StyledLink to={path}>
                  <AccordionButton>{title || version}</AccordionButton>
                </StyledLink>
              </Heading>
            ),
          )}
        </div>
      )
    },
  )
}

export default Accordion
