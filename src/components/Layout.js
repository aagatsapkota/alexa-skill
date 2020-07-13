import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  ThemeProvider,
  DEFAULT_THEME as zendeskTheme,
} from '@zendeskgarden/react-theming'
import { TransitionProvider, TransitionViews } from 'gatsby-plugin-transitions'
import { delay, scrollTo } from '../js-utils'

// TODO: should this use zendesk bedrock?
import '../styles/reset.css'
import agnoStackTheme from '../theme'
import Navigation from './molecules/Navigation'
import ScheduleModal from './molecules/ScheduleModal'
import { Responsive } from './atoms'

const colors = {
  ...zendeskTheme.colors,
  ...agnoStackTheme.colors,
}

const Layout = ({ location, children }) => {
  const { hash } = location

  useEffect(() => {
    const hashScroll = async () => {
      if (hash) {
        await delay(300)
        scrollTo(hash)
      }
    }
    hashScroll()
  }, [hash])

  return (
    <ThemeProvider theme={{ ...zendeskTheme, ...agnoStackTheme, colors }}>
      <Responsive
        component={TransitionProvider}
        location={location}
        leave={{
          opacity: 0,
          config: {
            duration: 200,
          },
        }}
      >
        <Navigation>
          <Responsive component={TransitionViews}>{children}</Responsive>
        </Navigation>
        <ScheduleModal />
      </Responsive>
    </ThemeProvider>
  )
}

// TODO: do we need this propTypes??
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
