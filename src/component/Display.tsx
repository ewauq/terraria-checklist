import React, { useState } from 'react'
import { Chapter } from '../type/chapter'
import { Collection } from '../type/collection'
import './Display.scss'
import Drawer from './Drawer'
import Page from './Page'

const Display = (): JSX.Element => {
  const [page, setPage] = useState<Chapter | Collection | null>(null)
  const [checkedItem, setCheckedItem] = useState<string>('')

  const handlePageSelection = (page: Chapter | Collection): void => {
    setPage(page)
  }

  return (
    <div className="display">
      <Drawer onPageSelected={handlePageSelection} checkedItem={checkedItem} />
      <Page page={page} onItemChecked={setCheckedItem} />
    </div>
  )
}

export default Display
