import parse from 'html-react-parser'
import React from 'react'
import styled from 'styled-components'
import { Color, EntityColor, Gap, Radius } from '../../constant/theme'

const StyledText = styled.div`
  margin-left: ${Gap.Medium};
  line-height: 30px;
  & > p {
    margin: 0;
  }

  a {
    color: ${Color.LightBlue};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      text-decoration-color: ${Color.LightBlue};
      text-underline-offset: 3px;
    }
  }

  span {
    padding: ${Gap.ExtraSmall} ${Gap.Small};
    border-radius: ${Radius.Medium};
  }

  span a {
    color: ${Color.LightBlack};
    margin-left: ${Gap.Small};
    text-transform: uppercase;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  .boss {
    background-color: ${EntityColor.Boss};
  }

  .event {
    background-color: ${EntityColor.Event};
  }

  .npc {
    background-color: ${EntityColor.Npc};
  }

  img {
    vertical-align: text-top;
    margin-right: -2px;
  }
`

interface TextProps {
  content: string
}

export default function Text({ content }: TextProps): JSX.Element {
  const formattedText = parse(content)

  console.log(formattedText)

  // let formattedText: (string | JSX.Element)[] = []

  // const parts = formattedText.split(/(<.[^>]+>)/)
  // console.log(parts)

  // if (parts.length > 1) {
  //   parts.map((part, index) => {
  //     if (part.startsWith('<')) {
  //       const regex = /<(npc|event|boss) name='([a-z]+)' url='(.*)'>/
  //       const [, type, name, url] = regex.exec(part) || []

  //       formattedText.push(
  //         <Entity key={index} type={type as 'npc' | 'boss' | 'event'} name={name} url={url} />,
  //       )
  //     } else {
  //       formattedText.push(part)
  //     }
  //   })
  // } else {
  //   formattedText.push(content)
  // }

  return <StyledText>{formattedText}</StyledText>
}
