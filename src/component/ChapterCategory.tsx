import React from 'react'

interface ChapterCategoryProps {
  title: string
}

const ChapterCategory = ({ title }: ChapterCategoryProps): JSX.Element => {
  return (
    <div className="line">
      <span className="text">
        <h3>{title}</h3>
      </span>
    </div>
  )
}

export default ChapterCategory
