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
  data,
}) {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h1>{JSON.stringify(data.allMdx.edges)}</h1>
    </div>
  )
}
