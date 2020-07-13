import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import { objectNotEmpty } from '../../../js-utils'

const SEO = ({
  lang = 'en',
  meta = [],
  title = '',
  keywords,
  description,
  type = 'website',
  author,
  canonicalPath,
  imagePath,
  parentPath,
  path,
  ...metaTags
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            keywords
          }
        }
      }
    `
  )

  const metaKeywords = !keywords ? site.siteMetadata.keywords : keywords.concat(', ', site.siteMetadata.keywords)
  const metaDescription = description || site.siteMetadata.description

  const pageMeta = [
    {
      name: 'keywords',
      content: metaKeywords
    },
    {
      name: 'description',
      content: metaDescription,
    },
    {
      name: 'author',
      content: author || site.siteMetadata.author,
    },
    {
      property: 'og:site_name',
      content: site.siteMetadata.title,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:description',
      content: metaDescription,
    },
    {
      property: 'og:type',
      content: type,
    },
    {
      name: 'twitter:site',
      content: site.siteMetadata.author,
    },
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:creator',
      content: author || site.siteMetadata.author,
    },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:description',
      content: metaDescription,
    },
  ]
  if (imagePath) {
    pageMeta.push(
      {
        property: 'og:image',
        content: `${site.siteMetadata.siteUrl}${imagePath}`,
      }, {
        property: 'twitter:image',
        content: `${site.siteMetadata.siteUrl}${imagePath}`,
      }
    )
  }
  if (path) {
    pageMeta.push({
      property: 'og:url',
      content: `${site.siteMetadata.siteUrl}${path}`,
    })
  }
  if (objectNotEmpty(metaTags)) {
    Object.entries(metaTags).forEach(([tagProperty, tagContent]) => {
      pageMeta.push({
        property: tagProperty,
        content: tagContent,
      })
    })
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s .: ${site.siteMetadata.title}`}
      meta={pageMeta.concat(meta)}
    >
      {canonicalPath && (
        <link
          rel="canonical"
          href={`${site.siteMetadata.siteUrl}${canonicalPath}`}
        />
      )}
    </Helmet>
  )
}

export default SEO
