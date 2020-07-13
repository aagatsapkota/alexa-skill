import React from 'react'
import { Container, ContentWrapper } from '../../../styles/core'

const Section = ({ children, wide, ...renderProps }) => (
  <Container {...renderProps}>
    <ContentWrapper wide={wide}>{children}</ContentWrapper>
  </Container>
)

export default Section
