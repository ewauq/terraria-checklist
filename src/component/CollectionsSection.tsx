import React from 'react'
import { Chapter } from '../type/chapter'
import { Collection } from '../type/collection'

interface CollectionsSectionProps {
  title: string
  collections: Collection[]
  onPageSelected: (chapter: Chapter) => void
}

const Collections = ({
  title,
  collections,
  onPageSelected,
}: CollectionsSectionProps): JSX.Element => {
  const handleCollectionClick = (chapter: Chapter): void => {
    onPageSelected(chapter)
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
