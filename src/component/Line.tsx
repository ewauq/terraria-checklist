import React, { useEffect } from 'react'
import markdownToHtml from '../helper/markdown'
import './Line.scss'

interface LineProps {
  pageId: number
  id: number
  text: string
  onItemChecked: (localStorageKeyValue: string) => void
}

const Line = ({ pageId, id, text, onItemChecked }: LineProps): JSX.Element => {
  const [isChecked, setIsChecked] = React.useState<boolean>(false)

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const state = event.currentTarget.checked
    localStorage.setItem(`chapter-${pageId}-item-${id}`, state.toString())
    setIsChecked(state)
    onItemChecked(`chapter-${pageId}-item-${id}-${state.toString()}`)
  }

  useEffect(() => {
    setIsChecked(localStorage.getItem(`chapter-${pageId}-item-${id}`) === 'true')
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
