import React from 'react'
import { useDatabase } from '../context/DatabaseContext'
import { useDrawer } from '../context/DrawerContext'
import { Page } from '../type/page'
import ChaptersSection from './ChaptersSection'
import Collections from './CollectionsSection'
import './Drawer.scss'

// @ts-ignore
const LAST_BUILD_DATE = __BUILD_DATE__

interface DrawerProps {
  onPageSelected: (page: Page) => void
  checkedItem?: string
}

const Drawer = ({ onPageSelected }: DrawerProps): JSX.Element => {
  const database = useDatabase()
  const { openDrawer, setOpenDrawer } = useDrawer()

  if (!database) return <></>
  const { chapters, collections } = database

  const handleResetClick = (): void => {
    const confirmation = confirm('Are you sure you want to reset your progression?')
    if (!confirmation) return
    localStorage.clear()

    if (chapters) location.href = '/'
    location.reload()
    window.scrollTo(0, 0)
  }

  const handlePageSelected = (page: Page): void => {
    onPageSelected({ type: page.type, content: page.content })
    setOpenDrawer(false)
  }

  return (
    <div className={`drawer ${openDrawer ? 'open' : ''}`}>
      <div className="logo">
        <img src="image/logo/tree.png" />
        <div className="logo-text">
          <span>Progression</span>
          <span>Checklist</span>
        </div>
      </div>
      <div className="sections">
        <a href="index.html">Home</a>
        {chapters ? (
          <ChaptersSection
            title="Chapters"
            chapters={chapters}
            onPageSelected={handlePageSelected}
          />
        ) : null}
        {collections ? (
          <Collections
            title="Collections"
            collections={collections}
            onPageSelected={handlePageSelected}
          />
        ) : null}
      </div>
      <hr />
      <a className="reset" onClick={handleResetClick}>
        Reset progression
      </a>
      <hr />
      <div className="diminished">Game version 1.4.4.9</div>
      <div className="diminished">Last update on {LAST_BUILD_DATE}</div>
    </div>
  )
}

export default Drawer
