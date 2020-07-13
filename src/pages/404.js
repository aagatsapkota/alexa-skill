import React from 'react'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { withTheme } from 'styled-components'

import { Tagline, HeroTitle } from '../styles/core'
import { Heading, Section, SEO } from '../components/atoms'
import LearnMore from '../components/molecules/LearnMore'

const NotFoundPage = () => (
  <>
    <SEO title="404: Not Found" />
    <Section format="accent2" mode="fullscreen">
      <Grid>
        <Row>
          <Col md={6}>
            <Heading tag="1">
              <HeroTitle>Uh Oh.</HeroTitle>
              <Tagline>This page wasn't found.</Tagline>
            </Heading>
          </Col>
        </Row>
      </Grid>
    </Section>
    <LearnMore id="learn-more" mode="overlay" format="light" />
  </>
)

export default withTheme(NotFoundPage)
