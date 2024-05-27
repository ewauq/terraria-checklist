import React, { useState } from 'react'
import { useDrawer } from '../context/DrawerContext'
import './Display.scss'
import Drawer from './Drawer'
import Page from './Page'

const Display = (): JSX.Element => {
  const [checkedItem, setCheckedItem] = useState<string>('')
  const { selectedPage, setSelectedPage } = useDrawer()

  const handlePageSelection = (): void => {
    setSelectedPage(selectedPage)
  }

  return (
    <div className="display">
      <Drawer onPageSelected={handlePageSelection} checkedItem={checkedItem} />
      <Page page={selectedPage} onItemChecked={setCheckedItem} />
    </div>
  )
}

export default Display
