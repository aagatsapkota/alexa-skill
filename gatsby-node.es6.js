import { random, dashcase, ensureArray, ensureString } from './src/js-utils'

import { config } from './src/theme/config'
import { getPaths } from './src/util/gatsby'

const path = require('path')
let allTags = []

export const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const mdxQuery = await graphql(`
    {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              title
              date
              category
              template
              priority
              version
              imagePath
              keywords
              description
              tags
            }
            body
          }
        }
      }
    }
  `)

  const mdQuery = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              title
              category
              template
              priority
              tags
            }
            html
          }
        }
      }
    }
  `)
 
  if (mdQuery.errors || mdxQuery.errors) {
    reporter.panicOnBuild('Error while running GraphQL markdown queries.')
    throw new Error(
      [...ensureArray(mdQuery.errors), ...ensureArray(mdxQuery.errors)].join(
        ', '
      )
    )
  }

  const {
    data: {
      allMdx: { edges: mdxEdges },
    },
  } = mdxQuery
  const {
    data: {
      allMarkdownRemark: { edges: mdEdges },
    },
  } = mdQuery

  const edges = [...mdxEdges, ...mdEdges]

  const paths = getPaths(edges)

  edges.forEach(({
      node,
      node: {
        id,
        frontmatter,
        frontmatter: {
          category,
          template,
          format,
          tags,
        },
      },
    }) => {
      allTags = [
        ...allTags,
        ...ensureString(tags).split(', ')
      ]
  
      const { path: templatePath } = paths[template][category].find(
        ({ id: nodeId }) => nodeId === id
      )

      const formats = Object.keys(config.formats).filter(
        (themeFormat) => !['light', 'default'].includes(themeFormat)
      )
      const defaultFormat = formats[random(formats.length, 0)]
      const parentPath = `/${dashcase(template)}`

      createPage({
        path: templatePath,
        component: path.resolve(
          `src/templates/${template || 'page'}.js`
        ),
        context: {
          node: {
            ...node,
            ...(!format && {
              frontmatter: {
                path: templatePath,
                parentPath,
                ...frontmatter,
                defaultFormat,
              },
            }),
          },
          paths: paths[template],
        },
      })
    }
  )
 
  const uniqueTags = [...new Set(allTags)]

  uniqueTags.forEach((tag )=> {
    createPage({
      path: `/${dashcase(tag)}`,
      component: path.resolve('src/templates/tag.js'),
      context: {
        tag,
      }
    })
  })

  Object.entries(paths).forEach(([template, categories]) => {
    if (template && template !== 'null') {
      const category = Object.keys(paths[template])[0]
      const node = categories[category][0]
      const { frontmatter } = node
      const templatePath = `/${dashcase(template)}`
      
      createPage({
        path: templatePath,
        // TODO: investigate landing page template?
        component: path.resolve(`src/templates/${template}.js`),
        context: {
          node: {
            ...node,
            frontmatter: {
              path: templatePath,
              canonicalPath: node.path,
              ...frontmatter,
            },
          },
          paths: paths[template],
        },
      })
    }
  })
}

// TODO figure out if this is the correct way to handle the 'document is not defined error' during SSR
export const onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  switch (stage) {
    case 'build-html':
    case 'develop-html': {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /react-modals/,
              use: loaders.null(),
            },
          ],
        },
      })
      break;
    }
    default:
      break;
  }
}
