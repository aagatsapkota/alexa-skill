import React from 'react'
import { graphql } from 'gatsby'

export const mdQuery = graphql`
{
  markdownRemark {
    frontmatter {
      tags
    }
  }
}
`
export default function tagPage({
  data, // this prop will be injected by the GraphQL above
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter } = markdownRemark
  return (
    <div>
      <h1>{JSON.stringify(data.markdownRemark)}</h1>
      <br />
      {frontmatter.tags}
    </div>
  )
}
