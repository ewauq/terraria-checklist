import React from 'react'
import { useDrawer } from '../context/DrawerContext'
import './Display.scss'
import Drawer from './Drawer'
import Page from './Page'

const Display = (): JSX.Element => {
  const { selectedPage } = useDrawer()

  return (
    <div className="display">
      <Drawer />
      <Page page={selectedPage} />
    </div>
  )
}

export default Display
