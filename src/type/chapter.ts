import { ChapterItem } from './chapter-item'

export type Chapter = {
  id: number
  label: string
  slug: string
  background: string
  note?: string
  items: ChapterItem[]
}
