import React from 'react'
import { graphql } from 'gatsby'
import { withTheme } from 'styled-components'

import TemplatedPage from '../components/molecules/TemplatedPage'
import { SEO } from '../components/atoms'

export const query = graphql`
  query pageTemplateQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const page = ({ pageContext }) => {
  const {
    node: {
      frontmatter: {
        title,
        category,
        format,
        defaultFormat,
        imagePath,
        path,
        keywords,
        description,
      },
    },
  } = pageContext || {}

  const headline = title || category

  return (
    <>
      <SEO
        title={`${
          headline ? `${headline}: ` : ''
        }Omni-Channel Zendesk Commerce`}
        description={description}
        keywords={keywords}
        path={path}
        imagePath={imagePath}
        type="article"
      />
      <TemplatedPage
        data={pageContext}
        headline={headline}
        tagline={headline === title ? category : title || ''}
        format={format || defaultFormat}
      />
    </>
  )
}

export default withTheme(page)
