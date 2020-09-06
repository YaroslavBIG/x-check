export enum taskStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  ARCHIVED = 'Archived'
}

export interface ItaskItem {
  id: string,
  title: string,
  category: string,
  minScore: number,
  maxScore: number,
  description?: Isubitems
}

export interface Isubitem {
  description: string
  score: number
}

export interface categoriesOrder {
  name: string,
  order: number
}

export interface Isubitems extends Array<Isubitem>{}

export interface ItaskItems extends Array<ItaskItem>{}

export interface Itask {
  id: string, // Task name
  author: string, // Get author name from firebase?
  state: taskStatus,
  maxScore: number,
  categoriesOrder: Array<categoriesOrder>,
  items: ItaskItems
}
