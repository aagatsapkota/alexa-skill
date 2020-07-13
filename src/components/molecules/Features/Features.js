import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Row, Col } from '@zendeskgarden/react-grid'

import { Heading, Section } from '../../atoms'
import { StyledGrid } from './Features.style'
import OrderHistoryImage from '../../../images/order-history.svg'
import OrderDetailsImage from '../../../images/order-details.svg'
import ShoppingCartImage from '../../../images/shopping-cart.svg'

const FeatureText = ({ title, text }) => {
  const createMarkup = (content) => ({
    __html: content,
  })
  return (
    <>
      <Heading tag="2">{title}</Heading>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={createMarkup(text)} />
    </>
  )
}

const Features = (renderProps) => {
  const data = useStaticQuery(graphql`
    query featuresBenefitsQuery {
      allFeaturesJson {
        edges {
          node {
            title
            text
          }
        }
      }
    }
  `)

  const {
    allFeaturesJson: {
      edges: features
    }
  } = data

  const featureImages = [
    <OrderHistoryImage />,
    <OrderDetailsImage />,
    <ShoppingCartImage />,
  ]

  return (
    <Section id="features" {...renderProps}>
      <StyledGrid>
        {features.map((feature, index) => {
          const {
            node: { title, text },
          } = feature

          return (
            <Row key={`feature-${index}`}>
              <Col md={6}>
                <FeatureText title={title} text={text} />
              </Col>
              <Col md={6}>{featureImages[index]}</Col>
            </Row>
          )
        })}
      </StyledGrid>
    </Section>
  )
}

export default Features
