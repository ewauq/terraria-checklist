import React from 'react'
import { Collection } from '../type/collection'
import Item from './Item'

interface ColletionPageProps {
  page: Collection | null | undefined
  onItemChecked: (localStorageKeyValue: string) => void
}

const CollectionPage = ({ page, onItemChecked }: ColletionPageProps): JSX.Element => {
  return (
    <div className="page">
      <div className="cover" style={{ background: page?.background }}>
        <h1>{page?.label}</h1>
      </div>

      <div className="content collection">
        {page?.items.map((item, index) => {
          if (typeof item === 'string') return <h3 key={index}>{item}</h3>

          return (
            <Item key={index} item={item} collectionId={page.id} onItemChecked={onItemChecked} />
          )
        })}
      </div>
    </div>
  )
}

export default CollectionPage
