import React from 'react'
import { useDatabase } from '../context/DatabaseContext'
import { useDrawer } from '../context/DrawerContext'
import './ActionBar.scss'

const ActionBar = (): JSX.Element => {
  const { openDrawer, setOpenDrawer } = useDrawer()
  const database = useDatabase()

  if (!database) return <></>

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { chapters, collections } = database

  const handleDarkModeClick = (): void => {
    //
  }

  const handleDrawerMenuClick = (): void => {
    setOpenDrawer(!openDrawer)
    window.scrollTo(0, 0)
  }

  return (
    <div className="action-bar">
      <button className="drawer-toggle" onClick={handleDrawerMenuClick}></button>
      <span className="title">Terraria Progression Checklist</span>
      <button className="dark-mode-toggle" onClick={handleDarkModeClick}></button>
    </div>
  )
}

export default ActionBar
