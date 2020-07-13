import React, { useEffect, useState, useRef } from 'react'
import { navigate } from 'gatsby'
import { window } from 'browser-monads'
import { withTheme } from 'styled-components'
import { Button } from '@zendeskgarden/react-buttons'

import { useDimensions } from '../../../hooks'
import MobileHeader from '../MobileHeader'
import Header from '../Header'
import Footer from '../Footer'

import { NavigationWrapper, NavigationContentWrapper } from './Navigation.style'
import { ScheduleButton } from '../../atoms'

const { GATSBY_URL_ZENDESK_LISTING } = process.env

const SecondaryButton = (renderProps) => (
  <Button
    {...renderProps}
    onClick={() => {
      window.open(GATSBY_URL_ZENDESK_LISTING, '_blank')
      navigate('/faqs')
    }}
  >
    Install Now
  </Button>
)

const navigationItems = [
  {
    text: 'Features',
    link: '/#features',
  },
  {
    text: 'Integrations',
    link: '/#integrations',
  },
  {
    text: 'Pricing',
    link: '/pricing',
  },
  {
    text: 'FAQs',
    link: '/faqs',
  },
  {
    text: 'News',
    link: '/press-releases',
  },
  {
    CTA: ScheduleButton,
    exclude: 'footer',
  },
  {
    CTA: SecondaryButton,
    exclude: 'footer',
  },
]

const Navigation = ({ children, theme }) => {
  const [enableSticky, setEnableSticky] = useState(false)
  const navRef = useRef()
  const [{ width }] = useDimensions(window)
  const { breakpoints } = theme || {}
  const { md: breakpointPx = '', numeric } = breakpoints || {}
  const breakpoint = numeric(breakpointPx)

  useEffect(() => {
    if (window && navRef && navRef.current && width > breakpoint) {
      const scrollCallBack = window.addEventListener('scroll', () => {
        if (navRef && navRef.current) {
          setEnableSticky(window.pageYOffset > 2 * navRef.current.scrollHeight)
        }
      })
      return () => {
        window.removeEventListener('scroll', scrollCallBack)
      }
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navRef])

  return (
    <>
      <NavigationWrapper
        component={<header ref={navRef} />}
        header
        sticky={enableSticky}
        id="header_navigation"
      >
        <NavigationContentWrapper>
          <Header items={navigationItems} />
          <MobileHeader items={navigationItems.slice(0, -1)} />
        </NavigationContentWrapper>
      </NavigationWrapper>
      {children}
      <NavigationWrapper component={<footer />}>
        <Footer items={navigationItems} />
      </NavigationWrapper>
    </>
  )
}

export default withTheme(Navigation)
