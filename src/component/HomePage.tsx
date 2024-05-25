import React from 'react'
import { useDrawer } from '../context/DrawerContext'

const handleStartButtonClick = (): void => {
  location.href = '#journeys-beginning'
  location.reload()
  window.scrollTo(0, 0)
}

const HomePage = (): JSX.Element => {
  const { setOpenDrawer } = useDrawer()

  const handlePageClick = (): void => {
    setOpenDrawer(false)
  }

  return (
    <div className="page" onClick={handlePageClick}>
      <div
        className="cover home"
        style={{ backgroundImage: "url('image/artwork/home.jpg')" }}
      ></div>
      <div className="content">
        <h3>Welcome Terrarian! 👋</h3>
        <p>
          This tool is a passion project created to help you track your overall progress in
          Terraria. The checklist outlines major milestones necessary for advancing in the game.
        </p>
        <p>
          If you are new to the game, it is highly recommended to NOT follow this guide as it may
          spoil major surprises. Terraria is a brilliant game best experienced on your own first.
        </p>
        <p>
          💾 Your progress is saved in your device's browser. You can close the page and come back
          to it later.
        </p>
        <p>🗑️ If you wish to clear your progress, click on the reset to zero button in the menu.</p>
        <button className="start-button" onClick={handleStartButtonClick}>
          Let's start! 🚀
        </button>
      </div>
    </div>
  )
}

export default HomePage
