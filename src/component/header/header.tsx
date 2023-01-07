import React from 'react'
import styled from 'styled-components'
import { Font } from '../../constant/theme'

const StyledHeader = styled.header`
  align-items: center;
  display: flex;
  justify-content: center;
  max-height: 700px;
  min-height: 200px;
  width: 100%;
`

const StyledLogo = styled.div`
  font-size: 80px;
  font-family: ${Font.BebasNeue};
`

export default function Header(): JSX.Element {
  return (
    <StyledHeader>
      <StyledLogo>Terraria Checklist</StyledLogo>
    </StyledHeader>
  )
}
