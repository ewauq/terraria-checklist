import React from 'react'
import { Chapter } from '../type/chapter'
import { Page as PageType } from '../type/page'
import ChapterPage from './ChapterPage'
import HomePage from './HomePage'
import './Page.scss'

interface PageProps {
  page: PageType | null | undefined
}

const Page = ({ page }: PageProps): JSX.Element => {
  if (page?.type === 'chapter') {
    return <ChapterPage page={page.content as Chapter} />
  }

  // if (page?.type === 'collection') {
  //   return <CollectionPage page={page.content as Collection} onItemChecked={onItemChecked} />
  // }

  return <HomePage />
}

export default Page
