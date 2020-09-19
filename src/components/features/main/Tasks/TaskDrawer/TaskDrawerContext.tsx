import React, { useState } from 'react';

export const TaskDrawerContext: any = React.createContext(false);
export const TaskDrawerProvider = TaskDrawerContext.Provider;
export const TaskDraweronsumer = TaskDrawerContext.Consumer;

export const TaskDrawerContextState: React.FC = (props) => {
	const [ stateShowDrawer, setStateShowDrawer ] = useState(false);

	return (
		<TaskDrawerProvider value={{ stateShowDrawer: stateShowDrawer, setStateShowDrawer: setStateShowDrawer }}>
			{props.children}
		</TaskDrawerProvider>
	);
};
