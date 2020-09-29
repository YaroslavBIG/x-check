import { IProfile } from 'interfaces/login-profile.interface';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Requests } from '../TableRequests/TableRequests';

export const RequestsContext: any = React.createContext(false);
export const RequestsContextProvider = RequestsContext.Provider;
export const RequestsContextConsumer = RequestsContext.Consumer;

export const RequestsContextState: React.FC = (props) => {
	const [ currentRequest, setCurrentRequest ] = useState<Requests | null>(null);
	const [ selectedRequests, setSelectedRequests ] = useState<Array<Requests | null>>([]);
	const [ selectedRequestID, setSelectedRequestID ] = useState<(string | number) | undefined>();
	const userRole = useSelector((state: IProfile) => state.firebase.profile.role);

	return (
		<RequestsContextProvider
			value={{
				currentRequest: currentRequest,
				setCurrentRequest: setCurrentRequest,
				selectedRequestID: selectedRequestID,
				setSelectedRequestID: setSelectedRequestID,
				selectedRequests: selectedRequests,
				setSelectedRequests: setSelectedRequests,
				userRole: userRole
			}}
		>
			{props.children}
		</RequestsContextProvider>
	);
};
