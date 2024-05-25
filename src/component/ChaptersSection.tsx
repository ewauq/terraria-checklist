import React from 'react'
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
  const handleChapterClick = (chapter: Chapter): void => {
    onPageSelected({ type: 'chapter', content: chapter })
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
          return (
            <a
              key={chapter.id}
              href={`#${chapter.slug}`}
              onClick={() => handleChapterClick(chapter)}
              className={doneItemsCount === itemsCount ? 'done' : ''}
            >
              {chapter.label}{' '}
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
