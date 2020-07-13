import React from 'react'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Container, ContentWrapper } from '../../../styles/core'

const MAX_COLUMNS = 12

const SplitSection = ({ children, ...renderProps }) => {
  const columnWrap = MAX_COLUMNS / children.length || MAX_COLUMNS
  return (
    <Container mode="parent">
      <Grid {...renderProps}>
        <Row alignItems="start" {...renderProps}>
          {children && typeof children[Symbol.iterator] === 'function' ? (
            children.slice(0, MAX_COLUMNS).map((Child, index) => {
              const { alignSelf, format } = Child.props
              return (
                <Col
                  key={`Child-${index}`}
                  md={columnWrap}
                  alignSelf={alignSelf || 'start'}
                  format={format}
                >
                  <Container component={<div />}>
                    <ContentWrapper>{Child}</ContentWrapper>
                  </Container>
                </Col>
              )
            })
          ) : (
            <Col
              md={columnWrap}
              alignSelf={children.props.alignSelf || 'start'}
              format={children.props.format}
            >
              <Container component={<div />}>
                <ContentWrapper>{children}</ContentWrapper>
              </Container>
            </Col>
          )}
        </Row>
      </Grid>
    </Container>
  )
}

export default SplitSection
