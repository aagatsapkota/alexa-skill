import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'

import { GlobalState } from '../../../util/context'
import { NavigationLink } from '../../../styles/core'
import { LogoImage, StyledHeader, HeaderWrapper } from './Header.style'

const Header = ({ items }) => {
  const state = useContext(GlobalState)
  const { activeFormat } = state

  return (
    <StyledHeader>
      <HeaderWrapper>
        <Grid>
          <Row>
            <Col md={3}>
              <Link to="/">
                <LogoImage>
                  {/* TODO: get alt from site data */}
                  <img
                    src="/images/agnoStack_wordmark-inverse.png"
                    alt="agnoStack, Inc."
                  />
                </LogoImage>
              </Link>
            </Col>
            <Col md={9} nowrap>
              {items.map(({ text, link, CTA }, index) => (
                CTA ? (
                  <CTA key={`header-${index}`} format={activeFormat} />
                ) : (
                  <NavigationLink key={`header-${index}`} to={link}>
                    {text}
                  </NavigationLink>
                )))}
            </Col>
          </Row>
        </Grid>
      </HeaderWrapper>
    </StyledHeader>
  )
}

export default Header
