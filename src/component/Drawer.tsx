import React from 'react'
import { useDatabase } from '../context/DatabaseContext'
import { useDrawer } from '../context/DrawerContext'
import { CheckedItem } from '../type/checked-item'
import { Page } from '../type/page'
import ChaptersSection from './ChaptersSection'
import Collections from './CollectionsSection'
import './Drawer.scss'

// @ts-ignore
const LAST_BUILD_DATE = __BUILD_DATE__

interface DrawerProps {
  checkedItem: CheckedItem
}

const Drawer = ({ checkedItem }: DrawerProps): JSX.Element => {
  const database = useDatabase()
  const { openDrawer, setOpenDrawer, setSelectedPage } = useDrawer()

  if (!database) return <></>
  const { chapters, collections } = database

  const handleResetClick = (): void => {
    const confirmation = confirm('Are you sure you want to reset your progression?')
    if (!confirmation) return
    localStorage.clear()

    if (chapters) location.href = `#${chapters[0].slug}`
    location.reload()
    window.scrollTo(0, 0)
  }

  const handlePageSelected = (page: Page): void => {
    setSelectedPage({ type: page.type, content: page.content })
    window.scrollTo(0, 0)
    setOpenDrawer(false)
  }

  const handleOverlayClick = (): void => {
    setOpenDrawer(false)
  }

  return (
    <>
      <div className={`overlay ${openDrawer ? 'show' : ''}`} onClick={handleOverlayClick}></div>
      <div className={`drawer ${openDrawer ? 'open' : ''}`}>
        <div className="logo">
          <img src="image/logo/tree.png" />
          <div className="logo-text">
            <span>Progression</span>
            <span>Checklist</span>
          </div>
        </div>
        <div className="sections">
          <a href="index.html" className="home">
            Home
          </a>
          {chapters ? (
            <ChaptersSection
              title="Chapters"
              chapters={chapters}
              onPageSelected={handlePageSelected}
              checkedItem={checkedItem}
            />
          ) : null}
          {collections ? (
            <Collections
              title="Collections"
              collections={collections}
              onPageSelected={handlePageSelected}
              checkedItem={checkedItem}
            />
          ) : null}
        </div>
        <div className="danger-zone">
          <a className="reset" onClick={handleResetClick}>
            Reset progression
          </a>
        </div>
        <div className="diminished">Game version 1.4.4.9</div>
        <div className="diminished">Last update on {LAST_BUILD_DATE}</div>
        <br />
        <div className="diminished">
          Code by{' '}
          <a href="https://github.com/ewauq/terraria-checklist" target="_blank">
            ewauq
          </a>
        </div>
        <div className="diminished">
          Artwork by{' '}
          <a
            href="https://www.deviantart.com/vsewolod/art/Terraria-World-730563825"
            target="_blank"
          >
            Vsewolod
          </a>
        </div>
      </div>
    </>
  )
}

export default Drawer
