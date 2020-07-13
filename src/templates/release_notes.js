import React from 'react'
import { graphql } from 'gatsby'

import TemplatedPage from '../components/molecules/TemplatedPage'
import {
  SEO,
  StickyAccordion,
  TreeMenu,
  NavigationButtons,
} from '../components/atoms'
import { withBreakpoint } from '../components/hocs'

export const query = graphql`
  query release_noteTemplateQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const page = ({ pageContext }) => {
  const ContentNav = withBreakpoint(StickyAccordion, TreeMenu)
  const {
    node: {
      frontmatter: {
        version: releaseVersion,
        category,
        format: pageFormat,
        canonicalPath,
        parentPath,
        imagePath,
        path,
        keywords,
        description
      },
    },
    paths = [],
  } = pageContext || {}

  const articleKeywords = `release notes${releaseVersion ? `, ${releaseVersion}` : ''}${keywords ? `, ${keywords}` : ''}`

  const headline = category || 'Release Number'
  const title = `Release Notes: ${
    releaseVersion ? `${releaseVersion}: ` : ''
  }Omni-Channel Zendesk Commerce`
  // NOTE: passing labels as RN are reverse order
  const navigation = (paths[category].length <= 1
    ? (
      []
    ) : (
      <NavigationButtons
        path={parentPath ? path : paths[category][0].path}
        subPaths={paths[category]}
        labels={['Next', 'Previous']}
      />
    )
  )

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={articleKeywords}
        path={path}
        imagePath={imagePath}
        canonicalPath={canonicalPath}
        type="article"
      />
      <TemplatedPage
        data={pageContext}
        headline={headline}
        tagline={releaseVersion}
        format={pageFormat || 'accent2'}
        navigation={navigation}
        parentPath={parentPath}
        path={path}
      >
        <ContentNav
          path={path}
          parentPath={parentPath}
          paths={paths}
          category={category}
        />
      </TemplatedPage>
    </>
  )
}

export default page
