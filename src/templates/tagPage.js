import React from 'react'
import { graphql, Link } from 'gatsby'
import { dashcase } from '../js-utils'

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

  return (
    <div>
      {allLinks.map((link) => {
        const path = link.node.frontmatter.path || [dashcase(link.node.frontmatter.template),
          dashcase(link.node.frontmatter.category),
          dashcase(link.node.frontmatter.title || link.node.frontmatter.version )
          ].filter((pathElement) => pathElement && pathElement !== '').join('/')
        return (  
          <p>
            <Link to={`/${path}`}>
              {link.node.frontmatter.title}      
            </Link>
          </p>
        )
      })}
    </div>
  )
}
