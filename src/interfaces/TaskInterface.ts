export enum taskStatus {
	DRAFT = 'Draft',
	PUBLISHED = 'Published',
	ARCHIVED = 'Archived'
}

export interface Iitem {
	id: string; // `${categoryName.replace(/\s+/g, '')}_p${item.order}` => BasicScope_p1
	category: string; // categoryName => "Basic Scope"
	title: string;
	description: string;
	order: number;
	minScore: number;
	maxScore: number;
	mentorOnly?: boolean | null;
}

export interface Itask {
	id: string;
	author: string; // Get author name from firebase?
	state: string;
	maxScore?: number;
	categoriesOrder: Array<string>;
	description?: string;
  items?: Array<Iitem>;
  lastUpdate?: string
}

export interface ITaskLayoutProps {
	children?: React.ReactNode;
	inicialState?: Itask;
}

export interface ItaskCategoryValues {
	name: string;
	order: number;
}

export interface ItaskStore {
  firestore: {
    data: {
      tasks: { [key: string]: Itask };
    };
  };
}
