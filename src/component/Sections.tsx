import React, { useEffect } from 'react'
import { useDrawer } from '../context/DrawerContext'
import { Chapter } from '../type/chapter'
import { Collection } from '../type/collection'
import { Sections } from '../type/sections'
import './Sections.scss'

interface SectionProps {
  data: Sections
}

const Section = ({ data }: SectionProps): JSX.Element => {
  const { selectedPage, setOpenDrawer, setSelectedPage } = useDrawer()
  const { chapters, collections } = data

  useEffect(() => {
    const slug = location.hash.replace('#', '')
    if (!slug) setSelectedPage(null)
    const chapter = chapters.find((chapter) => chapter.slug === slug)
    const collection = collections.find((collection) => collection.slug === slug)
    if (chapter) setSelectedPage({ type: 'chapter', content: chapter })
    if (collection) setSelectedPage({ type: 'collection', content: collection })
  }, [chapters])

  const handleElementClick = (
    type: 'chapter' | 'collection',
    element: Chapter | Collection,
  ): void => {
    setSelectedPage({ type, content: element })
    window.scrollTo(0, 0)
    setOpenDrawer(false)
  }

  const getDoneItemsCount = (type: 'chapter' | 'collection', elementId: number): number => {
    const chapterItems = Object.keys(localStorage).filter((key) =>
      key.startsWith(`${type}-${elementId}`),
    )
    const doneItems = chapterItems.filter((key) => localStorage.getItem(key) === 'true')
    return doneItems.length
  }

  return (
    <>
      <section>
        <h3>Chapters</h3>
        <div>
          {chapters.map((chapter) => {
            const doneItemsCount = getDoneItemsCount('chapter', chapter.id)
            const itemsCount = chapter.items.filter((item) => typeof item === 'object').length

            let linkClasses = []
            if (doneItemsCount === itemsCount) linkClasses.push('done')
            if (selectedPage?.content?.id === chapter.id && selectedPage?.type === 'chapter') {
              linkClasses.push('active')
            }

            return (
              <a
                key={chapter.id}
                href={`#${chapter.slug}`}
                onClick={() => handleElementClick('chapter', chapter)}
                className={linkClasses.join(' ')}
              >
                {chapter.label}
                <span className="done-count">
                  ({doneItemsCount}/{itemsCount})
                </span>
              </a>
            )
          })}
        </div>
      </section>

      <section>
        <h3>Collection</h3>
        <div>
          {collections.map((collection) => {
            const doneItemsCount = getDoneItemsCount('collection', collection.id)
            const itemsCount = collection.items.filter((item) => typeof item === 'object').length

            let linkClasses = []
            if (doneItemsCount === itemsCount) linkClasses.push('done')
            if (
              selectedPage?.content?.id === collection.id &&
              selectedPage?.type === 'collection'
            ) {
              linkClasses.push('active')
            }

            return (
              <a
                key={collection.id}
                href={`#${collection.slug}`}
                onClick={() => handleElementClick('collection', collection)}
                className={linkClasses.join(' ')}
              >
                {collection.label}
                <span className="done-count">
                  ({doneItemsCount}/{itemsCount})
                </span>
              </a>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Section
