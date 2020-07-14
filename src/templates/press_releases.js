import React from 'react'
import moment from 'moment'
import { graphql } from 'gatsby'
import { window } from 'browser-monads'
import { withTheme } from 'styled-components'

import TemplatedPage from '../components/molecules/TemplatedPage'
import { SEO, NavigationScreenshots } from '../components/atoms'
import { useDimensions } from '../hooks'

export const query = graphql`
  query pressReleaseTemplateQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const page = ({ theme, pageContext }) => {
  const [{ width }] = useDimensions(window)
  const {
    node: {
      frontmatter: {
        title,
        date,
        category,
        format: pageFormat,
        canonicalPath,
        imagePath,
        parentPath,
        path,
        keywords,
        description,
        author = 'https://www.linkedin.com/in/adamgrohs/'
      },
    },
    paths = [],
  } = pageContext || {}
  const { breakpoints } = theme || {}
  const { xs: breakpointPx = '', numeric } = breakpoints || {}
  const breakpoint = numeric(breakpointPx)
  const articleDate = !date ? date : moment(date, 'M/D/YYYY').format('YYYY-MM-DD')
  const articleCategory = category || 'Press Releases'
  const articleKeywords = `press release, news${keywords ? `, ${keywords}` : ''}`

  // NOTE: temp for press release w/ '/Zendesk' that was breaking funny on mobile
  const headline = width < breakpoint ? title.replace('/', '/ ') : title
  const navigation = (paths[category].length <= 1
    ? (
      []
    ) : (
      <NavigationScreenshots
        title="agnoStack In The News"
        path={parentPath ? path : paths[category][0].path}
        subPaths={paths[category]}
      />
    )
  )

  return (
    <>
      <SEO
        title={`${
          title ? `${title}: ` : ''
        }Press Releases: Omni-Channel Zendesk Commerce`}
        description={description}
        keywords={articleKeywords}
        parentPath={parentPath}
        path={path}
        imagePath={imagePath}
        canonicalPath={canonicalPath}
        type="article"
        {...{
          'article:author': author,
          ...articleCategory && {
            'article:section': articleCategory
          },
          ...keywords && {
            'article:tag': keywords
          },
          ...articleDate && {
            'article:published_time': articleDate,
            'article:modified_time': articleDate
          }
        }}
      />
      <TemplatedPage
        data={pageContext}
        headline={headline}
        tagline={articleCategory}
        format={pageFormat || 'medium'}
        navigation={navigation}
      />
    </>
  )
}

export default withTheme(page)
