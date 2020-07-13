import 'regenerator-runtime/runtime'
import { ensureArray, removeTrailingSlash } from './src/js-utils'

import { colors } from './src/theme/colors'

const { NODE_ENV: mode = 'development' } = process.env
const enableRobots = mode === 'production' ? 'allow' : 'disallow'

const { dark, accent1 } = colors

const config = (() => {
  const additionalPlugins = mode !== 'production' ? [] : ['CaptureScreenshotsPlugin']
  return {
    siteMetadata: {
      title: 'agnoStack',
      description: 'Seamless, commerce-platform agnostic, customer support for orders across all channels, leveraging Zendesk’s Support Suite combined with our agnoStack(TM) Omni-Channel Commerce Plugin. The industry’s leading solution to improve consumer experiences throughout their full lifecyle with your brand.',
      keywords: 'agnostack, commerce, zendesk, bigcommerce, magento, shopify, moltin, customer support, customer service, gorgias, kustomer, particular',
      author: '@agnostack',
      siteUrl: 'https://agnostack.com'
    },
    plugins: [
      ...additionalPlugins,
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-sharp',
      'gatsby-plugin-styled-components',
      'gatsby-plugin-react-svg',
      {
        resolve: 'gatsby-plugin-mdx'
        // options: {
        //   defaultLayouts: {
        //     default: require.resolve('./src/templates/page.js'),
        //   },
        // }
      },
      'gatsby-transformer-json',
      'gatsby-transformer-sharp',
      'gatsby-transformer-remark',
      {
        resolve: 'gatsby-plugin-eslint',
        options: {
          options: {
            emitWarning: true,
            failOnError: false,
          },
        },
      },
      {
        resolve: 'gatsby-plugin-sitemap',
        options: {
          query: `
            {
              site {
                siteMetadata {
                  siteUrl
                }
              }
    
              allSitePage {
                edges {
                  node {
                    path
                  }
                }
              }
          }`,
          serialize: ({
            site: {
              siteMetadata: { siteUrl },
            },
            allSitePage: { edges: pages },
          }) => pages.map(({ node: { path } }) => {
            const { priority, changefreq } = ((slashCount) => {
              switch (slashCount) {
                case 0:
                case 1:
                case 2:
                  return {
                    changefreq: 'monthly',
                    priority: 1.0,
                  }
                case 3:
                  return {
                    changefreq: 'weekly',
                    priority: 0.7,
                  }
                default:
                  return {
                    changefreq: 'daily',
                  }
              }
            })(ensureArray(path.match(/\//g)).length)
            return {
              url: removeTrailingSlash(`${siteUrl}${path}`),
              changefreq,
              ...(priority && { priority }),
            }
          }),
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'assets',
          path: `${__dirname}/src/assets`,
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'images',
          path: `${__dirname}/src/images`,
        },
      },
      {
        resolve: 'gatsby-plugin-copy-files',
        options: {
          source: `${__dirname}/src/assets`,
          destination: '/assets',
        },
      },
      {
        resolve: 'gatsby-plugin-copy-files',
        options: {
          source: `${__dirname}/src/images`,
          destination: '/images',
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'data',
          path: `${__dirname}/src/data/`,
          // eslint-disable-next-line no-useless-escape
          ignore: ['**/\.*'], // ignore files starting with a dot
        },
      },
      {
        resolve: 'gatsby-plugin-manifest',
        options: {
          name: 'agnoStack',
          short_name: 'agnoStack',
          start_url: '/',
          background_color: accent1,
          theme_color: dark,
          display: 'minimal-ui',
          icon: 'src/images/agnoStack-icon.svg',
        },
      },
      {
        resolve: 'gatsby-plugin-layout',
        options: {
          component: require.resolve('./src/components/Layout'),
        },
      },
      {
        resolve: 'gatsby-plugin-robots-txt',
        options: {
          host: 'https://agnostack.com',
          sitemap: 'https://agnostack.com/sitemap.xml',
          resolveEnv: () => enableRobots,
          env: {
            allow: {
              policy: [
                { userAgent: '*', allow: '/', disallow: '/images/screenshots' },
              ],
            },
            disallow: {
              policy: [{ userAgent: '*', disallow: ['/'] }],
            },
          },
        },
      },
      {
        resolve: 'gatsby-plugin-google-tagmanager',
        options: {
          id: 'GTM-5L74ZXC',
          // Include GTM in development.
          // Defaults to false meaning GTM will only be loaded in production.
          includeInDevelopment: true, // TODO: check if enabled for staging?
          // datalayer to be set before GTM is loaded
          // should be an object or a function that is executed in the browser
          // Defaults to null
          defaultDataLayer: () => ({
            platform: 'gatsby',
          }),
        },
      },
      // this (optional) plugin enables Progressive Web App + Offline functionality
      // To learn more, visit: https://gatsby.dev/offline
      // 'gatsby-plugin-offline',
    ],
  }
})()

export default config
