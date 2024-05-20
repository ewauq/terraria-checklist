import React from 'react'
import { useDatabase } from '../context/DatabaseContext'
import { useDrawer } from '../context/DrawerContext'
import { Chapter } from '../type/chapter'
// import { Collection } from '../type/collection'
import ChapterCategory from './ChapterCategory'
import Line from './Line'
import './Page.scss'

interface PageProps {
  page: Chapter | null | undefined
  onItemChecked: (localStorageKeyValue: string) => void
}

const Page = ({ page, onItemChecked }: PageProps): JSX.Element => {
  const { setOpenDrawer } = useDrawer()

  const handlePageClick = (): void => {
    setOpenDrawer(false)
  }

  const handleStartButtonClick = (): void => {
    location.href = '#journeys-beginning'
    location.reload()
  }

  if (!page) {
    const sections = useDatabase()
    const slug = window.location.hash.slice(1)

    if (slug) {
      const chapter = sections?.chapters.find((chapter: Chapter) => chapter.slug === slug)
      // const collection = sections?.collections.find(
      //   (collection: Collection) => collection.slug === slug,
      // )

      if (chapter) {
        page = chapter
      }
      // else if (collection) {
      //   page = collection
      // }
    }
  }

  if (!page) {
    return (
      <div className="page" onClick={handlePageClick}>
        <div
          className="cover home"
          style={{ backgroundImage: "url('image/artwork/home.png')" }}
        ></div>
        <div className="lines">
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
          <p>
            🗑️ If you wish to clear your progress, click on the reset to zero button in the menu.
          </p>
          <button className="start-button" onClick={handleStartButtonClick}>
            Let's start! 🚀
          </button>
        </div>
      </div>
    )
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
export default Page
