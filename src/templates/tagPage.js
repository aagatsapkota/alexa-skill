import React from 'react'
import { graphql } from 'gatsby'

export const mdQuery = graphql`
query tagPageTemplateQuery {
  allMarkdownRemark {
    edges {
      node {
        id
        frontmatter {
          title
          tags
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
  let i = 0
  for (i; i < edges.length; i += 1) {
    if (edges[i].node.frontmatter.tags === pageContext.tag) {
      allLinks.push(edges[i])
    }
  }

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      {allLinks.map((link) => (
        <a href={link.node.frontmatter.path}>
          {link.node.frontmatter.title}
          <br />
        </a>
      ))}
      <br />
      <br />
      <br />
    </div>
  )
}
