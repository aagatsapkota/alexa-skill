// eslint-disable-next-line import/no-extraneous-dependencies
import formatWebpackMessages from 'react-dev-utils/formatWebpackMessages'
import { startBrowser, captureScreenshots } from './utils'

export const ScreenshotsWebpackPluginFactory = (() => {
  let instance
  class ScreenshotsWebpackPlugin {
    constructor() {
      this.isFirstCompile = true
      this.setReporter = (reporter) => {
        this.reporter = reporter
      }
      this.setPaths = (paths) => {
        this.paths = paths
      }
    }

    apply(compiler) {
      compiler.hooks.done.tap('ScreenshotsWebpackPlugin',
        async (stats) => {
          const { errors } = formatWebpackMessages(stats.toJson({}, true))
          const isSuccessful = !errors.length

          if (isSuccessful && this.isFirstCompile && this.paths) {
            this.isFirstCompile = false
            let progressTracker
            if (this.reporter) {
              progressTracker = this.reporter.createProgress('Capturing screenshots', this.paths.length)
              progressTracker.start()
            }

            await startBrowser(
              async (browser) => {
                const { error } = await captureScreenshots(browser, this.paths, progressTracker ? () => progressTracker.tick() : null)
                if (error) {
                  throw error
                }
              },
              this.reporter,
            )
            if (progressTracker) {
              progressTracker.done()
            }
          }
        })
    }
  }

  return {
    getInstance: (options) => {
      if (!instance) {
        instance = new ScreenshotsWebpackPlugin(options)
        delete instance.constructor
      }
      return instance
    }
  }
})()
