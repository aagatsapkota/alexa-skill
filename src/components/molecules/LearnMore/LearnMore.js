import React, { useState } from 'react'
import axios from 'axios'
import { Inline } from '@zendeskgarden/react-loaders'
import { Grid, Row, Col } from '@zendeskgarden/react-grid'
import { Input, Message } from '@zendeskgarden/react-forms'

import { Heading, ScheduleButton } from '../../atoms'
import {
  StyledSection,
  ContactUs,
  SubmitButton,
  EmailField,
  MessageWrapper,
} from './LearnMore.style'

const { GATSBY_URL_LEARN_MORE } = process.env

const LearnMoreComponent = ({ format, ...renderProps }) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [emailInput, setEmailInput] = useState('')

  const handleSubmit = async () => {
    setMessage('')
    setLoading(true)
    try {
      const {
        data: { message: responseMessage },
      } = await axios.post(`${GATSBY_URL_LEARN_MORE}/send`, { email: emailInput })
      setMessage(responseMessage)
      setEmailInput('')
    } catch (err) {
      console.log('An error occurred submitting form', err)
      if (err.response && err.response.data) {
        setMessage(err.response.data.message)
      } else {
        setMessage(
          'An error occurred, please contact us at support@agnostack.com.'
        )
      }
    }
    setLoading(false)
  }

  return (
    <StyledSection format={format} {...renderProps}>
      <Grid>
        <Row>
          <Col md={12} align="center">
            <Heading tag="4" size="LG">
              Learn more about agnoStack!
            </Heading>
            <ContactUs>
              <EmailField>
                <Input
                  placeholder="Enter your email"
                  value={emailInput}
                  onChange={({ target: { value } }) => setEmailInput(value)}
                />
                <SubmitButton
                  onClick={() => {
                    handleSubmit()
                  }}
                  // TODO: USE SHARED EMAIL VALIDATOR UTIL
                  disabled={
                    !/^[a-z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-z0-9-]+(?:.[a-z0-9-]+)+$/i.test(
                      emailInput
                    )
                  }
                >
                  {loading ? <Inline /> : 'Submit'}
                </SubmitButton>
              </EmailField>
              <MessageWrapper>
                <Message>{message}</Message>
              </MessageWrapper>
            </ContactUs>
            <ScheduleButton />
          </Col>
        </Row>
      </Grid>
    </StyledSection>
  )
}

export default LearnMoreComponent
