import React from 'react'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'

import { Heading, Section } from '../../atoms'
import { NoWrap } from '../../../styles/core'
import { OverlayCol, IntegrationsImage } from './Integrations.style'

const Integrations = (renderProps) => (
  <Section id="integrations" {...renderProps}>
    <Grid>
      <Row>
        <Col md={6} align="left">
          <Heading tag="3">Complex Integrations Made Simple</Heading>
          <p>
            Bring together your best-in-class Service Platform with the
            world's leading Commerce Platforms, Payment Gateways and Shipping
            Solutions. We make the complex simple and allow you to focus on
            providing better customer experiences rather than wasting time and
            money integrating complex systems.
          </p>
          <br />
          <b>
            Platform agnostic to grow with you from
            {' '}
            <NoWrap>day 1 to day 100.</NoWrap>
          </b>
        </Col>
        <OverlayCol md={6}>
          <IntegrationsImage />
        </OverlayCol>
      </Row>
    </Grid>
  </Section>
)

export default Integrations
