import React, { useEffect } from 'react'
import { useDrawer } from '../context/DrawerContext'
import markdownToHtml from '../helper/markdown'
import './Line.scss'

interface LineProps {
  pageId: number
  id: number
  text: string
}

const Line = ({ pageId, id, text }: LineProps): JSX.Element => {
  const [isChecked, setIsChecked] = React.useState<boolean>(false)
  const { setCheckedItem } = useDrawer()
  const localStorageKey = `chapter-${pageId}-item-${id}`

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const state = event.currentTarget.checked
    localStorage.setItem(localStorageKey, state.toString())
    setIsChecked(state)
    setCheckedItem({ pageType: 'chapter', pageId, itemId: id, state })
  }

  useEffect(() => {
    setIsChecked(localStorage.getItem(localStorageKey) === 'true')
  }, [pageId, id])

  return (
    <div className={`line ${isChecked ? 'done' : ''}`}>
      <input
        type="checkbox"
        id={id.toString()}
        onChange={handleCheckboxClick}
        checked={isChecked}
      />
      <span className="text" dangerouslySetInnerHTML={{ __html: markdownToHtml(text) }}></span>
    </div>
  )
}

export default Line
