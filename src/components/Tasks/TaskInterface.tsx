export enum taskStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  ARCHIVED = 'Archived'
}

export interface ItaskItem {
  id: string,
  minScore: number,
  maxScore: number,
  category: string,
  title: string,
  description?: Isubitems
}

export interface Isubitem {
  description: string
  score: number
}

export interface Isubitems extends Array<Isubitem>{}

export interface ItaskItems extends Array<ItaskItem>{}

export interface Itask {
  id: string, // Task name
  author: string, // Get author name from firebase?
  state: taskStatus,
  categoriesOrder: Array<string>, // ["Basic Scope", "Extra Scope", "Fines"],
  items: ItaskItems
}
