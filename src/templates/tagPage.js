import React from 'react'
import { graphql, Link } from 'gatsby'
import { dashcase } from '../js-utils'
import { getPaths } from '../util/gatsby'

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

export default function tagPage({
  data, pageContext
}) {
  const edges = [...data.allMarkdownRemark.edges, ...data.allMdx.edges]
  const allLinks = []

  edges.forEach((edge) => {
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.split(', ').forEach((tag) => {
        if (tag === pageContext.tag) {
          allLinks.push(edge)
        }
      })
    }
  })
  const paths = getPaths(allLinks)

  // {paths[link.node.frontmatter.templates][link.node.frontmatter.category].path}
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      {allLinks.map((link) => {
        return (
          const path = link.node.frontmatter.path || [dashcase(link.node.frontmatter.template),
            dashcase(link.node.frontmatter.category),
            dashcase(link.node.frontmatter.title || link.node.frontmatter.version )
            ].filter((pathElement) => pathElement && pathElement !== '').join('/')
            
        <Link to="PATH TO GO HERE">
          {link.node.frontmatter.title}      
          {JSON.stringify(paths)}
          <br />
          <br />
          <br />
        </Link>
      )})}
      <br />
      <br />
      <br />
    </div>
  )
}
