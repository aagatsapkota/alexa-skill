import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { document } from 'browser-monads'

import { NavigationLink } from '../../../styles/core'
import {
  StyledBurger,
  StyledMenu,
  StyledMobileHeader,
  MenuLogoWrapper,
  MenuBar,
  MenuBarLogoWrapper,
  Copyright,
} from './MobileHeader.style'

const Burger = ({ open }) => (
  <StyledBurger open={open}>
    <div />
    <div />
    <div />
  </StyledBurger>
)

const Menu = ({ open, items, handleClose }) => (
  <StyledMenu open={open}>
    <MenuLogoWrapper>
      <Link to="/">
        <img src="/images/agnoStack_icon-inverse.png" alt="agnoStack" />
      </Link>
    </MenuLogoWrapper>
    {items.map(({ text, link, CTA }, index) => (
      CTA ? (
        <CTA key={`mobile-header-${index}`} />
      ) : (
        <NavigationLink
          key={`mobile-header-${index}`}
          to={link}
          onClick={handleClose}
        >
          {text}
        </NavigationLink>
      )))}
    <Copyright>
      ©
      {' '}
      {new Date().getFullYear()}
      {' '}
      agnoStack, Inc.
    </Copyright>
  </StyledMenu>
)

const MobileHeader = ({ items }) => {
  const [open, setOpen] = useState(false)
  const [targetLockElement, setTargetLockElement] = useState(null)

  useEffect(() => {
    if (document) {
      setTargetLockElement(document.querySelector('body'))
    }
  }, [])

  useEffect(() => {
    if (open) {
      disableBodyScroll(targetLockElement)
    } else {
      enableBodyScroll(targetLockElement)
    }
  }, [open, targetLockElement])

  return (
    <StyledMobileHeader>
      <Menu open={open} items={items} handleClose={() => setOpen(false)} />
      <MenuBar onClick={() => setOpen(!open)}>
        <Burger open={open} setOpen={setOpen} />
        <MenuBarLogoWrapper>
          <img src="/images/agnoStack_wordmark-inverse.png" alt="agnoStack" />
        </MenuBarLogoWrapper>
      </MenuBar>
    </StyledMobileHeader>
  )
}

export default MobileHeader
