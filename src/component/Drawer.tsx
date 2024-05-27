import React from 'react'
import { useDatabase } from '../context/DatabaseContext'
import { useDrawer } from '../context/DrawerContext'
import './Drawer.scss'
import Sections from './Sections'

// @ts-ignore
const LAST_BUILD_DATE = __BUILD_DATE__

const Drawer = (): JSX.Element => {
  const data = useDatabase()
  const { openDrawer, setOpenDrawer, setSelectedPage } = useDrawer()

  if (!data) return <></>
  const { chapters } = data

  const handleResetClick = (): void => {
    const confirmation = confirm('Are you sure you want to reset your progression?')
    if (!confirmation) return

    setSelectedPage({ type: 'chapter', content: chapters[0] })
    window.scrollTo(0, 0)
    localStorage.clear()
    location.reload()
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
          <Sections data={data} />
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
