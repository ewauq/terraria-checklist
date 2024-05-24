import React from 'react'
import './Item.scss'

type Item = {
  id: number
  name: string
  pageName: string
  imageFilename: string
}

interface ItemProps {
  item: Item
}

const Item = ({ item }: ItemProps): JSX.Element => {
  return (
    <div className="item">
      {item.id}. {item.name}
    </div>
  )
}

export default Item
