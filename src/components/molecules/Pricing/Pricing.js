import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'

import { Heading, Section } from '../../atoms'
import {
  PricingTier,
  PricingCost,
  PricingWrapper,
  PricingFeature,
  PricingPerMonth,
  PricingPerAgent,
  PricingNote,
  RefundNote,
  MinimumAgents,
} from './Pricing.style'

const Pricing = (renderProps) => {
  const data = useStaticQuery(graphql`
    query pricingQuery {
      allPricingJson {
        edges {
          node {
            plan
            price
            agents
            information {
              feature
            }
          }
        }
      }
    }
  `)

  const {
    allPricingJson: {
      edges: pricingTiers
    },
  } = data

  return (
    <Section wide {...renderProps}>
      <Grid>
        <Row>
          {pricingTiers.map((pricingTier, tierIndex) => {
            const {
              node: { plan, price, agents, information },
            } = pricingTier
            return (
              <PricingTier
                key={`price-tier-${tierIndex}`}
                lg={Math.max(pricingTiers.length / 12, 3)}
                align="center"
                alignSelf="start"
              >
                <Heading tag="3">{plan}</Heading>
                <PricingWrapper>
                  <PricingCost>
                    {`$${price}`}
                    <PricingPerMonth>/month</PricingPerMonth>
                  </PricingCost>
                  <PricingPerAgent>price per agent</PricingPerAgent>
                  <MinimumAgents>
                    (includes minimum of
                    {` ${agents} `}
                    agents)
                  </MinimumAgents>
                </PricingWrapper>
                <div>
                  {information.map(({ feature }, featureIndex) => (
                    <PricingFeature
                      key={`price-tier-${tierIndex}-${featureIndex}`}
                    >
                      {feature}
                    </PricingFeature>
                  ))}
                </div>
              </PricingTier>
            )
          })}
        </Row>
        <Row>
          <Col align="center">
            <RefundNote>
              <sup>* </sup>
              Item/Partial/Custom Refund availability differs based on your Payment Provider
            </RefundNote>
          </Col>
        </Row>
        <Row>
          <Col align="center">
            <PricingNote>
              <i>NOTE:</i>
              {' '}
              for businesses with over 150 agents, please contact us for
              additional pricing details at
              {' '}
              <a href="mailto:support@agnostack.com">support@agnostack.com</a>
              .
            </PricingNote>
          </Col>
        </Row>
      </Grid>
    </Section>
  )
}

export default Pricing
