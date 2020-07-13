import React, { useState } from 'react'
import Downshift from 'downshift'
import { navigate } from 'gatsby'
import {
  Dropdown,
  Trigger,
  NextItem,
  PreviousItem,
  HeaderItem,
  Separator,
} from '@zendeskgarden/react-dropdowns'
import { StyledItem, StyledButton, StyledMenu } from './TreeMenu.style'

const TreeMenu = ({
  enabled,
  path,
  paths,
  category,
  title = 'Select a Category',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(category)
  const renderItems = () => (selectedCategory && paths[selectedCategory] ? (
    <>
      {Object.keys(paths).length > 1 && (
        <PreviousItem value={Object.keys(paths).indexOf(selectedCategory)}>
          {selectedCategory}
        </PreviousItem>
      )}
      <Separator />
      {paths[selectedCategory].map(
        (
          { path: itemPath, frontmatter: { title: itemTitle, version } },
          sectionIndex
        ) => (
          <StyledItem
            active={itemPath === path}
            key={`section-${sectionIndex}`}
            value={itemPath}
          >
            {itemTitle || version}
          </StyledItem>
        )
      )}
    </>
  ) : (
    <>
      <HeaderItem disabled>{title}</HeaderItem>
      <Separator />
      {Object.keys(paths).map((categoryName, index) => (
        <NextItem key={`category-${index}`} value={categoryName}>
          {categoryName}
        </NextItem>
      ))}
    </>
  ))

  return !enabled ? null : (
    <Dropdown
      isOpen={isOpen}
      onStateChange={(
        { selectedItem: updatedItem, isOpen: updatedOpen, type },
        { setHighlightedIndex }
      ) => {
        if (updatedOpen !== undefined
          && updatedOpen !== isOpen
          && [
            Downshift.stateChangeTypes.mouseUp,
            Downshift.stateChangeTypes.clickButton,
          ].includes(type)
        ) {
          setIsOpen(updatedOpen)
        }

        if (updatedItem !== undefined) {
          if (selectedCategory
            && paths[selectedCategory]
            && paths[selectedCategory].find(
              ({ path: availablePath }) => availablePath === updatedItem
            )
          ) {
            navigate(updatedItem)
          } else if (updatedItem !== selectedCategory) {
            setSelectedCategory(updatedItem)
            if (!paths[updatedItem]) {
              setHighlightedIndex(updatedItem)
            }
          }
        }
      }}
    >
      <Trigger>
        <StyledButton full>{category || title}</StyledButton>
      </Trigger>
      <StyledMenu full>{renderItems()}</StyledMenu>
    </Dropdown>
  )
}

export default TreeMenu
