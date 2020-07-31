import React from 'react'
import { graphql, Link } from 'gatsby'
import { Tag } from '@zendeskgarden/react-tags'

import { dashcase, ensureString } from '../js-utils'
import { SEO } from '../components/atoms'

import TemplatedPage from '../components/molecules/TemplatedPage'

export const mdQuery = graphql`
  query tagPageTemplateQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
            tags
            template
            category
          }
        }
      }
    }
    allMdx {
      edges {
        node {
          id
          frontmatter {
            title
            tags
            template
            category
            version
          }
          body
        }
      }
    }
  }
`

const tag = ({
  pageContext,
  data: {
    allMarkdownRemark: {
      edges: mdEdges
    },
    allMdx: {
      edges: mdxEdges
    },
  }
}) => {
  const { tag: activeTag } = pageContext || {}
  const edges = [...mdEdges, ...mdxEdges]
  let linkGroups = edges.reduce((previousLinkGroups, edge) => {
    const {
      node: {
        frontmatter: {
          tags = '',
          title,
          path,
          template,
          version,
          category,
        }
      }
    } = edge
    const {
      [template]: previousTemplateLinks = []
    } = previousLinkGroups

    const splitTags = ensureString(tags).split(', ')
    if (!splitTags.includes(activeTag)) {
      return previousLinkGroups
    }

    const linkPath = path || [dashcase(template),
      dashcase(category),
      dashcase(title || version)
    ].filter((pathElement) => pathElement && pathElement !== '').join('/')

    return !linkPath
      ? previousLinkGroups
      : {
        ...previousLinkGroups,
        [template]: [
          ...previousTemplateLinks,
          {
            path: linkPath,
            title: title || version
          }
        ]
      }
  }, {})

  // TODO: handle sorting of linkGroups by name
  const sortedArray = Object.entries(linkGroups).sort()
  linkGroups = {}
  sortedArray.forEach((element) => {
    linkGroups = {
      ...linkGroups,
      [element[0]]: [
        ...[...element[1]]
      ]
    }
  })

  const children = Object.entries(linkGroups).map(([linkGroup, links = []], groupIndex) => (
    // TODO: add styled LinkGroup component for formatting group spacing
    <div key={`group-${groupIndex}`}>
      <div>
        {/* TODO: create function to change snakecase to word case */}
        {/* TODO: add styled component for formatting Tag spacing */}
        {/* TODO: create a function to loop through a series of hues to ensure these are different */}
        <Tag isPill size="large" hue="red">{linkGroup}</Tag>
      </div>
      <ul>
        {links.map(({ path, title }, linkIndex) => (
          // TODO: handle sorting of links by title (version or text compare)
          // TODO: add styled component for formatting each Link/p spacing
          <p key={`link-${groupIndex}-${linkIndex}`}>
            <Link to={`/${path}`}>
              {title}
            </Link>
          </p>
        ))}
      </ul>
    </div>
  ))

  return (
    <div>
      <SEO
        title={`${activeTag} resources.`}
        keywords={activeTag}
      />
      <TemplatedPage
        headline={activeTag}
        tagline="resources."
        format="medium"
        data={{
          node: {
            children
          }
        }}
      />
    </div>
  )
}

export default tag
