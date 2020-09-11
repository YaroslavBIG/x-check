export enum taskStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  ARCHIVED = 'Archived'
}


export interface Iitem {
  id: string, // "basic_p1" // "basic_p2"
  title: string,
  description: string,
  order: number,
  minScore: number,
  maxScore: number,
  mentorOnly?: boolean | undefined
}

export interface Itask {
  id: string, // Task name
  author: string, // Get author name from firebase
  state: taskStatus, // enum taskStatus
  maxScore?: number, // sum all categories score
  categoriesOrder: Array<string>,
  items?: Array<Iitem>
}
