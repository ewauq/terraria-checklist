import React, { useEffect } from 'react'
import { useDrawer } from '../context/DrawerContext'
import './Item.scss'

enum CollectionType {
  ARMORS = 1,
  TROPHIES = 2,
  RELICS = 3,
}

type Item = {
  id: number
  name: string
}

interface ItemProps {
  item: Item
  collectionId: CollectionType
}

const Item = ({ item, collectionId }: ItemProps): JSX.Element => {
  const [isChecked, setIsChecked] = React.useState<boolean>(false)
  const { setCheckedItem } = useDrawer()
  const localStorageKey = `collection-${collectionId}-item-${item.id}`

  const handleItemClick = (): void => {
    const state = !isChecked
    localStorage.setItem(localStorageKey, state.toString())
    setIsChecked(state)
    setCheckedItem({ pageType: 'collection', pageId: collectionId, itemId: item.id, state })
  }

  useEffect(() => {
    setIsChecked(localStorage.getItem(localStorageKey) === 'true')
  }, [collectionId, item.id])

  const slug = item.name.replace(/ /g, '_')
  const folder = {
    [CollectionType.ARMORS]: 'armor',
    [CollectionType.TROPHIES]: 'trophy',
    [CollectionType.RELICS]: 'relic',
  }

  return (
    <div className={`item ${isChecked ? 'done' : ''}`}>
      <div className="frame" onClick={handleItemClick}>
        <img src={`image/${folder[collectionId]}/${slug}.png`} />
      </div>
      <div className="item-text">
        <a href={`https://terraria.wiki.gg/wiki/${slug}`} target="_blank">
          {item.name}
        </a>
      </div>
    </div>
  )
}

export default Item
