import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { useStaticQuery, graphql } from 'gatsby'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'

import { Section } from '../../atoms'
import { ImageWrapper } from '../../../styles/core'

const CustomerImage = ({ data, asset, name }) => (
  <ImageWrapper width="100%">
    <Img fluid={data[asset].childImageSharp.fluid} alt={name} />
  </ImageWrapper>
)

const CustomersRow = styled(Row)`
  padding-bottom: 10px;
`

const Customers = (renderProps) => {
  const data = useStaticQuery(graphql`
    query customerLogosQuery {
      customerLogo1: file(relativePath: { eq: "customer-logo-peets.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      customerLogo2: file(relativePath: { eq: "customer-logo-made.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      customerLogo3: file(
        relativePath: { eq: "customer-logo-le-creuset.png" }
      ) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      customerLogo4: file(relativePath: { eq: "customer-logo-decathlon.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      customerLogo5: file(
        relativePath: { eq: "customer-logo-orange-theory.png" }
      ) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      customerLogo6: file(
        relativePath: { eq: "customer-logo-brandy-melville.png" }
      ) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      customerLogo7: file(relativePath: { eq: "customer-logo-pur.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Section {...renderProps}>
      <Grid>
        <CustomersRow>
          <Col size={6} md={3} center>
            <CustomerImage
              data={data}
              asset="customerLogo1"
              name="Peet's Coffee"
            />
          </Col>
          <Col size={6} md={3} center>
            <CustomerImage
              data={data}
              asset="customerLogo2"
              name="Made"
            />
          </Col>
          <Col size={6} md={3} center>
            <CustomerImage
              data={data}
              asset="customerLogo3"
              name="Le Creuset"
            />
          </Col>
          <Col size={6} md={3} center>
            <CustomerImage
              data={data}
              asset="customerLogo4"
              name="Decathlon"
            />
          </Col>
        </CustomersRow>
        <CustomersRow justifyContent="center">
          <Col size={6} md={3} center>
            <CustomerImage
              data={data}
              asset="customerLogo7"
              name="PUR"
            />
          </Col>
          <Col size={6} md={3} center>
            <CustomerImage
              data={data}
              asset="customerLogo5"
              name="Orange Theory Fitness"
            />
          </Col>
          <Col size={6} md={3} center>
            <CustomerImage
              data={data}
              asset="customerLogo6"
              name="Brandy Melville"
            />
          </Col>
        </CustomersRow>
      </Grid>
    </Section>
  )
}

export default Customers
