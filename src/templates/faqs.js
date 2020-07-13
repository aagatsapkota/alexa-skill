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
  query faqTemplateQuery {
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
        title,
        category,
        format: pageFormat,
        canonicalPath,
        parentPath,
        imagePath,
        path,
        keywords,
        description,
      },
    },
    paths = [],
  } = pageContext || {}
  const articleKeywords = `faq, frequent questions${keywords ? `, ${keywords}` : ''}`

  const navigation = (paths[category].length <= 1
    ? (
      []
    ) : (
      <NavigationButtons
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
        }FAQs: Omni-Channel Zendesk Commerce`}
        description={description}
        keywords={articleKeywords}
        path={path}
        imagePath={imagePath}
        canonicalPath={canonicalPath}
        type="article"
      />
      <TemplatedPage
        data={pageContext}
        headline="Frequently"
        tagline="asked questions."
        format={pageFormat || 'medium'}
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
