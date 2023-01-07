import React from 'react'
import styled from 'styled-components'
import Header from './src/component/header/header'
import Introduction from './src/component/header/introduction/introduction'
import Todolist from './src/component/header/todolist/todolist'
import { Color, Font } from './src/constant/theme'

const StyledPageWrapper = styled.div`
  font-family: ${Font.OpenSans};
  margin: 40px 10%;
  color: ${Color.LightBlack};
`

function App() {
  return (
    <StyledPageWrapper>
      <Header />
      <Introduction />
      <Todolist />
    </StyledPageWrapper>
  )
}

export default App
