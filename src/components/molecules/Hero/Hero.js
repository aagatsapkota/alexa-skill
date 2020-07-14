import React, { useState, useContext, useEffect } from 'react'
import { window } from 'browser-monads'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import { Grid } from '@zendeskgarden/react-grid'

import { useInterval } from '../../../hooks'
import { ColorSlider } from '../../atoms'
import { GlobalDispatch } from '../../../util/context'
import { ImageWrapper, Tagline, HeroTitle } from '../../../styles/core'
import {
  HeroSection,
  HeroRow,
  HeroCol,
  HeroHeading,
  Body,
  Callout,
} from './Hero.style'

const HeroSlot = ({ format, title, subtitle, text, heroIndex }) => (
  <>
    <HeroHeading tag="1">
      <HeroTitle heroIndex={heroIndex}>{title}</HeroTitle>
      <Tagline format={format}>{subtitle}</Tagline>
    </HeroHeading>
    <Body>{text}</Body>
    <Callout
      title="Release 2.0.0"
      format={format}
      onClick={() => navigate('/release-notes/release-number/2-0-0')}
    >
      <span role="img" aria-label="announcement">
        📣
      </span>
      <span>June 23, 2020: </span>
      <span>Now introducing release 2.0.0!</span>
    </Callout>
  </>
)

const HeroSlider = ({ duration = 6000, heros }) => {
  const [activePanel, setActivePanel] = useState(0)
  const globalDispatch = useContext(GlobalDispatch)

  useEffect(() => {
    if (activePanel) {
      globalDispatch({
        type: 'SET',
        payload: {
          activeFormat: heros[activePanel].node.format,
        },
      })
    }
  }, [activePanel])

  useInterval(() => {
    if (!window.pause) {
      setActivePanel(activePanel === heros.length - 1 ? 0 : activePanel + 1)
    }
  }, duration)

  const {
    node: { title, subtitle, text, format },
  } = heros[activePanel]

  return (
    <>
      <ColorSlider activeFormat={format} />
      <HeroRow>
        <HeroCol lg={6} md={12}>
          <HeroSlot
            key={`hero-${activePanel}`}
            heroIndex={activePanel}
            format={format}
            title={title}
            subtitle={subtitle}
            text={text}
          />
        </HeroCol>
        <HeroCol lg={6} md={12} center>
          <ImageWrapper width="100%" height="auto">
            <img src="/images/illustration.svg" alt="agnoStack" />
          </ImageWrapper>
        </HeroCol>
      </HeroRow>
    </>
  )
}

const Hero = ({ format, ...renderProps }) => {
  const data = useStaticQuery(graphql`
    query herosQuery {
      allHerosJson {
        edges {
          node {
            title
            subtitle
            text
            format
          }
        }
      }
    }
  `)

  const {
    allHerosJson: { edges: heros },
  } = data

  return (
    <HeroSection {...renderProps}>
      <Grid>
        <HeroSlider format={format} heros={heros} />
      </Grid>
    </HeroSection>
  )
}

export default Hero
