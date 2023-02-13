import React, { useEffect, useState } from 'react';

import api from '../../services/api';

interface IUser {
	id: string;
	username: string;
}

interface IUsersResponse {
	users: IUser[];
}

const Members: React.FC = () => {
	const [members, setMembers] = useState<IUser[]>([]);

	useEffect(() => {
		api.get<IUsersResponse>('/user').then(({data}) => {
			setMembers(data.users);
		});
	}, []);

	return (
		<div>
			<h1>WIP</h1>
		</div>
	);
};

export default Members;