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
	id: string; // Task name "simple-task-v1"
	author: string; // Get author name from firebase?
	state: string; // enum taskStatus
	maxScore?: number; // sum all categories score
	categoriesOrder: Array<string>; // ["Basic Scope", "Extra Scope", "Fines"]
	description?: string;
	items?: Array<Iitem>;
}

export interface ITaskLayoutProps {
	children?: React.ReactNode;
	inicialState?: Itask;
}

export interface ItaskCategoryValues {
	name: string;
	order: number;
}
