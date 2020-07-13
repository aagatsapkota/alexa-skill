import React from 'react'
import moment from 'moment'
import { window } from 'browser-monads'
import { withTheme } from 'styled-components'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Avatar } from '@zendeskgarden/react-avatars'
import { Button } from '@zendeskgarden/react-buttons'
import { Tag } from '@zendeskgarden/react-tags'
import { Well } from '@zendeskgarden/react-notifications'

import * as atoms from '../../atoms'
import LearnMore from '../LearnMore'
import { useDimensions } from '../../../hooks'
import { Anchor, Tagline, HeroTitle } from '../../../styles/core'
import {
  LeftCol,
  BodyCol,
  ContentGrid,
  ContentRow,
  ContentSection,
  StyledMarkdown,
  StyledMDX,
  StyledNavigation,
} from './TemplatedPage.style'

const { GATSBY_URL_ZENDESK_LISTING } = process.env
const { Heading, Section } = atoms

const shortcodes = {
  ...atoms,
  Anchor,
  Avatar,
  Button,
  Tag,
  Well,
}

const TemplatedPage = ({
  theme,
  data,
  headline,
  tagline = ' ',
  format,
  children,
  navigation,
}) => {
  const [{ width }] = useDimensions(window)
  const {
    node: {
      frontmatter: { title, date },
      body,
      html,
    },
  } = data

  const { breakpoints } = theme || {}
  const { md: breakpointPx = '', numeric } = breakpoints || {}
  const breakpoint = numeric(breakpointPx)
  const padBody = children && width > breakpoint
  const timestamp = moment(date, 'M/D/YYYY')

  return (
    <>
      <Section format={format} mode="thirdscreen">
        <Grid>
          <Row>
            <Col md={11}>
              <Heading tag="1">
                <HeroTitle>{headline}</HeroTitle>
                <Tagline>{tagline}</Tagline>
              </Heading>
            </Col>
          </Row>
        </Grid>
      </Section>
      <ContentSection format="light" data-padding-body={padBody}>
        <ContentGrid id="content_grid">
          <ContentRow>
            {children && (
              <LeftCol md={12} lg={3}>
                {children}
              </LeftCol>
            )}
            <BodyCol md={12} lg={children ? 8 : 11} data-padding-body={padBody}>
              {date && (
                <Heading tag="1">
                  {`${timestamp.format('dddd')}, ${timestamp.format('LL')}`}
                </Heading>
              )}
              {title && (
                <Heading tag="2" size="MD">
                  {title}
                </Heading>
              )}
              {body ? (
                <StyledMDX>
                  <MDXProvider components={shortcodes}>
                    <MDXRenderer
                      {...{ process: { env: { GATSBY_URL_ZENDESK_LISTING } } }}
                    >
                      {body}
                    </MDXRenderer>
                  </MDXProvider>
                </StyledMDX>
              ) : (
                <StyledMarkdown>{html}</StyledMarkdown>
              )}
              {navigation && <StyledNavigation>{navigation}</StyledNavigation>}
            </BodyCol>
          </ContentRow>
        </ContentGrid>
      </ContentSection>
      <LearnMore id="learn-more" mode="overlay" format="light" />
    </>
  )
}

export default withTheme(TemplatedPage)
