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
  description?: string
}

export interface Isubitem {
  description: string
  minScore: number,
  maxScore: number,
}

export interface categoriesOrder {
  name: string,
  order: number
  items?: Array<Isubitem>
}

// export interface Isubitems extends Array<Isubitem>{}

export interface ItaskItems extends Array<ItaskItem>{}

export interface Itask {
  id: string, // Task name
  author: string, // Get author name from firebase?
  state: taskStatus,
  maxScore: number,
  categoriesOrder: Array<categoriesOrder>,
  items?: ItaskItems // Dont need?
}
