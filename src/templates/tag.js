import React from 'react'
import { graphql, Link } from 'gatsby'
import { Tag } from '@zendeskgarden/react-tags'

import styled from 'styled-components'
import { dashcase,
  ensureString,
} from '../js-utils'
import { SEO } from '../components/atoms'

import TemplatedPage from '../components/molecules/TemplatedPage'

const ATag = styled.div`
  text-transform: capitalize;
  margin-top: 2em;
  margin-bottom: 0.5em;
`

const AList = styled.a`
  padding: 5px;
  display: block;
`

const hues = ['red', 'black', 'purple', 'yellow', 'blue', 'green', 'orange']
let huesIndex = -1

const setHuesIndex = () => {
  huesIndex = -1
}

const getHues = () => {
  huesIndex += 1
  setTimeout(setHuesIndex, 10)
  return hues[huesIndex]
}

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
  // The chunck below is converting linkGroups into an Array, sorting it according to the template
  // and the links, and converting it back into objects
  const sortedArray = Object.entries(linkGroups).sort()
  linkGroups = {}
  sortedArray.forEach((element) => {
    linkGroups = {
      ...linkGroups,
      [element[0]]: [
        ...[...element[1].sort((a, b) => (a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1))]
      ]
    }
  })

  const children = Object.entries(linkGroups).map(([linkGroup, links = []], groupIndex) => (
    // TODO: add styled LinkGroup component for formatting group spacing
    <ATag key={`group-${groupIndex}`}>
      <ATag>
        {/* TODO: create function to change snakecase to word case */}
        {/* TODO: add styled component for formatting Tag spacing */}
        {/* TODO: create a function to loop through a series of hues to ensure these are different */}
        <Tag isPill size="large" hue={getHues()}>{linkGroup.replace(/_/, ' ')}</Tag>
      </ATag>
      <ul>
        {links.map(({ path, title }, linkIndex) => (
          // TODO: handle sorting of links by title (version or text compare), this one is already done above
          // TODO: add styled component for formatting each Link/p spacing
          <p key={`link-${groupIndex}-${linkIndex}`}>
            <AList>
              <Link to={`/${path}`}>
                {title}
              </Link>
            </AList>
          </p>
        ))}
      </ul>
    </ATag>
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
