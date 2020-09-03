export enum taskStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  ARCHIVED = 'Archived'
}

export interface taskItem {
  id: string,
  minScore: number,
  maxScore: number,
  category: string,
  title: string,
  description?: string
}

export interface taskItems extends Array<taskItem>{}

export interface Task {
  id: string, // Task name
  author: string, // Get author name from firebase?
  state: taskStatus,
  categoriesOrder: Array<string>, // ["Basic Scope", "Extra Scope", "Fines"],
  items: taskItems
}
