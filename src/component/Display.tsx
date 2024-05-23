import React, { useState } from 'react'
import { useDatabase } from '../context/DatabaseContext'
import { Chapter } from '../type/chapter'
import { Page as PageType } from '../type/page'
import './Display.scss'
import Drawer from './Drawer'
import Page from './Page'

const Display = (): JSX.Element => {
  const [page, setPage] = useState<PageType | null>(null)
  const [checkedItem, setCheckedItem] = useState<string>('')

  if (!page) {
    const slug = window.location.hash.slice(1)
    if (slug) {
      const sections = useDatabase()
      const chapter = sections?.chapters.find((chapter: Chapter) => chapter.slug === slug)

      if (chapter) setPage({ type: 'chapter', content: chapter })
    }
  }

  const handlePageSelection = (page: PageType): void => {
    setPage({ type: page.type, content: page.content })
  }

  return (
    <div className="display">
      <Drawer onPageSelected={handlePageSelection} checkedItem={checkedItem} />
      <Page page={page} onItemChecked={setCheckedItem} />
    </div>
  )
}

export default Display
