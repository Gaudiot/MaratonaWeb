import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';
import ballon from '../../Images/defaultProfileImage.png';

interface ProfileData {
    username: string;
    email: string;
}

const Profile: React.FC = () => {
	const params = useParams();
	const [user, setUser] = useState<ProfileData>();

	useEffect(() => {
		api.get(`/user/${params.profileId}`).then(({data}) => {
			setUser(data);
		});
	}, [params.profileId]);

	return (
		<div>
			<h1>Bem-vindo, {user?.username}</h1>
			<img alt="User profile" src={ballon}/>
		</div>
	);
};

export default Profile;