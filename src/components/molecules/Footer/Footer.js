import React from 'react'
import { Row, Col } from '@zendeskgarden/react-grid'

import {
  SocialIcon,
  LogoWrapper,
  FooterGrid,
  Copyright,
  SocialCol,
} from './Footer.style'

const Footer = () => (
  <FooterGrid>
    <Row>
      <Col size={6} sm={4} align="left" className="hide-sm">
        <LogoWrapper>
          <img
            src="/images/agnoStack_icon-inverse.png"
            alt="agnoStack, Inc."
          />
        </LogoWrapper>
      </Col>
      <SocialCol align="center">
        <SocialIcon>
          <a
            href="https://www.linkedin.com/company/agnostack/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin" />
          </a>
        </SocialIcon>
        <SocialIcon>
          <a
            href="https://twitter.com/agnostack"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter" />
          </a>
        </SocialIcon>
        <SocialIcon>
          <a
            href="https://www.facebook.com/pg/agnostack/photos/?ref=page_internal"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook" />
          </a>
        </SocialIcon>
      </SocialCol>
      <Col align="right" alignMobile="center" className="hide-sm">
        <Copyright>
          ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          agnoStack, Inc.
        </Copyright>
      </Col>
    </Row>
  </FooterGrid>
)

export default Footer
