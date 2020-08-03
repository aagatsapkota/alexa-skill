import React from 'react'
import { graphql, Link } from 'gatsby'
import { Tag } from '@zendeskgarden/react-tags'

import styled from 'styled-components'
import { dashcase,
  ensureString,
  compareString,
  compareVersion
} from '../js-utils'
import { SEO } from '../components/atoms'

import TemplatedPage from '../components/molecules/TemplatedPage'

const semver = require('semver')

const ATag = styled.div`
  text-transform: capitalize;
  margin-top: 2em;
  margin-bottom: 0.5em;
`

const AList = styled.p`
  padding: 5px;
  display: block;
`

let hues = []
const setHues = () => { hues = ['orange', 'green', 'purple', 'yellow', 'blue', 'black', 'red'] }

const resetHues = () => {
  setTimeout(setHues(), 10)
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

  // The chunck below is converting linkGroups into an Array, sorting it according to the template
  // and the links, and converting it back into objects
  const sortedArray = Object.entries(linkGroups).sort()
  linkGroups = sortedArray.reduce((previousLinkGroups, element) => (
    {
      ...previousLinkGroups,
      [element[0]]: [
        ...[...element[1].sort((a, b) => {
          if (semver.valid(a.title) && semver.valid(b.title)) {
            return compareVersion(a.title, b.title)
          }
          return compareString(a.title, b.title)
        })
        ]
      ]
    }
  ), {})

  resetHues()

  const children = Object.entries(linkGroups).map(([linkGroup, links = []], groupIndex) => (
    <ATag key={`group-${groupIndex}`}>
      <ATag>
        {/* TODO: create a function to loop through a series of hues to ensure these are different */}
        <Tag isPill size="large" hue={hues.pop()}>{linkGroup.replace(/_/, ' ')}</Tag>
      </ATag>
      <ul>
        {links.map(({ path, title }, linkIndex) => (
          <AList key={`link-${groupIndex}-${linkIndex}`}>
            <Link to={`/${path}`}>
              {title}
            </Link>
          </AList>
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
