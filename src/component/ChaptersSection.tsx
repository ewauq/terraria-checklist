import React, { useEffect } from 'react'
import { useDrawer } from '../context/DrawerContext'
import { Chapter } from '../type/chapter'

interface ChaptersSectionProps {
  title: string
  chapters: Chapter[]
}

const ChaptersSection = ({ title, chapters }: ChaptersSectionProps): JSX.Element => {
  const { selectedPage, setOpenDrawer, setSelectedPage } = useDrawer()

  useEffect(() => {
    const slug = location.hash.replace('#', '')
    if (!slug) setSelectedPage(null)
    const chapter = chapters.find((chapter) => chapter.slug === slug)
    if (chapter) setSelectedPage({ type: 'chapter', content: chapter })
  }, [chapters])

  const handleChapterClick = (chapter: Chapter): void => {
    setSelectedPage({ type: 'chapter', content: chapter })
    window.scrollTo(0, 0)
    setOpenDrawer(false)
  }

  const getDoneItemsCount = (chapterId: number): number => {
    const chapterItems = Object.keys(localStorage).filter((key) =>
      key.startsWith(`chapter-${chapterId}`),
    )
    const doneItems = chapterItems.filter((key) => localStorage.getItem(key) === 'true')
    return doneItems.length
  }

  return (
    <section>
      <h3>{title}</h3>
      <div className="chapters">
        {chapters.map((chapter) => {
          const doneItemsCount = getDoneItemsCount(chapter.id)
          const itemsCount = chapter.items.filter((item) => typeof item === 'object').length

          let linkClasses = []
          if (doneItemsCount === itemsCount) linkClasses.push('done')
          if (selectedPage?.content?.id === chapter.id) linkClasses.push('active')

          return (
            <a
              key={chapter.id}
              href={`#${chapter.slug}`}
              onClick={() => handleChapterClick(chapter)}
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
  )
}
export default ChaptersSection
