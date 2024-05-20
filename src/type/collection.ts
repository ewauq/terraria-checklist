import { CollectionItem } from './collection-item'

export type Collection = {
  id: number
  label: string
  slug: string
  background: string
  items: CollectionItem[]
}
