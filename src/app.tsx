import React from 'react'
import styled from 'styled-components'
import Header from './component/header/header'
import Introduction from './component/header/introduction/introduction'
import Todolist from './component/todolist/todolist'
import { Color, Font } from './constant/theme'

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
