import React from 'react'
import styled from 'styled-components'
import { Font, Gap } from '../../../constant/theme'

const StyledTodolist = styled.div`
  border: 1px solid red;
`

const Heading = styled.h1`
  margin: 0;
  font-family: ${Font.BebasNeue};
  font-size: 50px;
  letter-spacing: 1.7px;
  text-transform: uppercase;
  margin-bottom: ${Gap.ExtraLarge};
`

const Section = styled.section`
  margin-top: ${Gap.ExtraLarge};
`

export default function Todolist(): JSX.Element {
  return (
    <StyledTodolist>
      {true ? 'Loading...' : null}
      <Section>
        <Heading>bonjour</Heading>
      </Section>
    </StyledTodolist>
  )
}
