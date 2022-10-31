import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';
import ballon from '../../Images/defaultProfileImage.png';
import { Container, Content } from './styles';

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
		<Container>
			<Content>
				<img alt="User profile" src={ballon}/>
				<p>
					<span>{user?.username}</span>
					<span>{user?.email}</span>
				</p>
			</Content>
		</Container>
	);
};

export default Profile;