import { ScreenshotsWebpackPluginFactory } from './ScreenshotsWebpackPluginFactory'
import { startServer, startBrowser, captureScreenshots } from './utils'

export const onPostBuild = async ({ graphql, reporter }) => {
  const {
    data: {
      allSitePage: {
        edges: pages
      },
    },
    errors
  } = await graphql(`
    {
      allSitePage {
        edges {
          node {
            path
          }
        }
      }
    }
  `)

  if (errors) {
    reporter.panic('Error while running GraphQL markdown queries.')
    throw new Error(errors.join(', '))
  }

  try {
    const paths = pages.map(({ node: { path } }) => path)

    if (paths) {
      const progressTracker = reporter.createProgress('Capturing screenshots', paths.length)
      progressTracker.start()

      await startServer(
        // eslint-disable-next-line consistent-return
        ({ error: serverError, port, running }) => {
          if (serverError) {
            throw serverError
          }
          if (running) {
            return startBrowser(
              async (browser) => {
                const { error } = await captureScreenshots(browser, paths, () => progressTracker.tick(),
                  {
                    server: {
                      port
                    }
                  })

                if (error) {
                  throw error
                }
              },
              reporter,
            )
          }
        },
        reporter,
      )
      progressTracker.done()
    }
  } catch (error) {
    reporter.panic('Error while capturing screenshots onPostBuild.', error)
    throw error
  }
}

export const onCreateDevServer = async ({ reporter, getNodesByType }) => {
  const pages = getNodesByType('SitePage')
  const paths = pages.map(({ path }) => path)
  ScreenshotsWebpackPluginFactory.getInstance().setReporter(reporter)
  ScreenshotsWebpackPluginFactory.getInstance().setPaths(paths)
}

export const onCreateWebpackConfig = (
  { stage, actions },
  // eslint-disable-next-line no-unused-vars
  { disable = false, ...options },
) => {
  if (disable) return

  if (stage === 'develop') {
    actions.setWebpackConfig({
      plugins: [
        ScreenshotsWebpackPluginFactory.getInstance()
      ],
    })
  }
}
