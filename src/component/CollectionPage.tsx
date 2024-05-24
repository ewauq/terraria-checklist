import React from 'react'
import { useDrawer } from '../context/DrawerContext'
import { Collection } from '../type/collection'
import Item from './Item'

interface ColletionPageProps {
  page: Collection | null | undefined
  onItemChecked: (localStorageKeyValue: string) => void
}

const CollectionPage = ({ page, onItemChecked }: ColletionPageProps): JSX.Element => {
  const { setOpenDrawer } = useDrawer()

  const handlePageClick = (): void => {
    setOpenDrawer(false)
  }

  return (
    <div className="page" onClick={handlePageClick}>
      <div className="cover" style={{ background: page?.background }}>
        <h1>{page?.label}</h1>
      </div>
      <div className="items">
        {page?.items.map((item, index) => {
          if (typeof item === 'string') return <>{item}</>
          return <Item key={index} item={item} />
        })}
      </div>
      {/* <div className="lines">

      </div>
      {page?.note && <div className="notes">{page.note}</div>} */}
    </div>
  )
}

export default CollectionPage
