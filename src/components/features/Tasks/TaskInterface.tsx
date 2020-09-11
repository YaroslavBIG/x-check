export enum taskStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  ARCHIVED = 'Archived'
}

const task = {
  id: "simple-task-v1",
  author: "cardamo",
  state: "DRAFT", // enum [DRAFT, PUBLISHED, ARCHIVED]
  categoriesOrder: ["Basic Scope", "Extra Scope", "Fines"],
  items: [
    {
      id: "basic_p1",
      minScore: 0,
      maxScore: 20,
      category: "Basic Scope",
      title: "Basic things",
      description: "You need to make things right, not wrong"
    },
    {
      id: "basic_p2",
      minScore: 0,
      maxScore: 50,
      category: "Basic Scope",
      title: "Basic things",
      description: "You need to make things right, not wrong"
    }
  ]
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
  title: string,
  description: string,
  order: number,
  minScore: number,
  maxScore: number,
  mentorOnly: boolean | undefined
}

export interface categoriesOrder {
  name: string,
  order: number,
  items?: Array<Isubitem>
}

export interface IsubitemsKeys extends Array<Isubitem>{}

export interface Itask {
  id: string, // Task name
  author: string, // Get author name from firebase?
  state: taskStatus,
  maxScore?: number,
  categoriesOrder: Array<categoriesOrder>,
  items?: Array<Isubitem>
}
