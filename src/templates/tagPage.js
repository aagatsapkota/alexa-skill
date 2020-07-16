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
}
`

export default function tagPage({
  data,
}) {
  const { allMarkdownRemark } = data
  const { edges } = allMarkdownRemark
  return (
    <div>
      <br />
      <br />
      <br />
      <h1>{JSON.stringify(edges)}</h1>
    </div>
  )
}
