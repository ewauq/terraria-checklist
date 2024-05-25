import React from 'react'
import { Collection } from '../type/collection'
import { Page } from '../type/page'

interface CollectionsSectionProps {
  title: string
  collections: Collection[]
  onPageSelected: (page: Page) => void
}

const Collections = ({
  title,
  collections,
  onPageSelected,
}: CollectionsSectionProps): JSX.Element => {
  const handleCollectionClick = (collection: Collection): void => {
    onPageSelected({ type: 'collection', content: collection })
  }

  const getDoneItemsCount = (chapterId: number): number => {
    const collectionItems = Object.keys(localStorage).filter((key) =>
      key.startsWith(`collection-${chapterId}`),
    )
    const doneItems = collectionItems.filter((key) => localStorage.getItem(key) === 'true')
    return doneItems.length
  }

  return (
    <section>
      <h3>{title}</h3>
      <div className="chapters">
        {collections.map((collection) => {
          const doneItemsCount = getDoneItemsCount(collection.id)
          const itemsCount = collection.items.filter((item) => typeof item === 'object').length
          return (
            <a
              key={collection.id}
              href={`#${collection.slug}`}
              onClick={() => handleCollectionClick(collection)}
              className={doneItemsCount === itemsCount ? 'done' : ''}
            >
              {collection.label}{' '}
              <span className="done-count">
                ({doneItemsCount}/{itemsCount})
              </span>
            </a>
          )
        })}
      </div>
    </section>
  )
}
export default Collections
