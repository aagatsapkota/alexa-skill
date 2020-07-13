import React from 'react'
import { graphql } from 'gatsby'
import { withTheme } from 'styled-components'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'

import { Tagline, HeroTitle, ColorOverlay } from '../styles/core'
import { Heading, Section, SEO } from '../components/atoms'
import Pricing from '../components/molecules/Pricing'
import LearnMore from '../components/molecules/LearnMore'
import Hexagon from '../images/hexagon.svg'

export const query = graphql`
  query PricingPageQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const PricingPage = ({ data }) => {
  const { site } = data || {}

  return (
    <>
      <SEO
        title="Pricing: Omni-Channel Zendesk Commerce"
        description={site.description}
        keywords={site.keywords}
      />
      <Section format="accent1" mode="halfscreen">
        <Grid>
          <Row>
            <Col md={6}>
              <Heading tag="1">
                <HeroTitle>Simple pricing</HeroTitle>
                <Tagline>for every size brand.</Tagline>
              </Heading>
            </Col>
          </Row>
        </Grid>
        <ColorOverlay opacity="0.5">
          <Hexagon />
        </ColorOverlay>
      </Section>
      <Pricing format="light" />
      <LearnMore id="learn-more" mode="overlay" format="light" />
    </>
  )
}

export default withTheme(PricingPage)
