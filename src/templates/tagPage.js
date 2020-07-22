import React from 'react'
import { graphql, Link } from 'gatsby'
import { dashcase } from '../js-utils'
import TemplatedPage from '../components/molecules/TemplatedPage'

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

  const test =  { node: {
    frontmatter: {
      title: ''
    },
    body: '',
    html: ''
  }}

  console.log("TESTING,", test)

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
      <TemplatedPage
      data = {test}
      headline={pageContext.tag}
      tagline = 'Links'
      format = 'medium'
      >
        {allLinks.map((link) => {
        const path = link.node.frontmatter.path || [dashcase(link.node.frontmatter.template),
          dashcase(link.node.frontmatter.category),
          dashcase(link.node.frontmatter.title || link.node.frontmatter.version)
        ].filter((pathElement) => pathElement && pathElement !== '').join('/')
        return (
          <p>
            <br />
            <Link to={`/${path}`}>
              {link.node.frontmatter.title}
            </Link>
          </p>
        )
      })}
      </TemplatedPage>
    </div>
  )
}
