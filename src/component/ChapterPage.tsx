import React from 'react'
import { useDrawer } from '../context/DrawerContext'
import { Chapter } from '../type/chapter'
import ChapterCategory from './ChapterCategory'
import Line from './Line'

interface ChapterPageProps {
  page: Chapter | null | undefined
  onItemChecked: (localStorageKeyValue: string) => void
}

const ChapterPage = ({ page, onItemChecked }: ChapterPageProps): JSX.Element => {
  const { setOpenDrawer } = useDrawer()

  const handlePageClick = (): void => {
    setOpenDrawer(false)
  }

  return (
    <div className="page" onClick={handlePageClick}>
      <div className="cover" style={{ background: page?.background }}>
        <h1>{page?.label}</h1>
      </div>
      <div className="lines">
        {page?.items.map((item, index) => {
          if (typeof item === 'string') return <ChapterCategory key={index} title={item} />
          return (
            <Line
              key={index}
              pageId={page.id}
              id={item.id}
              text={item.text}
              onItemChecked={onItemChecked}
            />
          )
        })}
      </div>
      {page?.note && <div className="notes">{page.note}</div>}
    </div>
  )
}

export default ChapterPage
