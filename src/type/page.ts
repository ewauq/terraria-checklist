import { Chapter } from './chapter'
import { Collection } from './collection'

export type Page = {
  type: 'chapter' | 'collection'
  content: Chapter | Collection | null
}
