import React from 'react'
import styled from 'styled-components'
import { FontSize, Weight } from '../../../constant/theme'

const StyledIntroduction = styled.div`
  font-size: ${FontSize.Normal};
  line-height: 26px;
`

const StyledHeading = styled.h1`
  font-size: ${FontSize.Double};
  font-weight: ${Weight.LightBold};
`

export default function Introduction(): JSX.Element {
  return (
    <StyledIntroduction>
      <StyledHeading>Welcome Terrarian! 👋</StyledHeading>
      <p>
        This tool will walk you through the main content of Terraria 1.4 aka “Journey's End”. This
        list is obviously not exhaustive, because Terraria contains many random elements.
      </p>
      <p>
        The document is primarily intended for experienced players. If you are a new to Terraria, I
        would rather advise you to follow your own adventure without this document which would spoil
        you much of the discoveries you could make. Terraria is an awesome game that deserve you
        take your time to explore it.
      </p>
      <p>
        💾 Your progress is saved in your browser, you can close this page at any time and come back
        to it later.
      </p>
      <p>
        🗑️ If you want to delete your checklist data, you can click on “Checklist reset” at the top
        right of your screen.
      </p>
      <p>Good luck!</p>
    </StyledIntroduction>
  )
}
