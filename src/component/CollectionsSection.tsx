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

  return (
    <section>
      <h3>{title}</h3>
      <div className="chapters">
        {collections.map((collection) => {
          const itemsCount = collection.items.filter((item) => typeof item === 'object').length
          return (
            <a
              key={collection.id}
              href={`#${collection.slug}`}
              onClick={() => handleCollectionClick(collection)}
            >
              {collection.label} <span className="done-count">(00/{itemsCount})</span>
            </a>
          )
        })}
      </div>
    </section>
  )
}
export default Collections
