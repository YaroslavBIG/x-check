import { IProfile } from 'interfaces/login-profile.interface';
import React, { ReactText, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const TaskDrawerContext: any = React.createContext(false);
export const TaskDrawerProvider = TaskDrawerContext.Provider;
export const TaskDraweronsumer = TaskDrawerContext.Consumer;

interface TaskDrawerContextStateProps {
	selectedRowKeys?: ReactText[] | undefined;
	setSelectedRowKeys: any;
	children?: React.ReactNode;
}

export const TaskDrawerContextState = (props: TaskDrawerContextStateProps) => {
	const [ stateShowDrawer, setStateShowDrawer ] = useState(false);
	const [ selectedTasks, setSelectedTasks ] = useState<(string | number)[] | undefined>([]);
	const userRole = useSelector((state: IProfile) => state.firebase.profile.role);

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
				setSelectedTasks: setSelectedTasks,
				setSelectedRowKeys: props.setSelectedRowKeys,
				userRole
			}}
		>
			{props.children}
		</TaskDrawerProvider>
	);
};
