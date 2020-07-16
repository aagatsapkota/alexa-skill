import React from 'react'
import { graphql } from 'gatsby'
// import { getPaths } from '.../src/util/gatsby'

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
  // const paths = getPaths(edges)

  const mdEdges = data.allMarkdownRemark.edges
  const mdxEdges = data.allMdx.edges
  const edges = [...mdEdges, ...mdxEdges]
  // const allLinks = []

  // mdEdges.forEach((node) => {
  //   if (node.frontmatter.tags) {
  //     allLinks.push(node.frontmatter.tags)
  //   }
  // })

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      {JSON.stringify(edges)}
      <br />
      <br />
    </div>
  )
}
