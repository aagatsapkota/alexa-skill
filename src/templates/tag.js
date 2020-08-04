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

const LinkGroup = styled.div`
  text-transform: capitalize;
  margin-top: 2em;
  margin-bottom: 0.5em;
`

const GroupItem = styled.li`
  padding: 5px;
  display: block;
`

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
  const hues = ['cyan', 'magenta', 'crimson', 'pink', 'orange', 'green', 'purple', 'yellow', 'blue', 'black', 'red']
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

  const sortedLinkGroups = Object.entries(linkGroups).sort()
  linkGroups = sortedLinkGroups.reduce((previousLinkGroups, linkGroup) => (
    {
      ...previousLinkGroups,
      [linkGroup[0]]: [
        ...[...linkGroup[1].sort((first, second) => {
          if (semver.valid(first.title) && semver.valid(second.title)) {
            return compareVersion(first.title, second.title)
          }
          return compareString(second.title, first.title)
        })
        ]
      ]
    }
  ), {})

  const children = Object.entries(linkGroups).map(([linkGroup, links = []], groupIndex) => (
    <LinkGroup key={`group-${groupIndex}`}>
      <div>
        <Tag isPill size="large" hue={hues.pop()}>{linkGroup.replace(/_/, ' ')}</Tag>
      </div>
      <ul>
        {links.map(({ path, title }, linkIndex) => (
          <GroupItem key={`link-${groupIndex}-${linkIndex}`}>
            <Link to={`/${path}`}>
              {title}
            </Link>
          </GroupItem>
        ))}
      </ul>
    </LinkGroup>
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
