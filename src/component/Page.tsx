import React from 'react'
import { Chapter } from '../type/chapter'
import { Page as PageType } from '../type/page'
import ChapterPage from './ChapterPage'
import HomePage from './HomePage'
import './Page.scss'

interface PageProps {
  page: PageType | null | undefined
  onItemChecked: (localStorageKeyValue: string) => void
}

const Page = ({ page, onItemChecked }: PageProps): JSX.Element => {
  if (page) return <ChapterPage page={page.content as Chapter} onItemChecked={onItemChecked} />

  return <HomePage />
}

export default Page
