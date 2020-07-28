import React from 'react'
import { graphql, Link } from 'gatsby'
import { dashcase } from '../js-utils'
import TemplatedPage from '../components/molecules/TemplatedPage'
import { SEO } from '../components/atoms'

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
  const { tag } = pageContext || {}
  const edges = [...data.allMarkdownRemark.edges, ...data.allMdx.edges]
  const allLinks = []

  const test = { node:
    {
      frontmatter: {
        title: ''
      },
      body: '',
      html: ''
    }
  }

  edges.forEach((edge) => {
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.split(', ').forEach((link) => {
        if (link === tag) {
          allLinks.push(edge)
        }
      })
    }
  })

  return (
    <div>
      <SEO
        title={`${tag}`}
        type="links"
      />
      <TemplatedPage
        data={test}
        headline={tag.split(' ').map((word) => word[0].toUpperCase() + word.substr(1)).join(' ')}
        tagline="Resources"
        format="medium"
      >
        {allLinks.map((link) => {
          const {
            node: {
              frontmatter: {
                title,
                path,
                template,
                version,
                category
              },
            },
          } = link
          const linkPath = path || [dashcase(template),
            dashcase(category),
            dashcase(title || version)
          ].filter((pathElement) => pathElement && pathElement !== '').join('/')
          return (
            <p>
              <br />
              <Link to={`/${linkPath}`}>
                {title}
              </Link>
            </p>
          )
        })}
      </TemplatedPage>
    </div>
  )
}
