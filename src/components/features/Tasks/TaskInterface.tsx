export enum taskStatus {
  DRAFT = 'Draft',
  PUBLISHED = 'Published',
  ARCHIVED = 'Archived'
}


export interface Iitem {
  id?: string, // `${categoryName.replace(/\s+/g, '')}_p${item.order}` => BasicScope_p1
  category: string, // categoryName => "Basic Scope"
  title: string,
  description: string,
  order: number,
  minScore: number,
  maxScore: number,
  mentorOnly?: boolean | undefined
}

export interface Itask {
  id?: string, // Task name "simple-task-v1"
  author: string, // Get author name from firebase?
  state: taskStatus, // enum taskStatus
  maxScore?: number, // sum all categories score
  categoriesOrder: Array<string>, // ["Basic Scope", "Extra Scope", "Fines"]
  items?: Array<Iitem>
}

export const task = {
  id: "simple-task-v1",
  author: "cardamo",
  state: "DRAFT",
  categoriesOrder: ["Basic Scope", "Extra Scope", "Fines"],
  items: [
    {
      id: "BasicScope_p1",
      minScore: 0,
      maxScore: 20,
      category: "Basic Scope",
      title: "Basic things",
      description: "You need to make things right, not wrong"
    },
    {
      id: "extra_p1",
      minScore: 0,
      maxScore: 30,
      category: "Extra Scope",
      title: "More awesome things",
      description: "Be creative and make up some more awesome things"
    },]
  }
export interface ItaskCategoryValues {
  name: string,
  order: number
}
