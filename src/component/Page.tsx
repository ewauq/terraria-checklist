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
}

const Page = ({ page }: PageProps): JSX.Element => {
  if (page?.type === 'chapter') return <ChapterPage page={page.content as Chapter} />
  if (page?.type === 'collection') return <CollectionPage page={page.content as Collection} />

  return <HomePage />
}

export default Page
