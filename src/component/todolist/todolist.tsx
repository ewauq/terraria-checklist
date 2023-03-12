import React from 'react'
import styled from 'styled-components'
import { Font, Gap } from '../../constant/theme'
import TodoText from '../todo-text/todo-text'
import data from './data.json'

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
const Item = styled.div`
  display: flex;
  margin-bottom: ${Gap.Large};
`

const CheckboxWrapper = styled.div`
  align-items: center;
  display: flex;
`

const Checkbox = styled.input`
  margin: 0;
  width: 30px;
  height: 30px;
  cursor: pointer;
`

export default function Todolist(): JSX.Element {
  return (
    <div>
      {data.sections.map((section, index) => (
        <Section key={index}>
          <Heading>{section.title}</Heading>
          {section.items.map((text, index) => (
            <Item key={index}>
              <CheckboxWrapper>
                <Checkbox type="checkbox" />
              </CheckboxWrapper>
              <TodoText content={text} />
            </Item>
          ))}
        </Section>
      ))}
    </div>
  )
}
