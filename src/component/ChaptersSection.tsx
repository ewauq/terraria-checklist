import React, { useEffect, useState } from 'react'
import { Chapter } from '../type/chapter'
import { Page } from '../type/page'

interface ChaptersSectionProps {
  title: string
  chapters: Chapter[]
  onPageSelected: (page: Page) => void
}

const ChaptersSection = ({
  title,
  chapters,
  onPageSelected,
}: ChaptersSectionProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number | null>(null)

  useEffect(() => {
    const slug = location.hash.replace('#', '')
    const chapter = chapters.find((chapter) => chapter.slug === slug)
    if (chapter) setCurrentPage(chapter.id)
  }, [chapters])

  const handleChapterClick = (chapter: Chapter): void => {
    onPageSelected({ type: 'chapter', content: chapter })
    setCurrentPage(chapter.id)
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
          if (currentPage === chapter.id) linkClasses.push('active')

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
