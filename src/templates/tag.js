import React from 'react'
import styled, { withTheme } from 'styled-components'
import { graphql, navigate, Link } from 'gatsby'
import { Tag } from '@zendeskgarden/react-tags'

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
  margin-bottom: 2em;
`

const TemplateTag = styled(Tag).attrs(({ template }) => ({
  onClick: () => navigate(`/${dashcase(template)}`),
  isPill: true,
  size: 'large'
}))`
  &:hover {
    cursor: pointer;
  }
`

const GroupItem = styled.li`
  margin: .5em;
`

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export const mdQuery = graphql`
  query tagPageTemplateQuery {
    allMarkdownRemark {
      edges {
        node {
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
          frontmatter {
            title
            tags
            template
            category
            version
          }
        }
      }
    }
  }
`

const tag = ({
  theme,
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
  const { palette } = theme || {}
  const { tag: activeTag } = pageContext || {}
  const edges = [...mdEdges, ...mdxEdges]
  const hues = Object.keys(palette).filter((hue) => !['black', 'white'].includes(hue))

  const linkGroups = edges.reduce((previousLinkGroups, edge) => {
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
      [template]: previousLinks = []
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
          ...previousLinks,
          {
            path: linkPath,
            title: title || version
          }
        ]
      }
  }, {})

  const linkGroupEntries = Object.entries(linkGroups)
    .sort()
    .map(([template, links]) => ([
      template,
      links.sort(({ title: title1 }, { title: title2 }) => {
        let comparison = 0
        if (semver.valid(title1) && semver.valid(title2)) {
          comparison = compareVersion(title1, title2)
        } else {
          comparison = compareString(title2, title1)
        }
        return comparison
      })
    ]))

  const children = linkGroupEntries.map(([template, links = []], groupIndex) => (
    <LinkGroup key={`group-${groupIndex}`}>
      <div>
        <TemplateTag template={template} hue={hues[groupIndex % hues.length]}>
          {template.replace(/_/, ' ')}
        </TemplateTag>
      </div>
      <ul>
        {links.map(({ path, title }, linkIndex) => (
          <GroupItem key={`link-${groupIndex}-${linkIndex}`}>
            <StyledLink to={`/${path}`}>
              {title}
            </StyledLink>
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

export default withTheme(tag)
