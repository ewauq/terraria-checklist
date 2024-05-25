import React from 'react'
import { Chapter } from '../type/chapter'
import { Collection } from '../type/collection'
import { Page as PageType } from '../type/page'
import ChapterPage from './ChapterPage'
import CollectionPage from './CollectionPage'
import HomePage from './HomePage'
import './Page.scss'

interface PageProps {
  page: PageType | null | undefined
  onItemChecked: (localStorageKeyValue: string) => void
}

const Page = ({ page, onItemChecked }: PageProps): JSX.Element => {
  if (page?.type === 'chapter') {
    return <ChapterPage page={page.content as Chapter} onItemChecked={onItemChecked} />
  }

  if (page?.type === 'collection') {
    return <CollectionPage page={page.content as Collection} onItemChecked={onItemChecked} />
  }

  return <HomePage />
}

export default Page
