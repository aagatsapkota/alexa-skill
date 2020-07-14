import React, { useEffect, useContext } from 'react'
import { graphql } from 'gatsby'
import { withTheme } from 'styled-components'

import { GlobalDispatch, GlobalActions } from '../util/context'
import { SEO } from '../components/atoms'
import Hero from '../components/molecules/Hero'
import Integrations from '../components/molecules/Integrations'
import Features from '../components/molecules/Features'
import LearnMore from '../components/molecules/LearnMore'
import Customers from '../components/molecules/Customers'

export const query = graphql`
  query bookMeetingPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const BookMeetingPage = ({ data }) => {
  const dispatch = useContext(GlobalDispatch)
  const { site } = data || {}

  useEffect(() => {
    dispatch({
      type: GlobalActions.SCHEDULE_MODAL,
      scheduleModalVisible: true,
      scheduleModalTitle: 'Book A Meeting',
    })
  }, [])

  return (
    <>
      <SEO
        title="Book A Meeting: Omni-Channel Zendesk Commerce"
        description={site.description}
        keywords={site.keywords}
      />
      <Hero mode="fullscreen" format="medium" relative />
      <Customers mode="overlay" format="light" />
      <Features offset="14rem" format="light" />
      <Integrations format="default" relative />
      <LearnMore id="learn-more" mode="overlay" format="light" />
    </>
  )
}

export default withTheme(BookMeetingPage)
