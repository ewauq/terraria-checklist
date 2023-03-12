import React from 'react'
import styled from 'styled-components'
import { Color, EntityColor, Gap, Radius } from '../../constant/theme'

interface EntityProps {
  type: 'npc' | 'boss' | 'event'
  name: string
  url: string
}

const StyledLink = styled.a`
  color: ${Color.LightBlack};
  margin-left: ${Gap.Small};
  display: inline;
  padding: ${Gap.ExtraSmall} ${Gap.Small};
  border-radius: ${Radius.Medium};
  text-transform: uppercase;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

export default function Entity({ type, name, url }: EntityProps) {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1)

  return (
    <span
      className={type}
      style={{ backgroundColor: EntityColor[capitalizedType as keyof typeof EntityColor] }}
    >
      <img src={`/static/media/${type}/${name}.png`} />
      <StyledLink href={url} target="_blank">
        {name}
      </StyledLink>
    </span>
  )
}
