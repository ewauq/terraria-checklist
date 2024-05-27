import React from 'react'
import { Chapter } from '../type/chapter'
import ChapterCategory from './ChapterCategory'
import Line from './Line'

interface ChapterPageProps {
  page: Chapter | null | undefined
}

const ChapterPage = ({ page }: ChapterPageProps): JSX.Element => {
  return (
    <div className="page">
      <div className="cover" style={{ background: page?.background }}>
        <h1>{page?.label}</h1>
      </div>
      <div className="content chapter">
        {page?.items.map((item, index) => {
          if (typeof item === 'string') return <ChapterCategory key={index} title={item} />
          return <Line key={index} pageId={page.id} id={item.id} text={item.text} />
        })}
      </div>
      {page?.note && <div className="notes">{page.note}</div>}
    </div>
  )
}

export default ChapterPage
