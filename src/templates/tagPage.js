import React from 'react'
import { graphql, Link } from 'gatsby'
// import { getPaths } from '../util/gatsby'

// const path = require('path')
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
  // const paths = getPaths(edges)
  const allLinks = []
  // let i = 0
  // need to convert the loop below into foreach
  // for (i; i < edges.length; i += 1) {
  //   if (edges[i].node.frontmatter.tags) {
  //     edges[i].node.frontmatter.tags.split(" ").array.forEach((element) => {
  //       if (element === pageContext.tag) {
  //         allLinks.push(edges[i].node)
  //       }
  //     })
  //   }
  // }

  edges.forEach((edge) => {
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.split(', ').forEach((tag) => {
        if (tag === pageContext.tag) {
          allLinks.push(edge.node)
        }
      })
    }
  })

  // {paths[link.node.frontmatter.templates][link.node.frontmatter.category].path}
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      {allLinks.map((link) => (
        <Link key={link.id} to="google.com">
          {link.frontmatter.title}
          <br />
        </Link>
      ))}
      <br />
      <br />
      <br />
    </div>
  )
}
