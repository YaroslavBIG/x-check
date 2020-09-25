import React, { ReactText, useEffect, useState } from 'react';

export const TaskDrawerContext: any = React.createContext(false);
export const TaskDrawerProvider = TaskDrawerContext.Provider;
export const TaskDraweronsumer = TaskDrawerContext.Consumer;

interface TaskDrawerContextStateProps {
	selectedRowKeys?: ReactText[] | undefined;
	children?: React.ReactNode;
}

export const TaskDrawerContextState = (props: TaskDrawerContextStateProps) => {
	const [ stateShowDrawer, setStateShowDrawer ] = useState(false);
	const [ selectedTasks, setSelectedTasks ] = useState<(string | number)[] | undefined>([]);

	useEffect(
		() => {
			setSelectedTasks(props.selectedRowKeys || []);
		},
		[ props, setSelectedTasks ]
	);

	return (
		<TaskDrawerProvider
			value={{
				stateShowDrawer: stateShowDrawer,
				setStateShowDrawer: setStateShowDrawer,
				selectedTasks: selectedTasks,
				setSelectedTasks: setSelectedTasks
			}}
		>
			{props.children}
		</TaskDrawerProvider>
	);
};
