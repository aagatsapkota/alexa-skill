import styled from 'styled-components'
import { Button } from '@zendeskgarden/react-buttons'
import { Field } from '@zendeskgarden/react-forms'
import { Section } from '../../atoms'

export const ContactUs = styled.div`
  padding: 1em;
  input {
    display: inline-block;
    max-width: 300px;
  }
`

export const EmailField = styled(Field)`
  display: flex;
  justify-content: center;
  align-items: baseline;
  @media (max-width: ${({ theme }) => theme.breakpoints.calc(theme.breakpoints.md, 'max')}) {
    display: block;
    input {
      margin-bottom: 0.5em;
    }
  }
`

export const SubmitButton = styled(Button)`
  margin: 0 4px;
`

export const StyledSection = styled(Section)`
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-left: 25vw;
    margin-right: 25vw;
  }
`

export const MessageWrapper = styled.div`
  padding: 0.5em;
`
