// eslint-disable-next-line import/no-extraneous-dependencies
import mkdirp from 'mkdirp'
// eslint-disable-next-line import/no-extraneous-dependencies
import puppeteer from 'puppeteer'
// eslint-disable-next-line import/no-extraneous-dependencies
import { spawn } from 'cross-spawn'
import {
  ensureString,
  removeLeadingTrailingSlash,
  snakecase
} from '../../src/js-utils'

const DEFAULT_PORT = 9000

export const captureScreenshots = async (
  browser,
  paths,
  trackProgress = (url) => console.log(`Screenshot processed: ${url}`),
  options = {}
) => {
  try {
    const {
      output = './public/images/screenshots',
      server: {
        protocol = 'http',
        host = 'localhost',
        port = DEFAULT_PORT
      } = {},
      viewPort = {
        width: 1920,
        height: 1280,
        deviceScaleFactor: 1,
      },
    } = options

    mkdirp.sync(output)

    const page = await browser.newPage()
    await page.setDefaultNavigationTimeout(0)
    page.setViewport(viewPort)

    // eslint-disable-next-line no-restricted-syntax
    for (const path of paths) {
      const url = `${protocol}://${host}:${port}${path}`
      // eslint-disable-next-line no-await-in-loop
      await page.goto(url, {
        waitUntil: 'networkidle2',
      })
      // eslint-disable-next-line no-await-in-loop
      await page.waitFor(2000)
      // eslint-disable-next-line no-await-in-loop
      await page.screenshot({
        path: `${output}/${snakecase(removeLeadingTrailingSlash(path)) || 'home'}.png`,
      })
      trackProgress(url)
    }

    return {}
  } catch (error) {
    return {
      error
    }
  }
}

export const startBrowser = async (
  callback = (status) => console.log(status),
  reporter,
  options = {}
) => {
  const {
    browser: browserOptions = {
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-fullscreen'],
    },
  } = options
  const browser = await puppeteer.launch(browserOptions)

  try {
    if (reporter) {
      reporter.info('Screenshot browser started')
    } else {
      console.log('Screenshot browser started')
    }
    await callback(browser)
  } finally {
    await browser.close()
    if (reporter) {
      reporter.info('Screenshot browser closed')
    } else {
      console.log('Screenshot browser closed')
    }
  }
}

export const startServer = async (
  callback = (status) => console.log(status),
  reporter,
  options = {}
) => {
  const {
    server: {
      port = DEFAULT_PORT
    } = {}
  } = options

  const checkServerStatus = (completedCallback) => new Promise((resolve, reject) => {
    const timeoutID = setTimeout(() => reject(new Error('Timeout')), 10e3)
    const check = () => {
      if (!completedCallback()) {
        setTimeout(check, 1e3)
      } else {
        clearTimeout(timeoutID)
        resolve()
      }
    }
    check()
  })

  const childProcess = spawn('gatsby', ['serve', '-p', port], {
    shell: true,
  })

  let running = false
  childProcess.stdout.on('data', (data) => {
    if (ensureString(data).includes('gatsby serve running')) {
      running = true
    }
  })

  try {
    await checkServerStatus(() => running)
    if (reporter) {
      reporter.info('Screenshot server started')
    } else {
      console.log('Screenshot server started')
    }
    await callback({
      port,
      running,
    })
  } catch (error) {
    await callback({
      error,
      port,
      running,
    })
  } finally {
    await new Promise((resolve) => {
      childProcess.on('exit', resolve)
      childProcess.kill()
      if (reporter) {
        reporter.info('Screenshot server stopped')
      } else {
        console.log('Screenshot server stopped')
      }
    })
  }
}
